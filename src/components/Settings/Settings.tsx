import { ColourSchemeToggle } from "@components/Settings/Setting/ColourSchemeToggle";
import SettingsModal from "@components/Settings/SettingsModal";
import { ActionIcon, Switch, Title } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import type { SettingsSection } from "@project-types/Settings";
import { IconSettings } from "@tabler/icons-react";

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
                    setter: <Switch />,
                },
                {
                    settingTitle: "Default display",
                    setter: <Switch />,
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
                    setter: <Switch />,
                },
            ],
        },
    ];

    return (
        <>
            <SettingsModal
                opened={isOpen}
                onClose={close}
                title={<Title order={1}>Settings</Title>}
                centered={!isMobile}
                fullScreen={isMobile}
                transitionProps={{ transition: "fade", duration: 200 }}
                settings={settings}
            />

            <ActionIcon size={"xl"} variant="weblink" onClick={open}>
                <IconSettings size={"md"} />
            </ActionIcon>
        </>
    );
};

export default Settings;
