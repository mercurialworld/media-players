import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";

import { Button, Table, Tooltip } from "@mantine/core";
import { useContext } from "react";

import { GetIconURL } from "@components/MediaPlayer/common";
import MediaPlayersTableRow from "@components/MediaPlayer/Table/MediaPlayerTableRow";
import PlatformFilters from "@components/PlatformFilters/PlatformFilters";
import { LoadStateContext } from "@contexts/LoadStateContext";
import {
    PlayerListContext,
    PlayerListDispatchContext,
} from "@contexts/PlayerListContext";
import type { MediaPlayer } from "@project-types/MediaPlayer";
import type { MediaPlayersListProps } from "@project-types/MediaPlayerDisplay";
import { SortOptions } from "@reducers/PlayerListManipReducer";
import type { Platform } from "@utils/CheckAvailability";

const MediaPlayersTable = ({ players, icons, showWeb }: MediaPlayersListProps) => {
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
                showWeb={showWeb}
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
    };

    return (
        <Table.ScrollContainer minWidth={500}>
            <Table verticalSpacing={"md"} highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>
                            <Tooltip
                                label={
                                    playerListState.sortDirection ===
                                    SortOptions.ASCENDING
                                        ? "Name (ascending)"
                                        : "Name (descending)"
                                }
                            >
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
                            </Tooltip>
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
