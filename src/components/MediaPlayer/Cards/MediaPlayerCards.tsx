import { SimpleGrid } from "@mantine/core";

import MediaPlayerCard from "@components/MediaPlayer/Cards/MediaPlayerCard";
import { GetIconURL } from "@components/MediaPlayer/common";
import type { MediaPlayer } from "@project-types/MediaPlayer";
import type { MediaPlayersListProps } from "@project-types/MediaPlayerDisplay";

const MediaPlayerCards = ({ players, icons, showWeb }: MediaPlayersListProps) => {
    const createPlayerCard = (player: MediaPlayer) => {
        const icon = GetIconURL(icons, player.id);

        return (
            <MediaPlayerCard
                key={player.id}
                showWeb={showWeb}
                player={player}
                icon={icon}
            />
        );
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
