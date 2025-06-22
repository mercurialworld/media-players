import { Table } from "@mantine/core";

import type { MediaPlayer } from "../../../types/MediaPlayer";
import { GetIconURL, type MediaPlayersListProps } from "../common";
import MediaPlayersTableRow from "./MediaPlayerTableRow";

const MediaPlayersTable = ({ players, icons }: MediaPlayersListProps) => {
    const rows = players.map((player: MediaPlayer) => {
        let iconURL = GetIconURL(icons, player.id);

        return (
            <MediaPlayersTableRow
                key={`${player.id}-table-row`}
                player={player}
                icon={iconURL}
            />
        );
    });

    return (
        <Table.ScrollContainer minWidth={500}>
            <Table verticalSpacing={"md"} highlightOnHover>
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
    );
};

export default MediaPlayersTable;
