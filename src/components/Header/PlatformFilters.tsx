import {
    ActionIcon,
    ActionIconGroup,
    Flex,
    Text,
    Tooltip,
    VisuallyHidden,
} from "@mantine/core";
import { useContext, useState } from "react";
import { Platform } from "../../utils/CheckAvailability";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import classes from "./PlatformFilters.module.css";
import { PlayerCountContext } from "../../contexts/PlayerCountContext";

type PlatformFiltersProps = {
    callback: (values: string[]) => void;
};

const PlatformFilters = ({ callback }: PlatformFiltersProps) => {
    const [platformFilters, setPlatformFilters] = useState<string[]>([]);
    const [buttonsState, setButtonsState] = useState({
        linuxActive: false,
        winActive: false,
        macActive: false,
        webActive: false,
    });

    const playerCount = useContext(PlayerCountContext);

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

        // @ts-expect-error
        buttonStates[key] = !buttonStates[key];

        setButtonsState(buttonStates);
    };

    return (
        <div className={classes.inner}>
            {" "}
            <Flex>
                <Text>Filter by platform:</Text>
            </Flex>
            <ActionIconGroup>
                <Tooltip label="Windows">
                    <ActionIcon
                        variant={
                            buttonsState.winActive
                                ? "filterpressed"
                                : "filterunpressed"
                        }
                        onClick={() => {
                            handleTagClick(Platform.Windows);
                            handleButtonStateChange("winActive");
                        }}
                        size={"xl"}
                    >
                        <VisuallyHidden>Windows</VisuallyHidden>
                        <FontAwesomeIcon icon={faWindows} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="MacOS">
                    <ActionIcon
                        variant={
                            buttonsState.macActive
                                ? "filterpressed"
                                : "filterunpressed"
                        }
                        onClick={() => {
                            handleTagClick(Platform.Mac);
                            handleButtonStateChange("macActive");
                        }}
                        size={"xl"}
                    >
                        <VisuallyHidden>MacOS</VisuallyHidden>
                        <FontAwesomeIcon icon={faApple} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Linux">
                    <ActionIcon
                        variant={
                            buttonsState.linuxActive
                                ? "filterpressed"
                                : "filterunpressed"
                        }
                        onClick={() => {
                            handleTagClick(Platform.Linux);
                            handleButtonStateChange("linuxActive");
                        }}
                        size={"xl"}
                    >
                        <VisuallyHidden>Linux</VisuallyHidden>
                        <FontAwesomeIcon icon={faLinux} />
                    </ActionIcon>
                </Tooltip>

                <Tooltip label="Web">
                    <ActionIcon
                        variant={
                            buttonsState.webActive
                                ? "filterpressed"
                                : "filterunpressed"
                        }
                        onClick={() => {
                            handleTagClick(Platform.Web);
                            handleButtonStateChange("webActive");
                        }}
                        size={"xl"}
                    >
                        <VisuallyHidden>Web</VisuallyHidden>
                        <FontAwesomeIcon icon={faGlobe} />
                    </ActionIcon>
                </Tooltip>
            </ActionIconGroup>
            <Flex>
                <Text>{playerCount} results</Text>
            </Flex>
        </div>
    );
};

export default PlatformFilters;
