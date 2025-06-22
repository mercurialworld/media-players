import { useContext } from "react";
import { LoadStateContext } from "../../contexts/LoadStateContext";
import { PlayerListContext } from "../../contexts/PlayerListContext";
import MediaPlayersTable from "./Table/MediaPlayerTable";

const MediaPlayerDisplay = () => {
    const loadState = useContext(LoadStateContext);
    const playerListState = useContext(PlayerListContext);

    return (
        <MediaPlayersTable
            players={playerListState.filteredPlayers}
            icons={loadState.icons}
        />
    );
};

export default MediaPlayerDisplay;
