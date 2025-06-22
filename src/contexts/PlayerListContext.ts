import { createContext, type ActionDispatch } from "react";
import {
    InitialListState,
    type ListState,
    type PlayerListManipActions,
} from "../reducers/PlayerListManipReducer";

export const PlayerListContext = createContext<ListState>(InitialListState);
export const PlayerListDispatchContext = createContext<ActionDispatch<
    [action: PlayerListManipActions]
> | null>(null);
