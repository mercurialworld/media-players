import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Tooltip } from "@mantine/core";

import type { SourceProps } from "@project-types/MediaPlayerDisplay";
import { AvailableOn, Platform } from "@utils/CheckAvailability";

// there will only be three operating systems and the web this is fine :^)

export const LinuxAvailability = ({ source, size }: SourceProps) => {
    return AvailableOn(Platform.LINUX, source) ? (
        <Tooltip label="Linux" position="bottom">
            <FontAwesomeIcon icon={faLinux} size={size} />
        </Tooltip>
    ) : null;
};

export const WindowsAvailability = ({ source, size }: SourceProps) => {
    return AvailableOn(Platform.WINDOWS, source) ? (
        <Tooltip label="Windows" position="bottom">
            <FontAwesomeIcon icon={faWindows} size={size} />
        </Tooltip>
    ) : null;
};

export const MacAvailability = ({ source, size }: SourceProps) => {
    return AvailableOn(Platform.MAC, source) ? (
        <Tooltip label="MacOS" position="bottom">
            <FontAwesomeIcon icon={faApple} size={size} />
        </Tooltip>
    ) : null;
};

export const WebAvailability = ({ source, size }: SourceProps) => {
    return AvailableOn(Platform.WEB, source) ? (
        <Tooltip label="Web" position="bottom">
            <FontAwesomeIcon icon={faGlobe} size={size} />
        </Tooltip>
    ) : null;
};
