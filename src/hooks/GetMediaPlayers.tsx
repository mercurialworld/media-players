import type { MediaPlayer } from "../types/MediaPlayer";

export const getMediaPlayers = new Promise((resolve, reject) => {
    fetch("https://live.musicpresence.app/v3/players.json")
        .then((response) => response.json())
        .then((data) => {
            var players = data.players;

            // some music players have "-zh-placeholder" at the end of their names
            // (or, whatever language code besides ZH).
            players.forEach((player: MediaPlayer) => {
                if (player.id.endsWith("-placeholder")) {
                    // strip the placeholder part out of the id
                    var actualPlayerID = player.id.substring(
                        0,
                        player.id.length - 15,
                    );

                    console.log(`actual player ID is ${actualPlayerID}`);

                    // and then transplant the info from the non-placeholder
                    var nonPlaceholderPlayer: MediaPlayer = players.find(
                        (player: MediaPlayer) => player.id == actualPlayerID,
                    );

                    player.sources = nonPlaceholderPlayer.sources;
                    player.url = nonPlaceholderPlayer.url;
                }
            });
            resolve(data);
        })
        .catch((err) => {
            reject(new Error(`Something happened: ${err}`));
        });
});
