import { createContext } from "react";

import {
    type DisplayState,
    InitialDisplayState,
} from "@reducers/PlayerDisplayReducer";

export const PlayerDisplayContext = createContext<DisplayState>(InitialDisplayState);
// [TODO] better typing on this
// eslint-disable-next-line no-explicit-any
export const PlayerDisplayDispatchContext = createContext<any>({});
