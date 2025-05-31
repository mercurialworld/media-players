import {
    IconBrandApple,
    IconBrandUbuntu,
    IconBrandWindowsFilled,
    IconWorld,
} from "@tabler/icons-react";
import type { Source } from "../types/MediaPlayer";
import {
    AvailableOnLinux,
    AvailableOnMac,
    AvailableOnWeb,
    AvailableOnWindows,
} from "../utils/CheckAvailability";

// there will only be three operating systems and the web this is fine :^)
type SourceProps = {
    source: Source;
};

export const LinuxAvailability = ({ source }: SourceProps) => {
    return AvailableOnLinux(source) ? <IconBrandUbuntu /> : null;
};

export const WindowsAvailability = ({ source }: SourceProps) => {
    return AvailableOnWindows(source) ? <IconBrandWindowsFilled /> : null;
};

export const MacAvailability = ({ source }: SourceProps) => {
    return AvailableOnMac(source) ? <IconBrandApple /> : null;
};

export const WebAvailability = ({ source }: SourceProps) => {
    return AvailableOnWeb(source) ? <IconWorld /> : null;
};
