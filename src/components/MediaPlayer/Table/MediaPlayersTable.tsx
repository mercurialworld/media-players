import { Button, Image, Table } from '@mantine/core';
import { IconCheck, IconExternalLink } from '@tabler/icons-react';

import type { MediaPlayer } from '../../../types/MediaPlayer';
import { AvailableOn, Platform } from '../../../utils/CheckAvailability';
import type { MediaPlayersListProps } from "../common";
import classes from "./MediaPlayersTable.module.css";
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

        return (
            <Table.Tr key={`${row.id}-table-row`}>
                <Table.Td> 
                    <div className={classes.name}>
                        <Image
                            src={row.icon}
                            className={classes.image}
                            alt={`The logo for ${row.name}.`}
                        />
                        <span>{row.name}</span>
                    </div>
                </Table.Td>
                <Table.Td> 
                    {row.windows ? <IconCheck size={25}/> : null}
                </Table.Td>
                <Table.Td> 
                    {row.mac ? <IconCheck size={25}/> : null}
                </Table.Td>
                <Table.Td> 
                    {row.linux ? <IconCheck size={25}/> : null}
                </Table.Td>
                {/* <Table.Td> 
                    {row.web ? <IconCheck size={25}/> : null}
                </Table.Td> */}
                <Table.Td> 
                    <div className={classes.site}>
                        <Button
                                rightSection={<IconExternalLink size={14} />}
                                size="compact-sm"
                                variant="weblink"
                                component="a"
                                href={row.website}
                            >
                               {row.website.substring(8, row.website.length)} 
                        </Button>
                    </div>
                </Table.Td>
            </Table.Tr>
        )
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