import { useEffect, useState } from "react";

export const useGetMediaPlayers = () => {
    // players and icons
    const [players, setPlayers] = useState([]);
    const [icons, setIcons] = useState([]);

    // loading/error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://live.musicpresence.app/v3/players.json")
            .then((response) => response.json())
            .then((data) => {
                console.log(data.icons);
                setPlayers(data.players);
                setIcons(data.icons);
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return { players, icons, loading, error };
};
