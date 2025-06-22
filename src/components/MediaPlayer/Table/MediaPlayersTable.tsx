import { Table } from '@mantine/core';

import type { MediaPlayer } from '../../../types/MediaPlayer';
import { AvailableOn, Platform } from '../../../utils/CheckAvailability';
import type { MediaPlayersListProps } from "../common";
import classes from "./MediaPlayersTable.module.css";
import MediaPlayersTableRow from './MediaPlayersTableRow';
import type { MediaPlayerRow } from './types';


const defaultIconURL = "https://raw.githubusercontent.com/music-presence/icons/refs/heads/master/dist/tray-dark.png";

const createRow = (player: MediaPlayer, icons: string[]): MediaPlayerRow => {
    let iconURL =
        // @ts-expect-error (getting property with name "<player id>")
        icons[player.id]?.[2]?.url ?? // tray icon
        defaultIconURL

    return {
        id: player.id,
        icon: iconURL,
        name: player.name,
        website: player.url,
        windows: AvailableOn(Platform.Windows, player.sources) ?? false,
        mac: AvailableOn(Platform.Mac, player.sources) ?? false,
        linux: AvailableOn(Platform.Linux, player.sources) ?? false,
        web: AvailableOn(Platform.Web, player.sources) ?? false,
    }
}

const MediaPlayersTable = ({ players, icons }: MediaPlayersListProps) => {
    const rows = players.map((player: MediaPlayer) => {
        let row = createRow(player, icons);

        return <MediaPlayersTableRow row={row} />;
    });

    return (
        <Table.ScrollContainer minWidth={500}>
            <Table 
                verticalSpacing={"md"}
                className={classes.mediaPlayerTable}
                highlightOnHover
            >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Windows</Table.Th>
                        <Table.Th>Mac</Table.Th>
                        <Table.Th>Linux</Table.Th>
                        {/* <Table.Th>Web</Table.Th> */}
                        <Table.Th>Website</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
};

export default MediaPlayersTable;