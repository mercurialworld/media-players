import { Anchor, Container, Group } from "@mantine/core";
import classes from "./Footer.module.css";

const Footer = () => {
    const links = [
        {
            link: "https://github.com/ungive/discord-music-presence/",
            label: "Music Presence",
        },
        { link: "https://github.com/mercurialworld/media-players", label: "Source" },
    ];

    const items = links.map((link) => (
        <Anchor<"a">
            c="dimmed"
            key={link.label}
            href={link.link}
            onClick={(event) => event.preventDefault()}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Group>
                    <div>
                        Made with ♥ by{" "}
                        <Anchor
                            href="https://github.com/mercurialworld"
                            target="_blank"
                        >
                            mercurialworld
                        </Anchor>
                        .
                    </div>
                </Group>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
};

export default Footer;
