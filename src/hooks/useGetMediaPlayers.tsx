import { useEffect, useState } from "react";

import type { MediaPlayer } from "@project-types/MediaPlayer";

function useGetMediaPlayers(url: string) {
    const [players, setPlayers] = useState<MediaPlayer[]>([]);
    const [icons, setIcons] = useState<string[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let ignore = false;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (!ignore) {
                    var players: MediaPlayer[] = data.players;

                    // some music players have "-zh-placeholder" at the end of their names
                    // (or, whatever language code besides ZH).
                    players.forEach((player: MediaPlayer) => {
                        if (player.id.endsWith("-placeholder")) {
                            // strip the placeholder part out of the id
                            const actualPlayerID = player.id.substring(
                                0,
                                player.id.length - 15,
                            );

                            // and then transplant the info from the non-placeholder
                            const nonPlaceholderPlayer: MediaPlayer = players.find(
                                (player: MediaPlayer) => player.id == actualPlayerID,
                            )!;

                            player.sources = nonPlaceholderPlayer.sources;
                            player.url = nonPlaceholderPlayer.url;
                        }
                    });

                    // https://github.com/ungive/discord-music-presence/issues/244
                    players = players.filter(
                        (player: MediaPlayer) => player.id !== "qobuz",
                    );

                    setPlayers(players);
                    setIcons(data.icons);
                }

                return () => {
                    ignore = true;
                };
            })
            .catch((err) => {
                setError(err);
            });
    }, [url]);

    return { players, icons, error };
}

export default useGetMediaPlayers;
