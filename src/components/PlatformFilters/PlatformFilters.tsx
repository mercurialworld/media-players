import { faApple, faLinux, faWindows } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconFilter2, IconFilter2Cancel } from "@tabler/icons-react";

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

import { PlayerDisplayContext } from "@contexts/PlayerDisplayContext";
import { PlayerListContext } from "@contexts/PlayerListContext";
import type {
    PlatformButtonProps,
    PlatformFiltersProps,
} from "@project-types/Header";
import { DisplayType } from "@reducers/PlayerDisplayReducer";
import classes from "@styles/PlatformFilters.module.css";
import { Platform } from "@utils/CheckAvailability";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

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
    ];

    const web: PlatformButtonProps = {
        platform: Platform.WEB,
        faIcon: faGlobe,
        activeState: playerListState.platforms.Web,
    };

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
                    key={`${platform}Button`}
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
            <Table.Th key={`${platform}Header`}>
                <Button
                    rightSection={
                        activeState ? <IconFilter2 /> : <IconFilter2Cancel />
                    }
                    variant="weblink"
                    onClick={() => {
                        handleTagClick(platform);
                    }}
                    key={`${platform}HeaderButton`}
                >
                    {platform}
                </Button>
            </Table.Th>
        );
    };

    const handleTagClick = (platform: Platform) => {
        callback && callback(platform);
    };

    const getPlatforms = () => {
        return playerListState.showWeb ? platforms.concat(web) : platforms;
    };

    return playerDisplayState.display === DisplayType.CARDS ? (
        <div className={classes.inner}>
            <Text size="sm">Platform:</Text>
            <ActionIconGroup>
                {getPlatforms().map((platform) => PlatformFilterButton(platform))}
            </ActionIconGroup>
        </div>
    ) : (
        <>{getPlatforms().map((platform) => PlatformFilterHeaderButton(platform))}</>
    );
};

export default PlatformFilters;
