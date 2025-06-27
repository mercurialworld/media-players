import { Text } from "@mantine/core";
import { useContext } from "react";

import DisplayToggle from "@components/Header/DisplayToggle";
import SearchBar from "@components/Header/SearchBar";
import PlatformFilters from "@components/PlatformFilters/PlatformFilters";
import { LoadStateContext } from "@contexts/LoadStateContext";
import {
    PlayerDisplayContext,
    PlayerDisplayDispatchContext,
} from "@contexts/PlayerDisplayContext";
import {
    PlayerListContext,
    PlayerListDispatchContext,
} from "@contexts/PlayerListContext";
import { DisplayType } from "@reducers/PlayerDisplayReducer";
import type { Platform } from "@utils/CheckAvailability";

import classes from "@styles/Header.module.css";

const Header = () => {
    // Initial list
    const loadState = useContext(LoadStateContext);
    // List after filters
    const playerListState = useContext(PlayerListContext);
    const playerListDispatch = useContext(PlayerListDispatchContext);
    // Display state
    const playerDisplayState = useContext(PlayerDisplayContext);
    const playerDisplayDispatch = useContext(PlayerDisplayDispatchContext);

    const SearchDispatch = (query: string) => {
        playerListDispatch({
            type: "search",
            players: loadState.players,
            query: query,
        });
    };

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

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <div className={classes.filterRow}>
                    <DisplayToggle callback={DisplayToggleDispatch} />
                    <SearchBar callback={SearchDispatch} />
                </div>
                <div className={classes.resultsRow}>
                    {playerDisplayState.display === DisplayType.CARDS && (
                        <PlatformFilters callback={FilterDispatch} />
                    )}
                    <Text size="sm">
                        {playerListState.filteredPlayers.length} players
                    </Text>
                </div>
            </div>
        </header>
    );
};

export default Header;
