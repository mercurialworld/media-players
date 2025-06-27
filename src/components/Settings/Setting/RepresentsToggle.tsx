import { LoadStateContext } from "@contexts/LoadStateContext";
import { PlayerListDispatchContext } from "@contexts/PlayerListContext";
import { Switch } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useContext } from "react";

export function RepresentsToggle() {
    // Initial list
    const loadState = useContext(LoadStateContext);
    // Modify the list
    const playerListDispatch = useContext(PlayerListDispatchContext);

    // The actual setting
    const [represents, setRepresents] = useLocalStorage<boolean>({
        key: "show-represents",
        defaultValue: false,
    });

    const ToggleRepresents = () => {
        setRepresents(represents ? false : true);
    };

    const SendDispatch = () => {
        playerListDispatch({
            type: "setRepresentations",
            value: !represents, // [FIXME] is this a race condition
        });

        playerListDispatch({
            type: "refresh",
            players: loadState.players,
        });
    };

    return (
        <Switch
            aria-label="Toggle whether to search for players that other players can represent"
            color="var(--mantine-color-dark-3)"
            checked={represents}
            onChange={() => {
                ToggleRepresents();
                SendDispatch();
            }}
        />
    );
}
