import SiteSettings from "@components/SiteSettings/SiteSettings";
import { Group, Image, Text, Title } from "@mantine/core";
import classes from "@styles/Information.module.css";

const Info = () => {
    return (
        <div className={classes.info}>
            <div className={classes.settings}>
                <SiteSettings />
            </div>
            <Group
                className={classes.title}
                gap="xs"
                align="center"
                justify="center"
            >
                <Image
                    darkHidden
                    h="calc(2rem + 2.5vw)"
                    w="auto"
                    fit="contain"
                    alt="The logo for Music Presence."
                    src="https://raw.githubusercontent.com/music-presence/icons/refs/heads/master/dist/tray-light.png"
                />
                <Image
                    lightHidden
                    h="calc(2rem + 2.5vw)"
                    w="auto"
                    fit="contain"
                    alt="The logo for Music Presence."
                    src="https://raw.githubusercontent.com/music-presence/icons/refs/heads/master/dist/tray-dark.png"
                />
                <Title order={1}>Media Players</Title>
            </Group>
            <br />
            <div>
                <Text>
                    This is a list of all media players that Music Presence can
                    detect. It is always kept up to date from official sources.
                </Text>
                <br />
                <Text>
                    Note that, although the player might be listed here, <strong>it might not be detected right away</strong>.
                    If that is the case, check the {" "}
                    <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/supported-media-players.md#additional-notes">
                        Additional Notes
                    </a>{" "}
                    section for more information, or join the {" "}
                    <a href="https://discord.gg/musicpresence">
                        Discord server
                    </a>{" "}
                    for more help if needed.
                </Text>
                <br />
                <Text>
                    If you can see your media player in your operating system's media controls (see{" "} 
                    <a href="https://imgur.com/a/media-control-interfaces-on-windows-mac-YDQegwW">
                        these images
                    </a>){" "}
                    , and it's not on this list, you should{" "}
                    <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/troubleshooting.md#if-your-media-player-is-still-not-detected">
                        submit it
                    </a>{" "}
                    so that the program can detect it.
                </Text>
            </div>
        </div>
    );
};

export default Info;
