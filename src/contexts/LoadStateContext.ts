import { createContext } from "react";

import { InitialLoadState, type LoadState } from "@reducers/LoadStateReducer";

export const LoadStateContext = createContext<LoadState>(InitialLoadState);
export const LoadStateDispatchContext = createContext(null);
