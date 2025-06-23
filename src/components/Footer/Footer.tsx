import { Anchor, Container, Group, Text } from "@mantine/core";

import classes from "@styles/Footer.module.css";

const Footer = () => {
    const links = [
        {
            link: "https://github.com/ungive/discord-music-presence/",
            label: "Music Presence",
        },
        {
            link: "https://github.com/mercurialworld/media-players/",
            label: "Source",
        },
    ];

    const items = links.map((link) => (
        <Anchor<"a">
            c="var(--dimmed-link-text-color)"
            key={link.label}
            href={link.link}
            size="sm"
        >
            {link.label}
        </Anchor>
    ));

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Group>
                    <Text>
                        Made by{" "}
                        <a
                            className={classes.footerLink}
                            href="https://github.com/mercurialworld/"
                            target="_blank"
                        >
                            mercurialworld
                        </a>
                        , data from{" "}
                        <a
                            className={classes.footerLink}
                            href="https://github.com/music-presence/media-players"
                        >
                            music-presence/media-players
                        </a>
                        .
                    </Text>
                </Group>
                <Group className={classes.links}>{items}</Group>
            </Container>
        </div>
    );
};

export default Footer;
