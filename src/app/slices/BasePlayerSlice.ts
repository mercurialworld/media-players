import { GetMediaPlayers } from "@hooks/useGetMediaPlayers"
import type { MediaPlayer } from "@project-types/MediaPlayer"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

export interface IconEntry {
    label: string,
    type: string,
    url: string,
    md5?: string
}

export interface PlayersResponse {
    players: MediaPlayer[],
    icons: Map<string, IconEntry[]>,
}

export interface BasePlayersState extends PlayersResponse {
    status: "init" | "loading" | "loaded" | "failed",
    error: string | null
};

export const initialBasePlayerState: BasePlayersState = {
    players: [],
    icons: new Map<string, IconEntry[]>(),
    status: "init",
    error: null
};

export const BasePlayersSlice = createSlice({
    name: "BasePlayers",
    initialState: initialBasePlayerState,
    reducers: {
        // these will probably never be called
        setPlayers: (state, action: PayloadAction<MediaPlayer[]>) => {
            state.players = action.payload
        },
        setIcons: (state, action: PayloadAction<Map<string, IconEntry[]>>) => {
            state.icons = action.payload
        }
    },
    selectors: {
        selectPlayers: (state) => state.players,
        selectIcons: (state) => state.icons
    },
    extraReducers: builder =>{
        builder
            .addCase(GetPlayersAsync.pending, state => {
                state.status = "loading";
            })
            .addCase(GetPlayersAsync.fulfilled, (state, action) => {
                state.status = "loaded";
                state.players = action.payload.players;
                state.icons = action.payload.icons;
            })
            .addCase(GetPlayersAsync.rejected, state => {
                state.status = "failed";
            })
    }
});

export const GetPlayersAsync = createAsyncThunk(
    "BasePlayers/FetchPlayers",
    async (url: string) => {
        const {players, icons} = await GetMediaPlayers(url);
        return {players, icons};
    }
);

export const { setPlayers, setIcons } = BasePlayersSlice.actions;

export default BasePlayersSlice.reducer;
