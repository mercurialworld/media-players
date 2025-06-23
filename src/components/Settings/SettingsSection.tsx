import { Group, Stack, Text, Title } from "@mantine/core";
import type { SettingProps, SettingsSectionProps } from "@project-types/Settings";

export const SettingDisplay = ({ title, description, children }: SettingProps) => {
    return (
        <Group justify="space-between" align="start">
            <Stack gap={"xs"}>
                <Title order={3}>{title}</Title>
                <Text c="dimmed" size="sm">
                    {description}
                </Text>
            </Stack>
            <Stack gap={"xs"}>
                {children}
                <div></div>
            </Stack>
        </Group>
    );
};

export const SettingSection = ({ title, children }: SettingsSectionProps) => {
    return (
        <Stack gap={"lg"}>
            <Stack gap={"md"}>
                <Title order={2}>{title}</Title>
                {children}
            </Stack>
        </Stack>
    );
};
