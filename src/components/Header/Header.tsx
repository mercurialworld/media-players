import { Text } from "@mantine/core";
import { useContext } from "react";

import SearchBar from "@components/Header/SearchBar";
import { LoadStateContext } from "@contexts/LoadStateContext";
import {
    PlayerListContext,
    PlayerListDispatchContext,
} from "@contexts/PlayerListContext";

import FilterSettings from "@components/FilterSettings/FilterSettings";
import classes from "@styles/Header.module.css";

const Header = () => {
    // Initial list
    const loadState = useContext(LoadStateContext);
    // List after filters
    const playerListState = useContext(PlayerListContext);
    const playerListDispatch = useContext(PlayerListDispatchContext);

    const SearchDispatch = (query: string) => {
        playerListDispatch({
            type: "search",
            players: loadState.players,
            query: query,
        });
    };

    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <div className={classes.filterRow}>
                    <FilterSettings />
                    <SearchBar callback={SearchDispatch} />
                </div>
                <div className={classes.resultsRow}>
                    <Text size="sm">
                        {playerListState.filteredPlayers.length} players
                    </Text>
                </div>
            </div>
        </header>
    );
};

export default Header;
