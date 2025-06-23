import { Button, Image, Table } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";
import type { MediaPlayerProps } from "../../../types/MediaPlayerDisplay";
import {
    LinuxAvailability,
    MacAvailability,
    WindowsAvailability,
} from "../MediaPlayerPlatforms";
import classes from "./MediaPlayerTable.module.css";

const MediaPlayersTableRow = ({ player, icon }: MediaPlayerProps) => {
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
                        {player.url.replace("https://", "").replace("www.", "")}
                    </Button>
                </div>
            </Table.Td>
        </Table.Tr>
    );
};

export default MediaPlayersTableRow;
