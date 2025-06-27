import type { MediaPlayer } from "@project-types/MediaPlayer";
import { AvailableOn, Platform } from "@utils/CheckAvailability";

export enum SortOptions {
    ASCENDING,
    DESCENDING,
}

export interface FilterState {
    Windows: boolean;
    MacOS: boolean;
    Linux: boolean;
    Web: boolean;
}

export interface ListState {
    // A list of media players to display on the website.
    filteredPlayers: MediaPlayer[];
    // A list of platforms to show players for, if any.
    platforms: FilterState;
    // A query to filter against, if any.
    query: string;
    // The sort direction.
    sortDirection: SortOptions;
    // Whether to show representations or not.
    showRepresentations: boolean;
    // Whether to show web players or not.
    showWeb: boolean;
}

// set initial list of filtered players
type Initialize = {
    type: "init";
    players: MediaPlayer[];
    showRepresentations: boolean;
    showWeb: boolean;
};
// toggle and sort ascending/descending
type ToggleSort = { type: "toggleSort" };
// toggle and sort web players
type ToggleWeb = { type: "setWeb"; value: boolean };
// toggle looking up representations
type ToggleRepresentations = { type: "setRepresentations"; value: boolean };
// refresh players (if representations/web have changed)
type Refresh = { type: "refresh"; players: MediaPlayer[] };
// search by query
type Search = {
    type: "search";
    players: MediaPlayer[];
    query: string;
    representations: boolean;
};
// add filter
type AddFilter = {
    type: "addFilter";
    players: MediaPlayer[];
    platform: Platform;
    showWeb: boolean;
};
// remove filter
type RemoveFilter = {
    type: "removeFilter";
    players: MediaPlayer[];
    platform: Platform;
    showWeb: boolean;
};
// add filter
type AddFilterTable = {
    type: "addFilterTable";
    players: MediaPlayer[];
    platform: Platform;
    showWeb: boolean;
};
// remove filter
type RemoveFilterTable = {
    type: "removeFilterTable";
    players: MediaPlayer[];
    platform: Platform;
    showWeb: boolean;
};

export type PlayerListManipActions =
    | Initialize
    | ToggleSort
    | ToggleWeb
    | ToggleRepresentations
    | Refresh
    | Search
    | AddFilter
    | RemoveFilter
    | AddFilterTable
    | RemoveFilterTable;

export const InitialFilterState: FilterState = {
    Windows: false,
    MacOS: false,
    Linux: false,
    Web: false,
};

export const InitialListState: ListState = {
    filteredPlayers: [],
    platforms: InitialFilterState,
    query: "",
    sortDirection: SortOptions.ASCENDING,
    showRepresentations: false,
    showWeb: false,
};

/* Sorts a list of media players by their name. */
function SortByName(a: MediaPlayer, b: MediaPlayer): number {
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
    } else {
        return 0;
    }
}

function SortAndOrder(lst: MediaPlayer[], direction: SortOptions) {
    const newList = lst.sort(SortByName);

    return direction === SortOptions.ASCENDING ? newList : newList.reverse();
}

/* Filters a list of media players by a query. */
function FilterByQuery(
    players: MediaPlayer[],
    query: string = "",
    showRepresentations: boolean,
): MediaPlayer[] {
    return players.filter(
        (player: MediaPlayer) =>
            // there's a match in the name itself
            player.name.toLowerCase().includes(query.toLowerCase()) ||
            // OPTIONAL: there's a match in the players it represents
            (showRepresentations &&
                player.represents
                    // [TODO] remove once schema is updated
                    ?.filter(
                        (playerName: string) => !playerName.endsWith("-placeholder"),
                    )
                    .find((playerName: string) =>
                        playerName.replace("-", " ").includes(query.toLowerCase()),
                    )),
    );
}

/* Filters a list of media players by the platforms it's available on. */
function FilterByPlatform(
    players: MediaPlayer[],
    platforms: Platform[] = [],
    showWeb: boolean,
): MediaPlayer[] {
    return players.filter(function (player: MediaPlayer) {
        // no platforms selected
        if (platforms.length === 0) {
            if (showWeb) {
                return true;
            } else {
                return (
                    AvailableOn(Platform.WINDOWS, player.sources) ||
                    AvailableOn(Platform.MAC, player.sources) ||
                    AvailableOn(Platform.LINUX, player.sources)
                );
            }
        } else {
            // counts if the player is available in all platforms listed
            let platformCount = 0;

            platforms.forEach((platform) => {
                if (AvailableOn(platform, player.sources)) {
                    platformCount++;
                }
            });

            return platformCount === platforms.length;
        }
    });
}

