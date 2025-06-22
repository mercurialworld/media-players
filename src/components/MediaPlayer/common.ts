export function GetIconURL(icons: string[], playerID: string): string {
    const defaultIconURL =
        "https://raw.githubusercontent.com/music-presence/icons/refs/heads/master/dist/tray-dark.png";

    // @ts-expect-error (getting property with name "<player id>")
    return icons[playerID]?.[0]?.url ?? defaultIconURL; // tray icon
}
