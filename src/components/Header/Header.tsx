import classes from "./Header.module.css";
import SearchBar from "./SearchBar";
import PlatformFilters from "./PlatformFilters";

type HeaderProps = {
    searchCallback: (value: string) => void;
    filterCallback: (values: string[]) => void;
};

const Header = ({ searchCallback, filterCallback }: HeaderProps) => {
    return (
        <header className={classes.header}>
            <div className={classes.inner}>
                <SearchBar callback={searchCallback} />
                <PlatformFilters callback={filterCallback} />
            </div>
        </header>
    );
};

export default Header;
