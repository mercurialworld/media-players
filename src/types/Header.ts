import type { Platform } from "../utils/CheckAvailability";

export type PlatformFiltersProps = {
    callback: (values: Platform[]) => void;
};

export type PlatformButtonProps = {
    platform: Platform;
    faIcon: any;
    activeState: boolean;
    activeStateName: string;
};

export type SearchBarProps = {
    callback: (value: string) => void;
};
