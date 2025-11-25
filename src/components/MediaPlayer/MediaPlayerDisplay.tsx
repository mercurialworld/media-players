import { Suspense, useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";

import MediaPlayerCards from "@components/MediaPlayer/Cards/MediaPlayerCards";
import MediaPlayerTable from "@components/MediaPlayer/Table/MediaPlayerTable";
import { LoadStateContext } from "@contexts/LoadStateContext";
import { PlayerDisplayContext } from "@contexts/PlayerDisplayContext";
import { PlayerListContext } from "@contexts/PlayerListContext";
import type { ActualDisplayProps, MediaPlayersListProps } from "@project-types/MediaPlayerDisplay";
import { DisplayType } from "@reducers/PlayerDisplayReducer";

import classes from "@styles/MediaPlayerDisplay.module.css";

const ShowMediaPlayers = (type: DisplayType, components: MediaPlayersListProps) => {
    return type === DisplayType.CARDS ? (
        <MediaPlayerCards
            players={components.players}
            icons={components.icons}
            showWeb={components.showWeb}
        />
    ) : (
        <MediaPlayerTable
            players={components.players}
            icons={components.icons}
            showWeb={components.showWeb}
        />
    );
};

const MediaPlayerDisplay = ({players, icons}: ActualDisplayProps) => {
    // Loading state
    const loadState = useContext(LoadStateContext);
    // List after filters
    const playerListState = useContext(PlayerListContext);
    // Display state
    const playerDisplayState = useContext(PlayerDisplayContext);

    return (
        <div className={classes.displayWrapper}>
            <ErrorBoundary fallback={<p>Error in loading, check console for more details.</p>}>
                <Suspense fallback={<p>Loading...</p>}>
                    <div className={classes.display}>
                        {ShowMediaPlayers(playerDisplayState.display, {
                            players: players,
                            icons: icons,
                            showWeb: playerListState.showWeb,
                        })}
                    </div>
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};

export default MediaPlayerDisplay;
