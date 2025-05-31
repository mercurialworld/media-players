import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Source } from "../types/MediaPlayer";
import {
    AvailableOnLinux,
    AvailableOnMac,
    AvailableOnWeb,
    AvailableOnWindows,
} from "../utils/CheckAvailability";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

// there will only be three operating systems and the web this is fine :^)
type SourceProps = {
    source: Source;
};

export const LinuxAvailability = ({ source }: SourceProps) => {
    return AvailableOnLinux(source) ? <FontAwesomeIcon icon={faLinux} /> : null;
};

export const WindowsAvailability = ({ source }: SourceProps) => {
    return AvailableOnWindows(source) ? <FontAwesomeIcon icon={faWindows} /> : null;
};

export const MacAvailability = ({ source }: SourceProps) => {
    return AvailableOnMac(source) ? <FontAwesomeIcon icon={faApple} /> : null;
};

export const WebAvailability = ({ source }: SourceProps) => {
    return AvailableOnWeb(source) ? <FontAwesomeIcon icon={faGlobe} /> : null;
};
