import type { SizeProp } from "@fortawesome/fontawesome-svg-core";
import type { DisplayType } from "@reducers/PlayerDisplayReducer";
import type { MediaPlayer, Source } from "@project-types/MediaPlayer";

export type MediaPlayersListProps = {
    players: MediaPlayer[];
    icons: string[];
    showWeb: boolean;
};

export type MediaPlayerProps = {
    player: MediaPlayer;
    icon: string;
    showWeb: boolean;
};

export type SourceProps = {
    source: Source;
    size?: SizeProp;
};

export type DisplayProps = {
    type: DisplayType;
    componentProps: MediaPlayersListProps;
    showWeb: boolean;
};

export type ActualDisplayProps = {
    players: MediaPlayer[];
    icons: string[];
}