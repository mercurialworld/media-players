import type { MediaPlayer, Source } from "../../../types/MediaPlayer";

export type SourceProps = {
    source: Source;
};

export type MediaPlayerProps = {
    player: MediaPlayer;
    icon: string;
};