import { Button, Card, Image, Title } from "@mantine/core";
import classes from "./MediaPlayerCard.module.css";
import type { MediaPlayer } from "../../types/MediaPlayer";
import {
    LinuxAvailability,
    MacAvailability,
    WebAvailability,
    WindowsAvailability,
} from "./MediaPlayerPlatforms";
import { IconExternalLink } from "@tabler/icons-react";

type MediaPlayerProps = {
    player: MediaPlayer;
    icon: string;
};

const MediaPlayerCard = ({ player, icon }: MediaPlayerProps) => {
    return (
        <Card withBorder p="xl" radius="md" className={classes.card}>
            <div className={classes.inner} color="#000">
                <div className={classes.icon}>
                    <Image src={icon} className={classes.image}></Image>
                </div>
                <div className={classes.detail}>
                    <Title order={1} className={classes.lead}>
                        {player.name}
                    </Title>
                    <Button
                        className={classes.websitebutton}
                        rightSection={<IconExternalLink size={14} />}
                        size="compact-md"
                        variant="weblink"
                        component="a"
                        href={player.url}
                    >
                        Website
                    </Button>
                    <div className={classes.platforms}>
                        <WindowsAvailability source={player.sources} />
                        <MacAvailability source={player.sources} />
                        <LinuxAvailability source={player.sources} />
                        <WebAvailability source={player.sources} />
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default MediaPlayerCard;
