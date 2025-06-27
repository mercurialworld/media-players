import { LoadStateContext } from "@contexts/LoadStateContext";
import { PlayerListDispatchContext } from "@contexts/PlayerListContext";
import { Switch } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useContext } from "react";

export function WebToggle() {
    // Initial list
    const loadState = useContext(LoadStateContext);
    // Modify the filtered list
    const playerListDispatch = useContext(PlayerListDispatchContext);

    const [showWeb, setShowWeb] = useLocalStorage<boolean>({
        key: "show-web",
        defaultValue: false,
    });

    const ToggleWeb = () => {
        setShowWeb(showWeb ? false : true);
    };

    const SendDispatches = () => {
        playerListDispatch({
            type: "setWeb",
            value: !showWeb, // [FIXME] WHY
        });

        playerListDispatch({
            type: "refresh",
            players: loadState.players,
        });
    };

    return (
        <Switch
            aria-label="Toggle whether to show web entries"
            color="var(--mantine-color-dark-3)"
            checked={showWeb}
            onClick={() => {
                ToggleWeb();
                SendDispatches();
            }}
        />
    );
}
