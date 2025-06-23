import { IconExternalLink } from "@tabler/icons-react";

import { Button, Image, Table, Title } from "@mantine/core";

import {
    LinuxAvailability,
    MacAvailability,
    WindowsAvailability,
} from "@components/MediaPlayer/MediaPlayerPlatforms";
import type { MediaPlayerProps } from "@project-types/MediaPlayerDisplay";

import commonClasses from "@styles/MediaPlayerDisplay.module.css";
import classes from "@styles/MediaPlayerTable.module.css";

const MediaPlayersTableRow = ({ player, icon }: MediaPlayerProps) => {
    return (
        <Table.Tr>
            <Table.Td>
                <div className={classes.name}>
                    <Image
                        src={icon}
                        className={`${classes.image} ${commonClasses.playerLogo}`}
                        alt={`The logo for ${player.name}.`}
                    />
                    <Title order={4}>{player.name}</Title>
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
