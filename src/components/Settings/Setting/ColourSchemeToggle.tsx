import { ActionIcon } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ColourSchemeToggle() {
    const [colourScheme, setColourScheme] = useLocalStorage<"light" | "dark">({
        key: "colour-scheme",
        defaultValue: "light",
    });

    const toggleColorScheme = () =>
        setColourScheme((current) => (current === "dark" ? "light" : "dark"));

    return (
        <ActionIcon onClick={toggleColorScheme}>
            {colourScheme === "dark" ? <IconMoonStars /> : <IconSun />}
        </ActionIcon>
    );
}
