import {
    Button,
    useComputedColorScheme,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons-react";

export function ColourSchemeToggle() {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("dark", {
        getInitialValueInEffect: true,
    });

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
    };

    return (
        <Button
            variant="filterunpressed"
            onClick={toggleColorScheme}
            rightSection={
                computedColorScheme === "dark" ? <IconMoonStars /> : <IconSun />
            }
        >
            {computedColorScheme === "dark" ? "Dark" : "Light"}
        </Button>
    );
}
