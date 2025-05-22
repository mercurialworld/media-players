export interface MediaPlayer {
    id: string;
    name: string;
    url: string;
    represents: string[];
    sources: Source;
    attributes: Attributes;
    content: string[];
    extra: Extra;
}

export interface Source {
    win_winrt?: string[];
    win_smtc?: string[];
    mac_mediaremote?: string[];
    mac_bundle?: string[];
    lin_mpris?: string[];
    web_domain?: string[];
}

export interface Attributes {
    pure: boolean;
    service: boolean;
}

export interface Extra {
    discord_application_id: string;
}
