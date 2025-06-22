import type { MediaPlayer } from "../types/MediaPlayer";
import { AvailableOn, Platform } from "../utils/CheckAvailability";

export enum SortOptions {
    ASCENDING,
    DESCENDING,
}

export interface ListState {
    // A list of media players to display on the website.
    filteredPlayers: MediaPlayer[];
    // A list of platforms to show players for, if any.
    platformFilters: Platform[];
    // A query to filter against, if any.
    query: string;
}

// set initial list of filtered players
type Initialize = { type: "init"; players: MediaPlayer[] };
// sort ascending/descending
type Sort = { type: "sort"; direction: SortOptions };
// search by query
type Search = { type: "search"; players: MediaPlayer[]; query: string };
// filter by platform
type PlatformFilter = {
    type: "filter";
    players: MediaPlayer[];
    platforms: Platform[];
};

export type PlayerListManipActions = Initialize | Sort | Search | PlatformFilter;

export const InitialListState: ListState = {
    filteredPlayers: [],
    platformFilters: [],
    query: "",
};

/* Sorts a list of media players by their name. */
function SortByName(a: MediaPlayer, b: MediaPlayer): number {
    if (a.name > b.name) {
        return 1;
    } else if (a.name < b.name) {
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
                .filter((playerName) => !playerName.endsWith("-placeholder"))
                .find((playerName) =>
                    playerName.replace("-", " ").includes(query.toLowerCase()),
                ),
    );
}

/* Filters a list of media players by the platforms its available in. */
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

export function PlayerListManipReducer(
    state: ListState,
    action: PlayerListManipActions,
) {
    switch (action.type) {
        case "init":
            return {
                ...state,
                filteredPlayers: action.players,
            };
        case "sort":
            let sortedPlayers = state.filteredPlayers.sort(SortByName);

            return {
                ...state,
                filteredPlayers:
                    action.direction === SortOptions.ASCENDING
                        ? sortedPlayers
                        : sortedPlayers.reverse(),
            };
        case "search":
            return {
                ...state,
                query: action.query,
                filteredPlayers: FilterByPlatform(
                    FilterByQuery(action.players, action.query),
                    state.platformFilters,
                ),
            };
        case "filter":
            return {
                ...state,
                platformFilters: action.platforms,
                filteredPlayers: FilterByPlatform(
                    FilterByQuery(action.players, state.query),
                    action.platforms,
                ),
            };
    }
}
