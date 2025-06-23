import { createContext } from "react";
import {
    InitialDisplayState,
    type DisplayState,
} from "../reducers/PlayerDisplayReducer";

export const PlayerDisplayContext = createContext<DisplayState>(InitialDisplayState);
// [TODO] better typing on this
export const PlayerDisplayDispatchContext = createContext<any>({});
