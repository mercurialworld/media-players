import type { SizeProp } from "@fortawesome/fontawesome-svg-core";
import type { DisplayType } from "../reducers/PlayerDisplayReducer";
import type { MediaPlayer, Source } from "./MediaPlayer";

export type MediaPlayersListProps = {
    players: MediaPlayer[];
    icons: string[];
};

export type MediaPlayerProps = {
    player: MediaPlayer;
    icon: string;
};

export type SourceProps = {
    source: Source;
    size?: SizeProp;
};

export type DisplayProps = {
    type: DisplayType;
    componentProps: MediaPlayersListProps;
};
