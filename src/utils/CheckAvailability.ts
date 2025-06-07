import type { Source } from "../types/MediaPlayer";

export const Platform = {
    Linux: "Linux",
    Mac: "MacOS",
    Windows: "Windows",
    Web: "Web",
};

export function AvailableOn(platform: string, source: Source): boolean | null {
    switch (platform) {
        case Platform.Linux:
            return source.lin_mpris !== undefined;
        case Platform.Windows:
            return source.win_winrt !== undefined || source.win_smtc !== undefined;
        case Platform.Mac:
            return (
                source.mac_mediaremote !== undefined ||
                source.mac_bundle !== undefined
            );
        case Platform.Web:
            return source.web_domain !== undefined;
        default:
            return null;
    }
}
