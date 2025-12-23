import type { MediaPlayer } from "@project-types/MediaPlayer";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AvailableOnWithString } from "@utils/CheckAvailability";
import { DisplayType } from "./PlayerDisplaySlice";

export type SortOptions = "asc" | "desc";
export type OSFilters = "Windows" | "MacOS" | "Linux" | "Web";

export interface PlayerFilterState {
    filteredPlayers: MediaPlayer[],
    query: string;
    platforms: OSFilters[],
    sortDirection: SortOptions;
    showRepresentations: boolean;
    showWeb: boolean;
}

export const InitialPlayerFilterState: PlayerFilterState = {
    filteredPlayers: [],
    query: "",
    platforms: [],
    sortDirection: "asc",
    showRepresentations: false,
    showWeb: false,
}

export interface ApplyFiltersPayload {
    initialPlayers: MediaPlayer[],
    playerDisplay: DisplayType,
}

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

/* Sorts a list of media players alphabetically by name, 
ascending or descending. */
function SortAndOrder(lst: MediaPlayer[], direction: SortOptions) {
    const newList = lst.sort(SortByName);

    return direction === "asc" ? newList : newList.reverse();
}

/* Filters a list of media players by the platforms it's
available on. */
function FilterByPlatform(
    initialPlayers: MediaPlayer[],
    platforms: OSFilters[],
    showWeb: boolean
): MediaPlayer[] {
    return initialPlayers.filter((player: MediaPlayer) => {
        if (platforms.length === 0) {
            return showWeb ? true : 
                AvailableOnWithString("Windows", player.sources) ||
                AvailableOnWithString("MacOS", player.sources) ||
                AvailableOnWithString("Linux", player.sources);
        } else {
            // counts if the player is available in all platforms listed
            let platformCount = 0;

            platforms.forEach((platform) => {
                if (AvailableOnWithString(platform, player.sources)) {
                    platformCount++;
                }
            });

            return platformCount === platforms.length;
        }
    });
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

/* Gets a list of media players that did not meet filters. */
function GetFilteredOutPlayers(
    allPlayers: MediaPlayer[],
    filteredPlayers: MediaPlayer[],
) {
    return allPlayers.filter((player) =>
        filteredPlayers.find((x) => player.id === x.id) ? false : true,
    );
}

/* Applies all filters to the initial list of media players. */
function ApplyAllFilters(
    players: MediaPlayer[],
    query: string = "",
    platforms: OSFilters[],
    sortDirection: SortOptions,
    showWeb: boolean,
    showRepresentations: boolean,
): MediaPlayer[] {
    return SortAndOrder(
        FilterByPlatform(
            FilterByQuery(players, query, showRepresentations),
            platforms,
            showWeb,
        ),
        sortDirection,
    );
}

export const PlayerFiltersSlice = createSlice({
    name: "PlayerFilters",
    initialState: InitialPlayerFilterState,
    reducers: {
        reset: (state, action: PayloadAction<MediaPlayer[]>) => {
            state.filteredPlayers = action.payload;
            // gotta doubly make sure
            state.query = InitialPlayerFilterState.query;
            state.platforms = InitialPlayerFilterState.platforms;
            state.sortDirection = InitialPlayerFilterState.sortDirection;
            state.showRepresentations = InitialPlayerFilterState.showRepresentations;
            state.showWeb = InitialPlayerFilterState.showWeb;
        },
        toggleSort: (state) => {
            const newSort = state.sortDirection === "asc" ? "desc" : "asc";

            state.sortDirection = newSort;
            state.filteredPlayers = SortAndOrder(state.filteredPlayers, newSort);
        },
        setWeb: (state, action: PayloadAction<boolean>) => {
            state.showWeb = action.payload;
        },
        setRepresentations: (state, action: PayloadAction<boolean>) => {
            state.showRepresentations = action.payload;
        },
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        addPlatform: (state, action: PayloadAction<OSFilters>) => {
            state.platforms = state.platforms.concat(action.payload);
        },
        removePlatform: (state, action: PayloadAction<OSFilters>) => {
            state.platforms = state.platforms.filter((x) => x !== action.payload);
        },
        applyFilters: (state, action: PayloadAction<ApplyFiltersPayload>) => {
            let newPlayers = ApplyAllFilters(
                action.payload.initialPlayers,
                state.query,
                state.platforms,
                state.sortDirection,
                state.showWeb,
                state.showRepresentations,
            );

            if (action.payload.playerDisplay === DisplayType.TABLE) {
                newPlayers.concat(
                    SortAndOrder(GetFilteredOutPlayers(action.payload.initialPlayers, newPlayers,), state.sortDirection,),
                )
            }

            state.filteredPlayers = newPlayers;
        }
    },
    selectors: {
        selectFilteredPlayers: (state) => state.filteredPlayers,
    }
})

export const { reset, toggleSort, setWeb, setRepresentations, setQuery, addPlatform, removePlatform, applyFilters } = PlayerFiltersSlice.actions;

export default PlayerFiltersSlice.reducer;
