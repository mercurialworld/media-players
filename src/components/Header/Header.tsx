import { Text } from "@mantine/core";
import { useContext } from "react";

import { LoadStateContext } from "../../contexts/LoadStateContext";
import {
    PlayerListContext,
    PlayerListDispatchContext,
} from "../../contexts/PlayerListContext";
import type { Platform } from "../../utils/CheckAvailability";
import classes from "./Header.module.css";
import PlatformFilters from "./PlatformFilters";
import SearchBar from "./SearchBar";

const Header = () => {
    const loadState = useContext(LoadStateContext);
    const playerListState = useContext(PlayerListContext);
    const playerListDispatch = useContext(PlayerListDispatchContext);

    const SearchDispatch = (query: string) => {
        playerListDispatch({
            type: "search",
            players: loadState.players,
            query: query,
        });
    };

    const FilterDispatch = (platforms: Platform[]) => {
        playerListDispatch({
            type: "filter",
            players: loadState.players,
            platforms: platforms,
        });
    };

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <div className={classes.filterRow}>
                    <SearchBar callback={SearchDispatch} />{" "}
                </div>
                <div className={classes.resultsRow}>
                    <PlatformFilters callback={FilterDispatch} />
                    <Text size="sm">
                        {playerListState.filteredPlayers.length} players
                    </Text>
                </div>
            </div>
        </header>
    );
};

export default Header;
