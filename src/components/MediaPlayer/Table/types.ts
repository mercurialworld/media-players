export interface MediaPlayerRow {
    id: string, // machine-readable name
    icon: string, // icon URL
    name: string, 
    website: string, // website of player
    windows: boolean,
    mac: boolean,
    linux: boolean,
    web: boolean
}