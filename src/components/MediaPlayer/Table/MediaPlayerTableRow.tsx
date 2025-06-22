import { Button, Image, Table } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import {
    LinuxAvailability,
    MacAvailability,
    WindowsAvailability,
} from "../MediaPlayerPlatforms";
import classes from "./MediaPlayerTable.module.css";
import type { RowProps } from "./types";

const MediaPlayersTableRow = ({ player, icon }: RowProps) => {
    return (
        <Table.Tr>
            <Table.Td>
                <div className={classes.name}>
                    <Image
                        src={icon}
                        className={classes.image}
                        alt={`The logo for ${player.name}.`}
                    />
                    <span>{player.name}</span>
                </div>
            </Table.Td>
            <Table.Td>
                <WindowsAvailability source={player.sources} size={"xl"} />
            </Table.Td>
            <Table.Td>
                <MacAvailability source={player.sources} size={"xl"} />
            </Table.Td>
            <Table.Td>
                <LinuxAvailability source={player.sources} size={"xl"} />
            </Table.Td>
            {/* <Table.Td> 
                <WebAvailability source={player.sources} size={"xl"} />
            </Table.Td> */}
            <Table.Td>
                <div className={classes.site}>
                    <Button
                        rightSection={<IconExternalLink size={14} />}
                        size="compact-sm"
                        variant="weblink"
                        component="a"
                        href={player.url}
                    >
                        {player.url.substring(8, player.url.length)}
                    </Button>
                </div>
            </Table.Td>
        </Table.Tr>
    );
};

export default MediaPlayersTableRow;