function GetEveryOtherPlayer(
    allPlayers: MediaPlayer[],
    filteredPlayers: MediaPlayer[],
) {
    return allPlayers.filter((player) =>
        filteredPlayers.find((x) => player.id === x.id) ? false : true,
    );
}

function ApplyEverything(
    players: MediaPlayer[],
    query: string = "",
    platforms: FilterState,
    sortDirection: SortOptions,
    showWeb: boolean,
    showRepresentations: boolean,
): MediaPlayer[] {
    return SortAndOrder(
        FilterByPlatform(
            FilterByQuery(players, query, showRepresentations),
            CreatePlatformsList(platforms),
            showWeb,
        ),
        sortDirection,
    );
}

const CreatePlatformsList = (platforms: FilterState) =>
    Object.entries(platforms)
        .filter(([_, val]) => val)
        .map(([plat, _]) => plat as Platform);

export function PlayerListManipReducer(
    state: ListState,
    action: PlayerListManipActions,
) {
    switch (action.type) {
        case "init":
            return {
                ...state,
                showWeb: action.showWeb,
                showRepresentations: action.showRepresentations,
                platforms: {
                    Windows: false,
                    MacOS: false,
                    Linux: false,
                    Web: false,
                },
                query: "",
                sortDirection: SortOptions.ASCENDING,
                filteredPlayers: FilterByPlatform(
                    action.players,
                    [],
                    action.showWeb,
                ),
            };
        case "toggleSort": {
            const newSortDirection =
                state.sortDirection === SortOptions.ASCENDING
                    ? SortOptions.DESCENDING
                    : SortOptions.ASCENDING;

            const sortedPlayers = SortAndOrder(
                state.filteredPlayers,
                newSortDirection,
            );

            return {
                ...state,
                sortDirection: newSortDirection,
                filteredPlayers: sortedPlayers,
            };
        }
        case "setWeb": {
            return {
                ...state,
                showWeb: action.value,
            };
        }
        case "setRepresentations": {
            return {
                ...state,
                showRepresentations: action.value,
            };
        }
        case "refresh": {
            return {
                ...state,
                filteredPlayers: ApplyEverything(
                    action.players,
                    state.query,
                    state.platforms,
                    state.sortDirection,
                    state.showWeb,
                    state.showRepresentations,
                ),
            };
        }
        case "search": {
            return {
                ...state,
                query: action.query,
                filteredPlayers: ApplyEverything(
                    action.players,
                    action.query,
                    state.platforms,
                    state.sortDirection,
                    state.showWeb,
                    state.showRepresentations,
                ),
            };
        }
        case "addFilter": {
            // @ts-ignore the keys in platforms correspond to the enum
            state.platforms[action.platform] = true;

            return {
                ...state,
                filteredPlayers: ApplyEverything(
                    action.players,
                    state.query,
                    state.platforms,
                    state.sortDirection,
                    state.showWeb,
                    state.showRepresentations,
                ),
            };
        }
        case "removeFilter": {
            // @ts-ignore the keys in platforms correspond to the enum
            state.platforms[action.platform] = false;

            return {
                ...state,
                filteredPlayers: ApplyEverything(
                    action.players,
                    state.query,
                    state.platforms,
                    state.sortDirection,
                    state.showWeb,
                    state.showRepresentations,
                ),
            };
        }
        case "addFilterTable": {
            // @ts-ignore the keys in platforms correspond to the enum
            state.platforms[action.platform] = true;

            const newPlayers = ApplyEverything(
                action.players,
                state.query,
                state.platforms,
                state.sortDirection,
                state.showWeb,
                state.showRepresentations,
            );

            return {
                ...state,
                filteredPlayers: newPlayers.concat(
                    SortAndOrder(
                        GetEveryOtherPlayer(action.players, newPlayers),
                        state.sortDirection,
                    ),
                ),
            };
        }
        case "removeFilterTable": {
            // @ts-ignore the keys in platforms correspond to the enum
            state.platforms[action.platform] = false;

            const newPlayers = ApplyEverything(
                action.players,
                state.query,
                state.platforms,
                state.sortDirection,
                state.showWeb,
                state.showRepresentations,
            );

            return {
                ...state,
                filteredPlayers: newPlayers.concat(
                    SortAndOrder(
                        GetEveryOtherPlayer(action.players, newPlayers),
                        state.sortDirection,
                    ),
                ),
            };
        }
    }
}
