import type { SizeProp } from "@fortawesome/fontawesome-svg-core";
import type { MediaPlayer, Source } from "../../types/MediaPlayer";

export type MediaPlayersListProps = {
    players: MediaPlayer[];
    icons: string[];
};

export type SourceProps = {
    source: Source;
    size?: SizeProp;
};

export function GetIconURL(icons: string[], playerID: string): string {
    const defaultIconURL =
        "https://raw.githubusercontent.com/music-presence/icons/refs/heads/master/dist/tray-dark.png";

    // @ts-expect-error (getting property with name "<player id>")
    return icons[playerID]?.[0]?.url ?? defaultIconURL; // tray icon
}
