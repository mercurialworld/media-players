import {
    createTheme,
    defaultVariantColorsResolver,
    parseThemeColor,
    rgba,
} from "@mantine/core";

export const MantineTheme = createTheme({
    variantColorResolver: (input) => {
        const defaultResolvedColors = defaultVariantColorsResolver(input);
        const parsedColor = parseThemeColor({
            color: input.color || input.theme.primaryColor,
            theme: input.theme,
        });

        if (input.variant === "weblink") {
            return {
                ...defaultResolvedColors,
                background: rgba(parsedColor.value, 0),
                hover: rgba(parsedColor.value, 0),
            };
        }

        if (input.variant === "filterunpressed") {
            return {
                ...defaultResolvedColors,
                background: "var(--mantine-color-dark-3)",
                hover: "var(--mantine-color-dark-4)",
            };
        }

        if (input.variant === "filterpressed") {
            return {
                ...defaultResolvedColors,
                background: "var(--mantine-color-dark-4)",
                hover: "var(--mantine-color-dark-5)",
            };
        }

        return defaultResolvedColors;
    },
});
