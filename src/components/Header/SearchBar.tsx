import { TextInput } from "@mantine/core";
import { useContext } from "react";

import { PlayerListContext } from "@contexts/PlayerListContext";
import type { SearchBarProps } from "@project-types/Header";

const SearchBar = ({ callback }: SearchBarProps) => {
    const playerListState = useContext(PlayerListContext);

    const handleChange = (e: { target: { value: string } }) => {
        const inputValue = e.target.value;

        callback && callback(inputValue);
    };

    return (
        <TextInput
            placeholder="Search media player..."
            value={playerListState.query}
            onChange={handleChange}
        />
    );
};

export default SearchBar;
