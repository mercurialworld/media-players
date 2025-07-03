import Settings from "@components/Settings/Settings";
import { Group, Image, Text, Title } from "@mantine/core";
import classes from "@styles/Information.module.css";

const Info = () => {
    return (
        <div className={classes.info}>
            <div className={classes.settings}>
                <Settings />
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
                    Note that some media players listed might need additional setup.
                    Check the{" "}
                    <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/supported-media-players.md#additional-notes">
                        Additional Notes
                    </a>{" "}
                    section for more information.
                </Text>
                <br />
                <Text>
                    Don't see your media player?{" "}
                    <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/troubleshooting.md#if-your-media-player-is-still-not-detected">
                        Submit it!
                    </a>
                </Text>
            </div>
        </div>
    );
};

export default Info;
