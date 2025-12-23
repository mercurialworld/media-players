import { createSlice } from "@reduxjs/toolkit"

export enum DisplayType {
    CARDS = "Cards",
    TABLE = "Table",
}

export interface DisplayState {
    display: DisplayType;
}

export const initialDisplayState: DisplayState = {
    display: DisplayType.CARDS,
};

export const PlayerDisplaySlice = createSlice({
    name: "PlayerDisplay",
    initialState: initialDisplayState,
    reducers: {
        switchDisplay: (state) => {
            state.display = state.display === DisplayType.CARDS ?
            DisplayType.TABLE : DisplayType.CARDS
        }
    },
    selectors: {
        selectDisplay: (state) => state.display,
    }
});

export const { switchDisplay } = PlayerDisplaySlice.actions;

export default PlayerDisplaySlice.reducer;