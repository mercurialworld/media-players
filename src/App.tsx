import "@mantine/core/styles.css";
import "./App.css";

import { MantineProvider } from "@mantine/core";
import { useEffect, useReducer } from "react";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Info from "./components/Header/Information";
import MediaPlayersTable from "./components/MediaPlayer/Table/MediaPlayersTable";
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
    const [loadStateTasks, loadStateDispatch] = useReducer(
        LoadStateReducer,
        InitialLoadState,
    );
    const [listTasks, listTasksDispatch] = useReducer(
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

            listTasksDispatch({
                type: "init",
                players: players,
            });
        } else {
            loadStateDispatch({
                type: LoadStateType.ERROR,
                error: error,
            });
        }
    }, [players]);

    // handling filters/searches

    return (
        <MantineProvider defaultColorScheme="dark" theme={MantineTheme}>
            <Info />
            <LoadStateContext value={loadStateTasks}>
                <PlayerListContext value={listTasks}>
                    <PlayerListDispatchContext value={listTasksDispatch}>
                        <Header
                            searchCallback={handleSearchInputChange}
                            filterCallback={handleFiltersChange}
                        />
                        <div className="content">
                            {loadStateTasks.loading && <p>Loading...</p>}
                            {loadStateTasks.error && (
                                <p>
                                    Error loading players:{" "}
                                    {loadStateTasks.errorString}
                                </p>
                            )}
                            {!loadStateTasks.loading && !loadStateTasks.error && (
                                <MediaPlayersTable
                                    players={filteredPlayers}
                                    icons={icons}
                                />
                            )}
                        </div>
                        <Footer />
                    </PlayerListDispatchContext>
                </PlayerListContext>
            </LoadStateContext>
        </MantineProvider>
    );
}

export default App;
