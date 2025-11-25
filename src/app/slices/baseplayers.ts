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

export interface BasePlayersState {
    players: MediaPlayer[],
    icons: Map<string, IconEntry[]>
}

export const initialBasePlayerState: BasePlayersState = {
    players: [],
    icons: new Map<string, any>(),
}

export const BasePlayersSlice = createSlice({
    name: "BasePlayers",
    initialState: initialBasePlayerState,
    reducers: {
        // [TODO] these should both be thunks
        // whoa balatro reference
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
    }
})

export const GetPlayersAsync = createAsyncThunk(
    "BasePlayers/FetchPlayers",
    GetMediaPlayers
)

export const { setPlayers, setIcons } = BasePlayersSlice.actions;

export default BasePlayersSlice.reducer;
