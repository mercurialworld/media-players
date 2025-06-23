import type { Source } from "../types/MediaPlayer";

export enum Platform {
    LINUX = "Linux",
    MAC = "MacOS",
    WINDOWS = "Windows",
    WEB = "Web",
}

export function AvailableOn(platform: Platform, source: Source): boolean | null {
    switch (platform) {
        case Platform.LINUX:
            return source.lin_mpris !== undefined;
        case Platform.WINDOWS:
            return source.win_winrt !== undefined || source.win_smtc !== undefined;
        case Platform.MAC:
            return (
                source.mac_mediaremote !== undefined ||
                source.mac_bundle !== undefined
            );
        case Platform.WEB:
            return source.web_domain !== undefined;
        default:
            return null;
    }
}
