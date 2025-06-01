import {
    createTheme,
    defaultVariantColorsResolver,
    parseThemeColor,
    rgba,
} from "@mantine/core";

export const MantineTheme = createTheme({
    colors: {
        black: [
            "#f4f4f5",
            "#e6e6e6",
            "#cbcbcb",
            "#aeaeae",
            "#969697",
            "#868689",
            "#7e7f84",
            "#6c6c72",
            "#5f6067",
            "#323339",
        ],
    },
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
                hover: "var(--mantine-color-dark-3)",
            };
        }

        return defaultResolvedColors;
    },
});
