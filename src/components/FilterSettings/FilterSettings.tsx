import { Button, Tooltip } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useContext } from "react";

import DisplayToggle from "@components/FilterSettings/DisplayToggle";
import PlatformFilters from "@components/FilterSettings/PlatformFilters";
import SettingsModal from "@components/Settings/SettingsModal";
import { LoadStateContext } from "@contexts/LoadStateContext";
import {
    PlayerDisplayContext,
    PlayerDisplayDispatchContext,
} from "@contexts/PlayerDisplayContext";
import {
    PlayerListContext,
    PlayerListDispatchContext,
} from "@contexts/PlayerListContext";
import type { SettingsSection } from "@project-types/Settings";
import { DisplayType } from "@reducers/PlayerDisplayReducer";
import type { Platform } from "@utils/CheckAvailability";

const FilterSettings = () => {
    // Initial list
    const loadState = useContext(LoadStateContext);
    // List after filters
    const playerListState = useContext(PlayerListContext);
    const playerListDispatch = useContext(PlayerListDispatchContext);
    // Display state
    const playerDisplayState = useContext(PlayerDisplayContext);
    const playerDisplayDispatch = useContext(PlayerDisplayDispatchContext);

    const [isOpen, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery("(max-width: 50em)");

    const FilterDispatch = (platform: Platform) => {
        playerListDispatch({
            type: playerListState.platforms[platform] ? "removeFilter" : "addFilter",
            players: loadState.players,
            platform: platform,
        });
    };

    const DisplayToggleDispatch = () => {
        // reset list and filters
        playerListDispatch({
            type: "refresh",
            players: loadState.players,
        });

        // switch type
        playerDisplayDispatch({
            type: "switch",
        });
    };

    const settings: SettingsSection[] = [
        {
            sectionTitle: "Display",
            sectionSettings: [
                {
                    settingTitle: "Display Mode",
                    setter: <DisplayToggle callback={DisplayToggleDispatch} />,
                },
            ],
        },
    ];

    const cardsOnlySettings: SettingsSection[] = [
        {
            sectionTitle: "Platforms",
            sectionSettings: [
                {
                    settingTitle: "Filter by platform",
                    setter: <PlatformFilters callback={FilterDispatch} />,
                },
            ],
        },
    ];

    return (
        <>
            <SettingsModal
                opened={isOpen}
                onClose={close}
                title={"Settings"}
                centered={!isMobile}
                fullScreen={isMobile}
                transitionProps={{ transition: "fade", duration: 200 }}
                settings={
                    playerDisplayState.display === DisplayType.CARDS
                        ? settings.concat(cardsOnlySettings)
                        : settings
                }
            />

            <Tooltip label="Change how the site looks">
                <Button
                    variant="filterunpressed"
                    key="FilterSettingsButton"
                    onClick={open}
                >
                    Display Settings
                </Button>
            </Tooltip>
        </>
    );
};

export default FilterSettings;
