import type { TransitionProps } from "@mantine/core";
import type { ReactNode } from "react";

export type SettingProps = {
    title: string;
    description?: string | ReactNode | null;
    children: ReactNode;
};

// title and children
export type SettingsSectionProps = {
    title: string;
    children: ReactNode;
};

export type SettingsModalProps = {
    opened: boolean;
    onClose: () => void;
    title: ReactNode;
    centered?: boolean;
    fullScreen?: boolean;
    transitionProps?: Partial<Omit<TransitionProps, "mounted">>;
    settings: SettingsSection[];
};

export type SettingComponent = {
    settingTitle: string;
    settingDescription?: string | ReactNode;
    setter: ReactNode;
};

export type SettingsSection = {
    sectionTitle: string;
    sectionSettings: SettingComponent[];
};
