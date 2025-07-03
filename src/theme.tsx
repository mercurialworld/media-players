import {
    createTheme,
    defaultVariantColorsResolver,
    parseThemeColor,
    rgba,
} from "@mantine/core";

export const MantineTheme = createTheme({
    fontFamily: "Roboto, sans-serif",
    headings: {
        fontFamily: "Nunito, sans-serif",
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
                color: "var(--important-text-color)",
                background: rgba(parsedColor.value, 0),
                hover: rgba(parsedColor.value, 0),
            };
        }

        if (input.variant === "settings") {
            return {
                ...defaultResolvedColors,
                color: "var(--important-text-color)",
                background: "var(--mantine-color-body)",
                hover: "var(--mantine-color-body)",
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
