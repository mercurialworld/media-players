import type { MediaPlayer } from "../types/MediaPlayer";

export enum LoadStateType {
    LOADING,
    ERROR,
    LOADED,
}

export interface LoadState {
    // A list of media players.
    players: MediaPlayer[];
    // A list of icons for media players.
    icons: string[];
    // The state in which the site is fetching players.
    loading: boolean;
    // The state in which the site has failed to fetch players.
    error: boolean;
    // The error that occured, if any.
    errorString?: string;
}

type Loading = { type: LoadStateType.LOADING };
type Error = { type: LoadStateType.ERROR; error: any };
type Loaded = {
    type: LoadStateType.LOADED;
    players: MediaPlayer[];
    icons: string[];
};

type LoadActions = Loading | Error | Loaded;

export const InitialLoadState: LoadState = {
    players: [],
    icons: [],
    loading: true,
    error: false,
};

export function LoadStateReducer(state: LoadState, action: LoadActions) {
    switch (action.type) {
        case LoadStateType.LOADING:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case LoadStateType.ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorString: action.error,
            };
        case LoadStateType.LOADED:
            return {
                ...state,
                loading: false,
                error: false,
                players: action.players,
                icons: action.icons,
            };
        default:
            return state;
    }
}
