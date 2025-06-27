import { Button, Card, Image, Title } from "@mantine/core";
import { IconExternalLink } from "@tabler/icons-react";

import {
    LinuxAvailability,
    MacAvailability,
    WebAvailability,
    WindowsAvailability,
} from "@components/MediaPlayer/MediaPlayerPlatforms";
import type { MediaPlayerProps } from "@project-types/MediaPlayerDisplay";

import classes from "@styles/MediaPlayerCard.module.css";
import commonClasses from "@styles/MediaPlayerDisplay.module.css";

const MediaPlayerCard = ({ player, icon, showWeb }: MediaPlayerProps) => {
    return (
        <Card withBorder p="xl" radius="md" className={classes.card}>
            <div className={classes.inner} color="#000">
                <div className={classes.icon}>
                    <Image
                        src={icon}
                        className={`${classes.image} ${commonClasses.playerLogo}`}
                        alt={`The logo for ${player.name}.`}
                    ></Image>
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
                        {showWeb && <WebAvailability source={player.sources} />}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default MediaPlayerCard;
