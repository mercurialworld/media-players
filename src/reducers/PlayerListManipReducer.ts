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
}

// set initial list of filtered players
type Initialize = { type: "init"; players: MediaPlayer[] };
// toggle ascending/descending
type ToggleSort = { type: "toggleSort" };
// sort ascending/descending
type Sort = { type: "sort" };
// search by query
type Search = { type: "search"; players: MediaPlayer[]; query: string };
// add filter
type AddFilter = {
    type: "addFilter";
    players: MediaPlayer[];
    platform: Platform;
};
// remove filter
type RemoveFilter = {
    type: "removeFilter";
    players: MediaPlayer[];
    platform: Platform;
};

export type PlayerListManipActions =
    | Initialize
    | ToggleSort
    | Sort
    | Search
    | AddFilter
    | RemoveFilter;

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

/* Filters a list of media players by a query. */
function FilterByQuery(players: MediaPlayer[], query: string = ""): MediaPlayer[] {
    return players.filter(
        (player: MediaPlayer) =>
            // there's a match in the name itself
            player.name.toLowerCase().includes(query.toLowerCase()) ||
            // there's a match in the players it represents
            player.represents
                // [TODO] remove once schema is updated
                ?.filter((playerName) => !playerName.endsWith("-placeholder"))
                .find((playerName) =>
                    playerName.replace("-", " ").includes(query.toLowerCase()),
                ),
    );
}

/* Filters a list of media players by the platforms it's available on. */
function FilterByPlatform(
    players: MediaPlayer[],
    platforms: Platform[] = [],
): MediaPlayer[] {
    return players.filter(function (player: MediaPlayer) {
        // no platforms selected
        if (platforms.length === 0) {
            /// [TODO] remove this once the web extension is released
            return (
                AvailableOn(Platform.WINDOWS, player.sources) ||
                AvailableOn(Platform.MAC, player.sources) ||
                AvailableOn(Platform.LINUX, player.sources)
            );

            // return true;
        } else {
            // counts if the player is available in all platforms listed
            var platformCount = 0;

            platforms.forEach((platform) => {
                if (AvailableOn(platform, player.sources)) {
                    platformCount++;
                }
            });

            return platformCount === platforms.length;
        }
    });
}

const CreatePlatformsList = (newPlatforms: FilterState) =>
    Object.entries(newPlatforms)
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
                filteredPlayers: FilterByPlatform(action.players),
                platforms: {
                    Windows: false,
                    MacOS: false,
                    Linux: false,
                    Web: false,
                },
                query: "",
                sortDirection: SortOptions.ASCENDING,
            };
        case "toggleSort": {
            let newSortDirection =
                state.sortDirection === SortOptions.ASCENDING
                    ? SortOptions.DESCENDING
                    : SortOptions.ASCENDING;
            let sortedPlayers = state.filteredPlayers.sort(SortByName);

            return {
                ...state,
                sortDirection: newSortDirection,
                filteredPlayers:
                    newSortDirection === SortOptions.ASCENDING
                        ? sortedPlayers
                        : sortedPlayers.reverse(),
            };
        }
        case "sort": {
            let sortedPlayers = state.filteredPlayers.sort(SortByName);

            return {
                ...state,
                filteredPlayers:
                    state.sortDirection === SortOptions.ASCENDING
                        ? sortedPlayers
                        : sortedPlayers.reverse(),
            };
        }
        case "search": {
            return {
                ...state,
                query: action.query,
                filteredPlayers: FilterByPlatform(
                    FilterByQuery(action.players, action.query),
                    Object.entries(state.platforms)
                        .filter(([_, val]) => val)
                        .map(([plat, _]) => plat as Platform),
                ),
            };
        }
        case "addFilter": {
            state.platforms[action.platform] = true;
            let newPlatsList = CreatePlatformsList(state.platforms);

            return {
                ...state,
                filteredPlayers: FilterByPlatform(
                    FilterByQuery(action.players, state.query),
                    newPlatsList,
                ),
            };
        }
        case "removeFilter": {
            state.platforms[action.platform] = false;
            let newPlatsList = CreatePlatformsList(state.platforms);

            return {
                ...state,
                filteredPlayers: FilterByPlatform(
                    FilterByQuery(action.players, state.query),
                    newPlatsList,
                ),
            };
        }
    }
}
