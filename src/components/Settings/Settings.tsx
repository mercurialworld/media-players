import { IconSettings } from "@tabler/icons-react";

import { Button, Tooltip } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

import { ColourSchemeToggle } from "@components/Settings/Setting/ColourSchemeToggle";
import { RepresentsToggle } from "@components/Settings/Setting/RepresentsToggle";
import { WebToggle } from "@components/Settings/Setting/WebToggle";
import SettingsModal from "@components/Settings/SettingsModal";
import type { SettingsSection } from "@project-types/Settings";

const Settings = () => {
    const [isOpen, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery("(max-width: 50em)");

    const settings: SettingsSection[] = [
        {
            sectionTitle: "Display",
            sectionSettings: [
                {
                    settingTitle: "Colour scheme",
                    setter: <ColourSchemeToggle />,
                },
            ],
        },
        {
            sectionTitle: "Behaviour",
            sectionSettings: [
                {
                    settingTitle: "Show representations while searching",
                    settingDescription:
                        'e.g. Cider appears when searching for "apple" as it\'s an Apple Music client',
                    setter: <RepresentsToggle />,
                },
            ],
        },
        {
            sectionTitle: "Experimental",
            sectionSettings: [
                {
                    settingTitle: "Show web compatibility",
                    settingDescription: (
                        <strong>
                            THE BROWSER EXTENSION IS NOT OUT YET. <br />
                            DO NOT ASK WHY THERE IS NO BROWSER COMPATIBILITY IN THE
                            DISCORD SERVER.
                        </strong>
                    ),
                    setter: <WebToggle />,
                },
            ],
        },
    ];

    return (
        <>
            <SettingsModal
                opened={isOpen}
                onClose={close}
                title={"Settings"}
                centered={!isMobile}
                fullScreen={isMobile}
                transitionProps={{ transition: "fade", duration: 200 }}
                settings={settings}
            />

            <Tooltip label="Website settings">
                {/* "Why not use an ActionIcon here?"
                because for some reason it's not visible on webkit.
                for now we can just use a Button with no text */}
                <Button
                    key="SettingsButton"
                    rightSection={<IconSettings size={40} />}
                    size={"compact-xl"}
                    variant="settings"
                    onClick={open}
                />
            </Tooltip>
        </>
    );
};

export default Settings;
