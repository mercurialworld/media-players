import { createContext } from "react";
import {
    InitialListState,
    type ListState,
} from "../reducers/PlayerListManipReducer";

export const PlayerListContext = createContext<ListState>(InitialListState);
// [TODO] better typing on this
export const PlayerListDispatchContext = createContext<any>({});
