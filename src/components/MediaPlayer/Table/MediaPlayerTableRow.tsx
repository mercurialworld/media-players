import { Button, Image, Table } from "@mantine/core";
import { IconCheck, IconExternalLink } from "@tabler/icons-react";
import classes from "./MediaPlayerTable.module.css";
import type { RowProps } from "./types";

const MediaPlayersTableRow = ({ row }: RowProps) => {
    return (
        <Table.Tr key={`${row.id}-table-row`}>
            <Table.Td>
                <div className={classes.name}>
                    <Image
                        src={row.icon}
                        className={classes.image}
                        alt={`The logo for ${row.name}.`}
                    />
                    <span>{row.name}</span>
                </div>
            </Table.Td>
            <Table.Td>{row.windows ? <IconCheck size={25} /> : null}</Table.Td>
            <Table.Td>{row.mac ? <IconCheck size={25} /> : null}</Table.Td>
            <Table.Td>{row.linux ? <IconCheck size={25} /> : null}</Table.Td>
            {/* <Table.Td> 
                {row.web ? <IconCheck size={25}/> : null}
            </Table.Td> */}
            <Table.Td>
                <div className={classes.site}>
                    <Button
                        rightSection={<IconExternalLink size={14} />}
                        size="compact-sm"
                        variant="weblink"
                        component="a"
                        href={row.website}
                    >
                        {row.website.substring(8, row.website.length)}
                    </Button>
                </div>
            </Table.Td>
        </Table.Tr>
    );
};

export default MediaPlayersTableRow;
