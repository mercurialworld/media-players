import {
    ActionIcon,
    ActionIconGroup,
    Text,
    Tooltip,
    VisuallyHidden,
} from "@mantine/core";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import classes from "./PlatformFilters.module.css";

type PlatformFiltersProps = {
    callback: (values: string[]) => void;
};

type PlatformButtonProps = {
    platform: string;
    faIcon: any;
    activeState: boolean;
    activeStateName: string;
};

const PlatformFilters = ({ callback }: PlatformFiltersProps) => {
    const [platformFilters, setPlatformFilters] = useState<string[]>([]);
    const [buttonsState, setButtonsState] = useState({
        linuxActive: false,
        winActive: false,
        macActive: false,
        webActive: false,
    });

    const platforms: PlatformButtonProps[] = [
        {
            platform: "Windows",
            faIcon: faWindows,
            activeState: buttonsState.winActive,
            activeStateName: "winActive",
        },
        {
            platform: "MacOS",
            faIcon: faApple,
            activeState: buttonsState.macActive,
            activeStateName: "macActive",
        },
        {
            platform: "Linux",
            faIcon: faLinux,
            activeState: buttonsState.linuxActive,
            activeStateName: "linuxActive",
        },
        {
            platform: "Web",
            faIcon: faGlobe,
            activeState: buttonsState.webActive,
            activeStateName: "webActive",
        },
    ];

    const PlatformFilterButton = ({
        platform,
        faIcon,
        activeState,
        activeStateName,
    }: PlatformButtonProps) => {
        return (
            <Tooltip label={platform}>
                <ActionIcon
                    variant={activeState ? "filterpressed" : "filterunpressed"}
                    onClick={() => {
                        handleTagClick(platform);
                        handleButtonStateChange(activeStateName);
                    }}
                    size={"xl"}
                >
                    <VisuallyHidden>{platform}</VisuallyHidden>
                    <FontAwesomeIcon icon={faIcon} />
                </ActionIcon>
            </Tooltip>
        );
    };

    const handleTagClick = (platform: string) => {
        const filters = structuredClone(platformFilters);

        const idx = filters.indexOf(platform);
        if (idx > -1) {
            filters.splice(idx, 1);
        } else {
            filters.push(platform);
        }

        setPlatformFilters(filters);

        callback && callback(filters);
    };

    const handleButtonStateChange = (key: string) => {
        const buttonStates = structuredClone(buttonsState);

        // @ts-expect-error (getting property that does exist)
        buttonStates[key] = !buttonStates[key];

        setButtonsState(buttonStates);
    };

    return (
        <div className={classes.inner}>
            <Text size="sm" visibleFrom="md">
                Platform:
            </Text>
            <ActionIconGroup>
                {platforms.map((platform) => PlatformFilterButton(platform))}
            </ActionIconGroup>
        </div>
    );
};

export default PlatformFilters;
