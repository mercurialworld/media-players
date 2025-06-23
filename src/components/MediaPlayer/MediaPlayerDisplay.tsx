import { useContext } from "react";

import MediaPlayerCards from "@components/MediaPlayer/Cards/MediaPlayerCards";
import classes from "@components/MediaPlayer/MediaPlayerDisplay.module.css";
import MediaPlayerTable from "@components/MediaPlayer/Table/MediaPlayerTable";
import { LoadStateContext } from "@contexts/LoadStateContext";
import { PlayerDisplayContext } from "@contexts/PlayerDisplayContext";
import { PlayerListContext } from "@contexts/PlayerListContext";
import type { MediaPlayersListProps } from "@project-types/MediaPlayerDisplay";
import { DisplayType } from "@reducers/PlayerDisplayReducer";

const ShowMediaPlayers = (type: DisplayType, components: MediaPlayersListProps) => {
    return type === DisplayType.CARDS ? (
        <MediaPlayerCards players={components.players} icons={components.icons} />
    ) : (
        <MediaPlayerTable players={components.players} icons={components.icons} />
    );
};

const MediaPlayerDisplay = () => {
    // Loading state
    const loadState = useContext(LoadStateContext);
    // List after filters
    const playerListState = useContext(PlayerListContext);
    // Display state
    const playerDisplayState = useContext(PlayerDisplayContext);

    return (
        <div className={classes.displayWrapper}>
            <div className={classes.display}>
                {loadState.loading && <p>Loading...</p>}
                {loadState.error && (
                    <p>Error loading players: {loadState.errorString}</p>
                )}
                {!loadState.loading &&
                    !loadState.error &&
                    ShowMediaPlayers(playerDisplayState.display, {
                        players: playerListState.filteredPlayers,
                        icons: loadState.icons,
                    })}
            </div>
        </div>
    );
};

export default MediaPlayerDisplay;
