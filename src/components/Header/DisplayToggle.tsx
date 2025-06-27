import { Button } from "@mantine/core";
import { useContext } from "react";

import { PlayerDisplayContext } from "@contexts/PlayerDisplayContext";
import type { DisplayToggleProps } from "@project-types/Header";
import { DisplayType } from "@reducers/PlayerDisplayReducer";

const DisplayToggle = ({ callback }: DisplayToggleProps) => {
    const playerDisplayState = useContext(PlayerDisplayContext);

    const OnPress = () => {
        callback && callback();
    };

    return (
        <div>
            <Button variant="filterunpressed" onClick={() => OnPress()}>
                {playerDisplayState.display === DisplayType.CARDS
                    ? "Show Table"
                    : "Show Cards"}
            </Button>
        </div>
    );
};

export default DisplayToggle;
