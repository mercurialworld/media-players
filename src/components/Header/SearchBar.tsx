import { TextInput } from "@mantine/core";
import { useState } from "react";
import type { SearchBarProps } from "./types";

const SearchBar = ({ callback }: SearchBarProps) => {
    const [value, setValue] = useState("");

    const handleChange = (e: { target: { value: string } }) => {
        const inputValue = e.target.value;
        setValue(inputValue);

        callback && callback(inputValue);
    };

    return (
        <TextInput
            placeholder="Search media player..."
            value={value}
            onChange={handleChange}
        />
    );
};

export default SearchBar;
