import {
    IconBrandApple,
    IconBrandUbuntu,
    IconBrandWindowsFilled,
    IconWorld,
} from "@tabler/icons-react";
import type { Source } from "../types/MediaPlayer";

// there will only be three operating systems and the web this is fine :^)
type SourceProps = {
    source: Source;
};

export const LinuxAvailability = ({ source }: SourceProps) => {
    return source.lin_mpris ? <IconBrandUbuntu /> : null;
};

export const WindowsAvailability = ({ source }: SourceProps) => {
    return source.win_winrt || source.win_smtc ? <IconBrandWindowsFilled /> : null;
};

export const MacAvailability = ({ source }: SourceProps) => {
    return source.mac_mediaremote || source.mac_bundle ? <IconBrandApple /> : null;
};

export const WebAvailability = ({ source }: SourceProps) => {
    return source.web_domain ? <IconWorld /> : null;
};
