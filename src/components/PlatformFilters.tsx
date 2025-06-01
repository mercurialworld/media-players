import { Button, Group, Text } from "@mantine/core";
import { useState } from "react";
import { Platform } from "../utils/CheckAvailability";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

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
        <div>
            <Text>
                <br /> Filter by platform...
            </Text>
            <Group justify="center">
                <Button
                    leftSection={<FontAwesomeIcon icon={faWindows} />}
                    variant={
                        buttonsState.winActive ? "filterpressed" : "filterunpressed"
                    }
                    onClick={() => {
                        handleTagClick(Platform.Windows);
                        handleButtonStateChange("winActive");
                    }}
                >
                    Windows
                </Button>
                <Button
                    leftSection={<FontAwesomeIcon icon={faApple} />}
                    variant={
                        buttonsState.macActive ? "filterpressed" : "filterunpressed"
                    }
                    onClick={() => {
                        handleTagClick(Platform.Mac);
                        handleButtonStateChange("macActive");
                    }}
                >
                    MacOS
                </Button>
                <Button
                    leftSection={<FontAwesomeIcon icon={faLinux} />}
                    variant={
                        buttonsState.linuxActive
                            ? "filterpressed"
                            : "filterunpressed"
                    }
                    onClick={() => {
                        handleTagClick(Platform.Linux);
                        handleButtonStateChange("linuxActive");
                    }}
                >
                    Linux
                </Button>
                <Button
                    leftSection={<FontAwesomeIcon icon={faGlobe} />}
                    variant={
                        buttonsState.webActive ? "filterpressed" : "filterunpressed"
                    }
                    onClick={() => {
                        handleTagClick(Platform.Web);
                        handleButtonStateChange("webActive");
                    }}
                >
                    Web
                </Button>
            </Group>
        </div>
    );
};

export default PlatformFilters;
