import { createContext } from "react";

import { InitialListState, type ListState } from "@reducers/PlayerListManipReducer";

export const PlayerListContext = createContext<ListState>(InitialListState);
// [TODO] better typing on this
// eslint-disable-next-line no-explicit-any
export const PlayerListDispatchContext = createContext<any>({});
