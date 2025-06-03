import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Source } from "../../types/MediaPlayer";
import { AvailableOn, Platform } from "../../utils/CheckAvailability";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

// there will only be three operating systems and the web this is fine :^)
type SourceProps = {
    source: Source;
};

export const LinuxAvailability = ({ source }: SourceProps) => {
    return AvailableOn(Platform.Linux, source) ? (
        <FontAwesomeIcon icon={faLinux} title="Linux" />
    ) : null;
};

export const WindowsAvailability = ({ source }: SourceProps) => {
    return AvailableOn(Platform.Windows, source) ? (
        <FontAwesomeIcon icon={faWindows} title="Windows" />
    ) : null;
};

export const MacAvailability = ({ source }: SourceProps) => {
    return AvailableOn(Platform.Mac, source) ? (
        <FontAwesomeIcon icon={faApple} title="MacOS" />
    ) : null;
};

export const WebAvailability = ({ source }: SourceProps) => {
    return AvailableOn(Platform.Web, source) ? (
        <FontAwesomeIcon icon={faGlobe} title="Web" />
    ) : null;
};
