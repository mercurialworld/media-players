import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Tooltip } from "@mantine/core";

import type { Source } from "../../../types/MediaPlayer";
import { AvailableOn, Platform } from "../../../utils/CheckAvailability";

// there will only be three operating systems and the web this is fine :^)
type SourceProps = {
    source: Source;
};

export const LinuxAvailability = ({ source }: SourceProps) => {
    return AvailableOn(Platform.Linux, source) ? (
        <Tooltip label="Linux" position="bottom">
            <FontAwesomeIcon icon={faLinux} />
        </Tooltip>
    ) : null;
};

export const WindowsAvailability = ({ source }: SourceProps) => {
    return AvailableOn(Platform.Windows, source) ? (
        <Tooltip label="Windows" position="bottom">
            <FontAwesomeIcon icon={faWindows} />
        </Tooltip>
    ) : null;
};

export const MacAvailability = ({ source }: SourceProps) => {
    return AvailableOn(Platform.Mac, source) ? (
        <Tooltip label="MacOS" position="bottom">
            <FontAwesomeIcon icon={faApple} />
        </Tooltip>
    ) : null;
};

export const WebAvailability = ({ source }: SourceProps) => {
    return AvailableOn(Platform.Web, source) ? (
        <Tooltip label="Web" position="bottom">
            <FontAwesomeIcon icon={faGlobe} />
        </Tooltip>
    ) : null;
};
