import "@mantine/core/styles.css";
import "./App.css";

import { MantineProvider } from "@mantine/core";
import { useEffect, useState } from "react";

import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Info from "./components/Header/Information";
import MediaPlayersTable from "./components/MediaPlayer/Table/MediaPlayersTable";
import { PlayerCountContext } from "./contexts/PlayerCountContext";
import { getMediaPlayers } from "./hooks/GetMediaPlayers";
import { MantineTheme } from "./theme";
import type { MediaPlayer } from "./types/MediaPlayer";
import { AvailableOn } from "./utils/CheckAvailability";

function App() {
    // players and icons
    const [players, setPlayers] = useState([]);
    const [icons, setIcons] = useState([]);

    // loading/error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [playerCount, setPlayerCount] = useState(0);
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
        setPlayerCount(filteredItems.length);
    };

    const handleSearchInputChange = (search: string) => {
        setSearch(search);

        filterPlayers(null, search);
    };

    const handleFiltersChange = (platforms: string[]) => {
        filterPlayers(platforms, search);
    };

    useEffect(() => {
        // KLJDFGFDAJGLIOKJNEIRKOLJAYHNPK$I%J<MYR$P%EK#OJM&YN$PEK:%IOJM
        let ignore = false;

        getMediaPlayers
            .then((data: any) => {
                if (!ignore) {
                    setPlayers(data.players);
                    setIcons(data.icons);
                }
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
        if (players.length > 0) {
            setFilteredPlayers(players);
            setPlayerCount(players.length);
        }
        return () => {
            ignore = true;
        };
    }, []);

    return (
        <MantineProvider defaultColorScheme="dark" theme={MantineTheme}>
            <Info />
            <PlayerCountContext value={playerCount}>
                <Header
                    searchCallback={handleSearchInputChange}
                    filterCallback={handleFiltersChange}
                />
            </PlayerCountContext>
            <div className="content">
                {loading && <p>Loading...</p>}
                {error && <p>Error loading players.</p>}
                {!loading && !error && (
                    <MediaPlayersTable players={filteredPlayers} icons={icons} />
                )}
            </div>
            <Footer />
        </MantineProvider>
    );
}

export default App;
