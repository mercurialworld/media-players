import Settings from "@components/Settings/Settings";
import { Text, Title } from "@mantine/core";
import classes from "@styles/Information.module.css";

const Info = () => {
    return (
        <div className={classes.info}>
            <div className={classes.settings}>
                <Settings />
            </div>
            <div className={classes.title}>
                <Title order={1}>Media Players</Title>
            </div>
            <Text>
                <p>
                    This is a list of all media players that Music Presence can
                    detect. It is always kept up to date from official sources.
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
            </Text>
        </div>
    );
};

export default Info;
