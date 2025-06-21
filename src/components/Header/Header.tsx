import { Text } from "@mantine/core";
import { useContext } from "react";

import { PlayerCountContext } from "../../contexts/PlayerCountContext";
import classes from "./Header.module.css";
import PlatformFilters from "./PlatformFilters";
import SearchBar from "./SearchBar";

type HeaderProps = {
    searchCallback: (value: string) => void;
    filterCallback: (values: string[]) => void;
};

const Header = ({ searchCallback, filterCallback }: HeaderProps) => {
    const playerCount = useContext(PlayerCountContext);
    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <div className={classes.filterRow}>
                    <SearchBar callback={searchCallback} />{" "}
                    <PlatformFilters callback={filterCallback} />
                </div>
                <div className={classes.resultsRow}>
                    <Text size="sm">{playerCount} results</Text>
                </div>
            </div>
        </header>
    );
};

export default Header;
