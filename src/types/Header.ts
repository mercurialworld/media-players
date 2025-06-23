import type { Platform } from "../utils/CheckAvailability";

export type PlatformFiltersProps = {
    callback: (value: Platform) => void;
};

export type PlatformButtonProps = {
    platform: Platform;
    faIcon: any;
    activeState: boolean;
};

export type SearchBarProps = {
    callback: (value: string) => void;
};

export type DisplayToggleProps = {
    callback: () => void;
};
