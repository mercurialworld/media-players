import "./App.css";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { useState, useEffect } from "react";
import type { MediaPlayer } from "./types/MediaPlayer";
import { MantineTheme } from "./theme";
import MediaPlayersList from "./components/MediaPlayer/MediaPlayersList";
import { useGetMediaPlayers } from "./hooks/useGetMediaPlayers";
import { AvailableOn } from "./utils/CheckAvailability";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Info from "./components/Header/Information";

function App() {
    const { players, icons, loading, error } = useGetMediaPlayers();
    const [filteredPlayers, setFilteredPlayers] = useState([]);
    const [search, setSearch] = useState("");

    const filterPlayers = (platforms: string[] | null = null, search: string) => {
        var filteredItems = players.filter((player: MediaPlayer) =>
            player.name.toLowerCase().includes(search.toLowerCase()),
        );

        if (platforms) {
            const platformFiltered = filteredItems.filter(function (
                player: MediaPlayer,
            ) {
                // no platforms selected
                if (platforms.length === 0) {
                    return true;
                } else {
                    // counts if the player is available in all platforms listed
                    var platformCount = 0;

                    platforms.forEach((platform) => {
                        if (AvailableOn(platform, player.sources)) {
                            platformCount++;
                        }
                    });

                    return platformCount === platforms.length;
                }
            });

            filteredItems = platformFiltered;
        }

        setFilteredPlayers(filteredItems);
    };

    const handleSearchInputChange = (search: string) => {
        setSearch(search);

        filterPlayers(null, search);
    };

    const handleFiltersChange = (platforms: string[]) => {
        filterPlayers(platforms, search);
    };

    useEffect(() => {
        if (players.length > 0) {
            setFilteredPlayers(players);
        }
    }, [players]);

    return (
        <MantineProvider defaultColorScheme="dark" theme={MantineTheme}>
            <Info />
            <Header
                searchCallback={handleSearchInputChange}
                filterCallback={handleFiltersChange}
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error loading players.</p>}
            {!loading && !error && (
                <MediaPlayersList players={filteredPlayers} icons={icons} />
            )}
            <Footer />
        </MantineProvider>
    );
}

export default App;
