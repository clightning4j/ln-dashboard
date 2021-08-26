import React from 'react'
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import Box from "@material-ui/core/Box";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import useSWR from "swr";
import Loading from "../genericView/Loading.component";
import {JSX} from "@babel/types";
import theme from "../../theme/DarkTheme"
import {fetcher, pingNode} from "../../utils/AppUtils"

type NodeTableProps = {
    show: (visible: boolean, message: string) => void
}

export function NodeTable({show}: NodeTableProps): JSX.Element {
    const { data, error } = useSWR('/api/channelsInfo', fetcher)
    if (error) {
        show(true, "Error: " + error)
        return <></>
    }
    if (!data)
        return <Loading />
    if (data.channels.length == 0) {
        show(true, "No channels open in this node");
        return <></>
    }
    show(true, "Ready :)");
    return <Box mt={theme.spacing(1)}>
        <TableContainer component={Paper}>
            <Table aria-label="Node that shows the list of nodes">
                <TableHead>
                    <TableRow>
                        <TableCell>Node Name</TableCell>
                        <TableCell>Node Id</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.channels.map((channel: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                <Chip
                                    label={channel.nodeInfo["alias"]}
                                    style={{ background: "#" + channel.nodeInfo["color"] }}
                                />
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {channel["peerId"]}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Chip
                                    label={channel["connected"] ? "Online" : "Offine"}
                                    style={{ background: "#" +  (channel["connected"] ? "82ad44" : "f07178")}}
                                />
                                {}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {channel["channelTotalSat"] + " sats"}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {channel["state"]}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Button
                                    onClick={() => pingNode(channel["peerId"], show)}
                                >
                                    Ping
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
}