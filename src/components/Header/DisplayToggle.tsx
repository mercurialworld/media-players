import { Button } from "@mantine/core";
import { useContext } from "react";
import { PlayerDisplayContext } from "../../contexts/PlayerDisplayContext";
import { DisplayType } from "../../reducers/PlayerDisplayReducer";
import type { DisplayToggleProps } from "../../types/Header";

const DisplayToggle = ({ callback }: DisplayToggleProps) => {
    const playerDisplayState = useContext(PlayerDisplayContext);

    const OnPress = () => {
        callback && callback();
    };

    return (
        <div>
            <Button onClick={() => OnPress()}>
                {playerDisplayState.display === DisplayType.CARDS
                    ? "Show Table"
                    : "Show Cards"}
            </Button>
        </div>
    );
};

export default DisplayToggle;
