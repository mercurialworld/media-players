import "@mantine/core/styles.css";
import "@styles/App.css";

import { MantineProvider } from "@mantine/core";
import { useEffect, useReducer } from "react";
import { MantineTheme } from "./theme";

import Footer from "@components/Footer/Footer";
import Header from "@components/Header/Header";
import Info from "@components/Header/Information";
import MediaPlayerDisplay from "@components/MediaPlayer/MediaPlayerDisplay";
import { LoadStateContext } from "@contexts/LoadStateContext";
import {
    PlayerDisplayContext,
    PlayerDisplayDispatchContext,
} from "@contexts/PlayerDisplayContext";
import {
    PlayerListContext,
    PlayerListDispatchContext,
} from "@contexts/PlayerListContext";
import useGetMediaPlayers from "@hooks/useGetMediaPlayers";
import {
    InitialLoadState,
    LoadStateReducer,
    LoadStateType,
} from "@reducers/LoadStateReducer";
import {
    DisplayStateReducer,
    InitialDisplayState,
} from "@reducers/PlayerDisplayReducer";
import {
    InitialListState,
    PlayerListManipReducer,
} from "@reducers/PlayerListManipReducer";

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
    const [displayType, displayTypeDispatch] = useReducer(
        DisplayStateReducer,
        InitialDisplayState,
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
        <MantineProvider defaultColorScheme="light" theme={MantineTheme}>
            <Info />
            <LoadStateContext value={loadState}>
                <PlayerListContext value={playersList}>
                    <PlayerListDispatchContext value={playersListDispatch}>
                        <PlayerDisplayContext value={displayType}>
                            <PlayerDisplayDispatchContext
                                value={displayTypeDispatch}
                            >
                                <Header />
                                <div className="content">
                                    <MediaPlayerDisplay />
                                </div>
                            </PlayerDisplayDispatchContext>
                        </PlayerDisplayContext>
                    </PlayerListDispatchContext>
                </PlayerListContext>
            </LoadStateContext>
            <Footer />
        </MantineProvider>
    );
}

export default App;
