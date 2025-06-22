import { useContext } from "react";
import { LoadStateContext } from "../../contexts/LoadStateContext";
import { PlayerListContext } from "../../contexts/PlayerListContext";
import MediaPlayerCards from "./Cards/MediaPlayerCards";
import classes from "./MediaPlayerDisplay.module.css";

const MediaPlayerDisplay = () => {
    const loadState = useContext(LoadStateContext);
    const playerListState = useContext(PlayerListContext);

    return (
        <div className={classes.displayWrapper}>
            <div className={classes.display}>
                {loadState.loading && <p>Loading...</p>}
                {loadState.error && (
                    <p>Error loading players: {loadState.errorString}</p>
                )}
                {!loadState.loading && !loadState.error && (
                    <MediaPlayerCards
                        players={playerListState.filteredPlayers}
                        icons={loadState.icons}
                    />
                )}
            </div>
        </div>
    );
};

export default MediaPlayerDisplay;
