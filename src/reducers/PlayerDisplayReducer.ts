export enum DisplayType {
    CARDS = "Cards",
    TABLE = "Table",
}

export interface DisplayState {
    display: DisplayType;
}

type DisplayStateActions = {
    type: "switch";
};

export const InitialDisplayState: DisplayState = {
    display: DisplayType.CARDS,
};

export function DisplayStateReducer(
    state: DisplayState,
    action: DisplayStateActions,
) {
    if (action.type === "switch") {
        return {
            ...state,
            display:
                state.display === DisplayType.CARDS
                    ? DisplayType.TABLE
                    : DisplayType.CARDS,
        };
    }
    return state;
}
