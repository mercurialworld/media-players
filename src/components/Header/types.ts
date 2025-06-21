export type PlatformFiltersProps = {
    callback: (values: string[]) => void;
};

export type PlatformButtonProps = {
    platform: string;
    faIcon: any;
    activeState: boolean;
    activeStateName: string;
};

export type HeaderProps = {
    searchCallback: (value: string) => void;
    filterCallback: (values: string[]) => void;
};

export type SearchBarProps = {
    callback: (value: string) => void;
};

