import { Group, Image, Stack } from "@mantine/core";
import classes from "./Information.module.css";

const Info = () => {
    return (
        <Stack gap={0} className={classes.info}>
            <Group justify="center">
                <Image
                    h={45}
                    w="auto"
                    src="https://raw.githubusercontent.com/music-presence/icons/refs/heads/master/dist/tray-dark.png"
                ></Image>
                <h1>Media Players</h1>
            </Group>
            <Stack gap={0}>
                {" "}
                <p>
                    This lists all media players that Music Presence can detect, and
                    is always up to date.
                </p>
                <p>
                    Note that some media players listed might need additional setup.
                    Check the{" "}
                    <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/supported-media-players.md#additional-notes">
                        Additional Notes
                    </a>{" "}
                    section for more information.
                </p>
                <p>
                    Don't see your media player?{" "}
                    <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/troubleshooting.md#if-your-media-player-is-still-not-detected">
                        Submit it!
                    </a>
                </p>
            </Stack>
        </Stack>
    );
};

export default Info;
