import type { Source } from "../types/MediaPlayer";

export const AvailableOnLinux = (source: Source) => {
    return source.lin_mpris;
};

export const AvailableOnWindows = (source: Source) => {
    return source.win_winrt || source.win_smtc;
};

export const AvailableOnMac = (source: Source) => {
    return source.mac_mediaremote || source.mac_bundle;
};

export const AvailableOnWeb = (source: Source) => {
    return source.web_domain;
};
