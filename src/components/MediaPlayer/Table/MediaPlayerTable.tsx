import { Button, Table } from "@mantine/core";
import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useContext } from "react";

import { LoadStateContext } from "../../../contexts/LoadStateContext";
import {
    PlayerListContext,
    PlayerListDispatchContext,
} from "../../../contexts/PlayerListContext";
import { SortOptions } from "../../../reducers/PlayerListManipReducer";
import type { MediaPlayer } from "../../../types/MediaPlayer";
import type { MediaPlayersListProps } from "../../../types/MediaPlayerDisplay";
import type { Platform } from "../../../utils/CheckAvailability";
import PlatformFilters from "../../PlatformFilters/PlatformFilters";
import { GetIconURL } from "../common";
import MediaPlayersTableRow from "./MediaPlayerTableRow";

const MediaPlayersTable = ({ players, icons }: MediaPlayersListProps) => {
    // Initial list
    const loadState = useContext(LoadStateContext);
    // List after filters
    const playerListState = useContext(PlayerListContext);
    const playerListDispatch = useContext(PlayerListDispatchContext);

    const rows = players.map((player: MediaPlayer) => {
        let iconURL = GetIconURL(icons, player.id);

        return (
            <MediaPlayersTableRow
                key={`${player.id}-table-row`}
                player={player}
                icon={iconURL}
            />
        );
    });

    const SortDispatch = () => {
        playerListDispatch({
            type: "toggleSort",
        });
    };

    const FilterDispatch = (platform: Platform) => {
        playerListDispatch({
            type: playerListState.platforms[platform] ? "removeFilter" : "addFilter",
            players: loadState.players,
            platform: platform,
        });

        // sort afterwards
        playerListDispatch({
            type: "sort",
        });
    };

    return (
        <Table.ScrollContainer minWidth={500}>
            <Table verticalSpacing={"md"} highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <Button
                                justify="space-between"
                                fullWidth
                                rightSection={
                                    playerListState.sortDirection ===
                                    SortOptions.ASCENDING ? (
                                        <IconSortAscending />
                                    ) : (
                                        <IconSortDescending />
                                    )
                                }
                                variant="weblink"
                                onClick={() => {
                                    SortDispatch();
                                }}
                                key="name"
                            >
                                Name
                            </Button>
                        </Table.Th>
                        <PlatformFilters callback={FilterDispatch} />
                        <Table.Th>
                            <Button
                                fullWidth
                                justify="space-between"
                                variant="weblink"
                                size="compact-sm"
                            >
                                Website
                            </Button>
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
};

export default MediaPlayersTable;
