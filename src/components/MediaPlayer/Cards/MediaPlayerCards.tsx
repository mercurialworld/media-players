import { SimpleGrid } from "@mantine/core";

import type { MediaPlayer } from "../../../types/MediaPlayer";
import type { MediaPlayersListProps } from "../../../types/MediaPlayerDisplay";
import { GetIconURL } from "../common";
import MediaPlayerCard from "./MediaPlayerCard";

const MediaPlayerCards = ({ players, icons }: MediaPlayersListProps) => {
    const createPlayerCard = (player: MediaPlayer) => {
        let icon = GetIconURL(icons, player.id);

        return <MediaPlayerCard key={player.id} player={player} icon={icon} />;
    };

    return (
        <div>
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl" mt={50}>
                {players.map((player) => createPlayerCard(player))}
            </SimpleGrid>
        </div>
    );
};

export default MediaPlayerCards;
