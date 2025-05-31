import { SimpleGrid } from "@mantine/core";
import type { MediaPlayer } from "../types/MediaPlayer";
import MediaPlayerCard from "./MediaPlayerCard";

type MediaPlayersListProps = {
    players: MediaPlayer[];
    icons: string[];
};

const MediaPlayersList = ({ players, icons }: MediaPlayersListProps) => {
    const createPlayerCard = (player: MediaPlayer) => {
        let icon =
            // @ts-expect-error (getting property with name "<player id>")
            icons[player.id]?.[2]?.url ?? // tray icon
            "https://raw.githubusercontent.com/music-presence/icons/refs/heads/master/dist/tray-dark.png";

        return <MediaPlayerCard player={player} icon={icon} />;
    };

    return (
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
            {players.map((player) => createPlayerCard(player))}
        </SimpleGrid>
    );
};

export default MediaPlayersList;
