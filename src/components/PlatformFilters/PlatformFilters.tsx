import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
    ActionIcon,
    ActionIconGroup,
    Button,
    Table,
    Text,
    Tooltip,
    VisuallyHidden,
} from "@mantine/core";
import { useContext } from "react";

import { IconFilter2, IconFilter2Cancel } from "@tabler/icons-react";
import { PlayerDisplayContext } from "../../contexts/PlayerDisplayContext";
import { PlayerListContext } from "../../contexts/PlayerListContext";
import { DisplayType } from "../../reducers/PlayerDisplayReducer";
import type { PlatformButtonProps, PlatformFiltersProps } from "../../types/Header";
import { Platform } from "../../utils/CheckAvailability";
import classes from "./PlatformFilters.module.css";

const PlatformFilters = ({ callback }: PlatformFiltersProps) => {
    const playerListState = useContext(PlayerListContext);
    const playerDisplayState = useContext(PlayerDisplayContext);

    const platforms: PlatformButtonProps[] = [
        {
            platform: Platform.WINDOWS,
            faIcon: faWindows,
            activeState: playerListState.platforms.Windows,
        },
        {
            platform: Platform.MAC,
            faIcon: faApple,
            activeState: playerListState.platforms.MacOS,
        },
        {
            platform: Platform.LINUX,
            faIcon: faLinux,
            activeState: playerListState.platforms.Linux,
        },
        // {
        //     platform: Platform.WEB,
        //     faIcon: faGlobe,
        //     activeState: playerListState.platforms.Web,
        // },
    ];

    const PlatformFilterButton = ({
        platform,
        faIcon,
        activeState,
    }: PlatformButtonProps) => {
        return (
            <Tooltip label={platform} key={`${platform}-tooltip`}>
                <ActionIcon
                    variant={activeState ? "filterpressed" : "filterunpressed"}
                    onClick={() => {
                        handleTagClick(platform);
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

    const PlatformFilterHeaderButton = ({
        platform,
        activeState,
    }: PlatformButtonProps) => {
        return (
            <Table.Th>
                <Button
                    rightSection={
                        activeState ? <IconFilter2 /> : <IconFilter2Cancel />
                    }
                    variant="weblink"
                    onClick={() => {
                        handleTagClick(platform);
                    }}
                    key={platform}
                >
                    {platform}
                </Button>
            </Table.Th>
        );
    };

    const handleTagClick = (platform: Platform) => {
        callback && callback(platform);
    };

    return playerDisplayState.display === DisplayType.CARDS ? (
        <div className={classes.inner}>
            <Text size="sm">Platform:</Text>
            <ActionIconGroup>
                {platforms.map((platform) => PlatformFilterButton(platform))}
            </ActionIconGroup>
        </div>
    ) : (
        <>{platforms.map((platform) => PlatformFilterHeaderButton(platform))}</>
    );
};

export default PlatformFilters;
