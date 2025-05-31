import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { useState, useEffect } from "react";
import type { MediaPlayer } from "./types/MediaPlayer";
import { MantineTheme } from "./theme";
import MediaPlayersList from "./components/MediaPlayersList";
import SearchBar from "./components/SearchBar";
import { useGetMediaPlayers } from "./hooks/useGetMediaPlayers";

function App() {
    const { players, icons, loading, error } = useGetMediaPlayers();
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    const handleSearchInputChange = (search: string) => {
        const filteredItems = players.filter((player: MediaPlayer) =>
            player.name.toLowerCase().includes(search.toLowerCase()),
        );

        setFilteredPlayers(filteredItems);
    };

    useEffect(() => {
        if (players.length > 0) {
            setFilteredPlayers(players);
        }
    }, [players]);

    return (
        <MantineProvider defaultColorScheme="dark" theme={MantineTheme}>
            <h1>Media Players</h1>
            <p>
                Note that, although your media player may be compatible, it might not
                be right out of the box. Check the{" "}
                <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/supported-media-players.md#additional-notes">
                    Additional Notes
                </a>{" "}
                of the original media player compatibility document for extra setup.
            </p>
            <p>
                Don't see your media player?{" "}
                <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/troubleshooting.md#if-your-media-player-is-still-not-detected">
                    Submit it!
                </a>
            </p>
            <p>
                All compatible players taken from the{" "}
                <a href="https://github.com/music-presence/media-players">
                    music-presence/media-players
                </a>{" "}
                repository.
            </p>
            <SearchBar callback={handleSearchInputChange} />
            {loading && <p>Loading...</p>}
            {error && <p>Error loading players.</p>}
            {!loading && !error && (
                <MediaPlayersList players={filteredPlayers} icons={icons} />
            )}
        </MantineProvider>
    );
}

export default App;
