import "@mantine/core/styles.css";
import "./App.css";

import { MantineProvider } from "@mantine/core";
import { useEffect, useReducer } from "react";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Info from "./components/Header/Information";
import MediaPlayerDisplay from "./components/MediaPlayer/MediaPlayerDisplay";
import { LoadStateContext } from "./contexts/LoadStateContext";
import {
    PlayerListContext,
    PlayerListDispatchContext,
} from "./contexts/PlayerListContext";
import useGetMediaPlayers from "./hooks/useGetMediaPlayers";
import {
    InitialLoadState,
    LoadStateReducer,
    LoadStateType,
} from "./reducers/LoadStateReducer";
import {
    InitialListState,
    PlayerListManipReducer,
} from "./reducers/PlayerListManipReducer";
import { MantineTheme } from "./theme";

function App() {
    // reducers
    const [loadState, loadStateDispatch] = useReducer(
        LoadStateReducer,
        InitialLoadState,
    );
    const [playersList, playersListDispatch] = useReducer(
        PlayerListManipReducer,
        InitialListState,
    );

    // initial loading
    const { players, icons, error } = useGetMediaPlayers(
        "https://live.musicpresence.app/v3/players.json",
    );

    useEffect(() => {
        if (players.length > 0) {
            loadStateDispatch({
                type: LoadStateType.LOADED,
                players: players,
                icons: icons,
            });

            playersListDispatch({
                type: "init",
                players: players,
            });
        } else if (error) {
            loadStateDispatch({
                type: LoadStateType.ERROR,
                error: error,
            });
        } else {
            loadStateDispatch({
                type: LoadStateType.LOADING,
            });
        }
    }, [players]);

    return (
        <MantineProvider defaultColorScheme="dark" theme={MantineTheme}>
            <Info />
            <LoadStateContext value={loadState}>
                <PlayerListContext value={playersList}>
                    <PlayerListDispatchContext value={playersListDispatch}>
                        <Header />
                        <div className="content">
                            <MediaPlayerDisplay />
                        </div>
                        <Footer />
                    </PlayerListDispatchContext>
                </PlayerListContext>
            </LoadStateContext>
        </MantineProvider>
    );
}

export default App;
