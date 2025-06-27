import { Modal, Stack } from "@mantine/core";

import {
    SettingDisplay,
    SettingSection,
} from "@components/Settings/SettingsSection";
import type { SettingsModalProps } from "@project-types/Settings";

const SettingsModal = ({
    opened,
    onClose,
    title,
    centered,
    fullScreen,
    transitionProps,
    settings,
}: SettingsModalProps) => {
    // [TODO] there's no way around it, manually control the components yourself
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={title}
            centered={centered}
            fullScreen={fullScreen}
            transitionProps={transitionProps}
            size={"xl"}
        >
            <Stack gap={"lg"}>
                {settings.map((section) => (
                    <SettingSection
                        key={`${section.sectionTitle}Settings`}
                        title={section.sectionTitle}
                    >
                        {section.sectionSettings.map((setting) => (
                            <SettingDisplay
                                key={`${setting.settingTitle} section`}
                                title={setting.settingTitle}
                                description={setting.settingDescription ?? null}
                            >
                                {setting.setter}
                            </SettingDisplay>
                        ))}
                    </SettingSection>
                ))}
            </Stack>
        </Modal>
    );
};

export default SettingsModal;
