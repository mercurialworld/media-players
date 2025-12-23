import { configureStore } from '@reduxjs/toolkit';
import BasePlayersReducer from '@redux-app/slices/BasePlayerSlice';
import PlayerDisplayReducer from '@redux-app/slices/PlayerDisplaySlice'; 

export const MPPlayerSiteStore = configureStore({
    reducer: {
        basePlayers: BasePlayersReducer,
        playerDisplay: PlayerDisplayReducer
    }
});

export type AppStore = typeof MPPlayerSiteStore;
export type AppDispatch = typeof MPPlayerSiteStore.dispatch;
export type RootState = ReturnType<typeof MPPlayerSiteStore.getState>;