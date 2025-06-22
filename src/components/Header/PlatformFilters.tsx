import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    ActionIcon,
    ActionIconGroup,
    Text,
    Tooltip,
    VisuallyHidden,
} from "@mantine/core";
import { useContext, useState } from "react";

import { PlayerListContext } from "../../contexts/PlayerListContext";
import type { PlatformButtonProps, PlatformFiltersProps } from "../../types/Header";
import { Platform } from "../../utils/CheckAvailability";
import classes from "./PlatformFilters.module.css";

const PlatformFilters = ({ callback }: PlatformFiltersProps) => {
    const playerListState = useContext(PlayerListContext);

    const [buttonsState, setButtonsState] = useState({
        linuxActive: false,
        winActive: false,
        macActive: false,
        webActive: false,
    });

    const platforms: PlatformButtonProps[] = [
        {
            platform: Platform.WINDOWS,
            faIcon: faWindows,
            activeState: buttonsState.winActive,
            activeStateName: "winActive",
        },
        {
            platform: Platform.MAC,
            faIcon: faApple,
            activeState: buttonsState.macActive,
            activeStateName: "macActive",
        },
        {
            platform: Platform.LINUX,
            faIcon: faLinux,
            activeState: buttonsState.linuxActive,
            activeStateName: "linuxActive",
        },
        // {
        //     platform: Platform.WEB,
        //     faIcon: faGlobe,
        //     activeState: buttonsState.webActive,
        //     activeStateName: "webActive",
        // },
    ];

    const PlatformFilterButton = ({
        platform,
        faIcon,
        activeState,
        activeStateName,
    }: PlatformButtonProps) => {
        return (
            <Tooltip label={platform} key={`${platform}-tooltip`}>
                <ActionIcon
                    variant={activeState ? "filterpressed" : "filterunpressed"}
                    onClick={() => {
                        handleTagClick(platform);
                        handleButtonStateChange(activeStateName);
                    }}
                    key={platform}
                    size={"xl"}
                >
                    <VisuallyHidden>{platform}</VisuallyHidden>
                    <FontAwesomeIcon icon={faIcon} />
                </ActionIcon>
            </Tooltip>
        );
    };

    const handleTagClick = (platform: Platform) => {
        const filters = structuredClone(playerListState.platformFilters);

        const idx = filters.indexOf(platform);
        if (idx > -1) {
            filters.splice(idx, 1);
        } else {
            filters.push(platform);
        }

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
            <Text size="sm">Platform:</Text>
            <ActionIconGroup>
                {platforms.map((platform) => PlatformFilterButton(platform))}
            </ActionIconGroup>
        </div>
    );
};

export default PlatformFilters;
