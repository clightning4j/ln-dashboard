import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
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
  check_amount_msat,
  convert,
} from "../../utils/AppUtils";
import { Channel } from "../../model/CoreLN";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContentWrapper from "../notification/Notification.component";

const PREFIX = "NodeTable";

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
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

export function NodeTable(): JSX.Element {
  const { data, error } = useSWR("/api/channelsInfo", fetcher);
  const [btcPrice, setBtcPrice] = useState(-1);
  useEffect(() => {
    getPrices("BTC-USD").then((price) => {
      setBtcPrice(price["price"]);
    });
  });
  const [open, setOpen] = useState(false);
  const [ping, setPing] = useState(false);

  async function handleClick(nodeId: string) {
    let nodeUp = await pingNode(nodeId);
    setPing(nodeUp);
    setOpen(true);
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (error) {
    return <></>;
  }
  if (!data || btcPrice === -1) return <Loading />;
  if (data.channels.length == 0) {
    return <></>;
  }
  console.debug("BTC price " + btcPrice);
  return (
    <StyledBox
      mt={theme.spacing(1)}
      mb={theme.spacing(2)}
      className={classes.root}
    >
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
                  <Button
                    onClick={() => {
                      handleClick(channel.peer_id);
                    }}
                  >
                    Ping
                  </Button>
                  <Snackbar
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    autoHideDuration={6000}
                    onClick={handleClose}
                    onClose={() => setOpen(false)}
                  >
                    <Box>
                      <SnackbarContentWrapper
                        onClose={handleClose}
                        variant={ping ? "success" : "error"}
                        message={ping ? "The node is up" : "The node is down"}
                      />
                    </Box>
                  </Snackbar>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledBox>
  );
}
