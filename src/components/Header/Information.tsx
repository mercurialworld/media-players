import { Text } from "@mantine/core";
import classes from "@styles/Information.module.css";

const Info = () => {
    return (
        <div className={classes.info}>
            <div>
                <Text>
                    Temporarily taking this down as there have been too many questions about it, implying it's a bit misleading. It'll come back in two weeks or so with clearer documentation.
                </Text>
                <br />
                <Text>
                    If you need to know if your media player is supported right now though, you can visit <a href="https://live.musicpresence.app/v3/players.json">https://live.musicpresence.app/v3/players.json</a> and search the JSON it gives you for the name of your player. <br /> <strong>Note that the browser extension is not released yet, so for now, disregard any of the "web" entries.</strong>
                </Text>
                <br />
                <Text>
                    This site might also be on the Internet Archive, probably.
                </Text>
                <br />
            </div>
        </div>
    );
};

export default Info;
