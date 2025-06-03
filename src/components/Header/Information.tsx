import classes from "./Information.module.css";

const Info = () => {
    return (
        <div className={classes.info}>
            <h1>Media Players</h1>
            <p>
                Note that, although your media player may be compatible, it might not
                be right out of the box. Check the{" "}
                <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/supported-media-players.md#additional-notes">
                    Additional Notes
                </a>{" "}
                of the original media player compatibility document for extra setup.
            </p>
            <p>
                Don't see your media player?{" "}
                <a href="https://github.com/ungive/discord-music-presence/blob/master/documentation/troubleshooting.md#if-your-media-player-is-still-not-detected">
                    Submit it!
                </a>
            </p>
            <p>
                All compatible players taken from the{" "}
                <a href="https://github.com/music-presence/media-players">
                    music-presence/media-players
                </a>{" "}
                repository.
            </p>
        </div>
    );
};

export default Info;
