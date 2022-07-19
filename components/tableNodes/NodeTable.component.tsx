import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import useSWR from "swr";
import Loading from "../genericView/Loading.component";
import theme from "../../theme/DarkTheme";
import {
  fetcher,
  pingNode,
  intoSatoshi,
  getPrices,
} from "../../utils/AppUtils";
import { Channel } from "../../model/CoreLN";

const PREFIX = 'NodeTable';

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`
};

const StyledBox = styled(Box)({
  [`&.${classes.root}`]: {
    width: "100%",
  },
  [`& .${classes.container}`]: {
    maxHeight: "100vh",
    maxWidth: "100vw",
  },
});

type NodeTableProps = {
  show: (visible: boolean, message: string) => void;
};

export function NodeTable({ show }: NodeTableProps): JSX.Element {
  const { data, error } = useSWR("/api/channelsInfo", fetcher);
  console.debug(data);
  const [btcPrice, setBtcPrice] = useState(-1);
  useEffect(() => {
    getPrices("BTC-USD", show).then((price) => {
      setBtcPrice(price["price"]);
    });
  });


  if (error) {
    show(true, "Error: " + error);
    return <></>;
  }
  if (!data || btcPrice === -1) return <Loading />;
  if (data.channels.length == 0) {
    show(true, "No channels open in this node");
    return <></>;
  }

  function convert(param: any): number {
    if (param instanceof Number) {
      return param as number;
    }
    return parseInt(param);
  }
  function check_amount_msat(param: any): string {
    // if it is a number we return the value by appending msat
    if (param instanceof Number) {
      return `${param} msats`;
    } else {
      if (!param.includes("msat")) {
        return `${param} msats`;
      }
      return param;
    }
  }
  console.debug("BTC price " + btcPrice);
  return (
    <StyledBox mt={theme.spacing(1)} mb={theme.spacing(2)} className={classes.root}>
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader aria-label="Node that shows the list of nodes">
          <TableHead>
            <TableRow>
              <TableCell>Node Name</TableCell>
              <TableCell>Node Id</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Sat Size</TableCell>
              <TableCell>USD Size</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.channels.map((channel: Channel, index: number) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  <Chip
                    label={channel.node_info.alias}
                    style={{ background: "#" + channel.node_info.color }}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {channel.peer_id}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Chip
                    label={channel.connected ? "Online" : "Offine"}
                    style={{
                      background:
                        "#" + (channel.connected ? "82ad44" : "f07178"),
                    }}
                  />
                  {}
                </TableCell>
                <TableCell component="th" scope="row">
                  {check_amount_msat(channel.amount_msat)}
                </TableCell>
                <TableCell component="th" scope="row">
                  {intoSatoshi(Number(btcPrice), convert(channel.amount_msat)) +
                    " USD"}
                </TableCell>
                <TableCell component="th" scope="row">
                  {channel.state}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button onClick={() => pingNode(channel.peer_id, show)}>
                    Ping
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledBox>
  );
}
