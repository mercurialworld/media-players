import { SimpleGrid } from "@mantine/core";
import type { MediaPlayer } from "../../types/MediaPlayer";
import MediaPlayerCard from "./MediaPlayerCard";
import classes from "./MediaPlayersList.module.css";

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

        return <MediaPlayerCard key={player.id} player={player} icon={icon} />;
    };

    return (
        <div className={classes.playersListWrapper}>
            <SimpleGrid
                cols={{ base: 1, sm: 2, md: 3 }}
                spacing="xl"
                mt={50}
                className={classes.playersList}
            >
                {players.map((player) => createPlayerCard(player))}
            </SimpleGrid>
        </div>
    );
};

export default MediaPlayersList;
