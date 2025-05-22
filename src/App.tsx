import "./App.css";
import { MediaPlayerCard } from "./components/MediaPlayerCard";
import "@mantine/core/styles.css";

import { MantineProvider, SimpleGrid, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
import type { MediaPlayer } from "./types/MediaPlayer";
import { MantineTheme } from "./theme";

function App() {
    const [players, setPlayers] = useState([]);
    const [icons, setIcons] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPlayers, setFilteredPlayers] = useState([]);

    const handleSearchInputChange = (e: { target: { value: any } }) => {
        const search = e.target.value;
        setSearchQuery(search);

        const filteredItems = players.filter((player: MediaPlayer) =>
            player.name.toLowerCase().includes(search.toLowerCase()),
        );

        setFilteredPlayers(filteredItems);
    };

    const createPlayerCard = (player: MediaPlayer) => {
        console.log(player.id);

        let icon =
            "https://raw.githubusercontent.com/music-presence/icons/refs/heads/master/dist/logo-app-full.png";

        // some logos will just not exist, and that's okay
        try {
            icon = icons[player.id][0].url;
        } catch {
            // nothing
        }

        console.log(icon);

        return <MediaPlayerCard player={player} icon={icon} />;
    };

    useEffect(() => {
        fetch("https://live.musicpresence.app/v3/players.json")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.icons);
                setPlayers(data.players);
                setFilteredPlayers(data.players);
                setIcons(data.icons);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <MantineProvider defaultColorScheme="dark" theme={MantineTheme}>
            <h1>Media Players</h1>
            <p>
                All compatible players taken from the{" "}
                <a href="https://github.com/music-presence/media-players">
                    music-presence/media-players
                </a>{" "}
                repository.
            </p>
            <TextInput
                label="Search media player..."
                onChange={handleSearchInputChange}
            />
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
                {filteredPlayers.map((player) => createPlayerCard(player))}
            </SimpleGrid>
        </MantineProvider>
    );
}

export default App;
