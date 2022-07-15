import React, { useEffect, useState } from "react";
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
import { JSX } from "@babel/types";
import theme from "../../theme/DarkTheme";
import { fetcher, selectedOffer } from "../../utils/AppUtils";
import { makeStyles } from "@mui/styles";

type OfferTableProps = {
  show: (visible: boolean, message: string) => void;
};

const useStyles = makeStyles({
  root: {
    width: "65%",
  },
  container: {
    maxHeight: "100vh",
    maxWidth: "100vw",
  },
});

export function OfferTable({ show }: OfferTableProps): JSX.Element {
  const { data, error } = useSWR("/api/listoffers", fetcher);
  const classes = useStyles();
  const color = Math.random().toString(16).substr(-6);

  if (error) {
    show(true, "Error: " + error);
    return <></>;
  }
  if (!data) return <Loading />;
  if (data.offer.length == 0) {
    show(true, "No offers currently");
    return <></>;
  }
  return (
    <Box mt={theme.spacing(1)} mb={theme.spacing(2)} className={classes.root}>
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader aria-label="Node that shows the list of offers">
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.offer.map((offer: any, index: number) => (
              <TableRow key={index} hover>
                <TableCell component="th" scope="row">
                  <Chip
                    label={offer["label"] ? offer["label"] : "-----"}
                    style={{
                       background: "#" + color,
                    }}
                  />
                  {}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Chip
                    label={offer["active"] ? "Active" : "Offline"}
                    style={{
                      background: "#" + (offer["label"] ? "82ad44" : "f07178"),
                    }}
                  />
                  {}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button onClick={() => selectedOffer(offer["bolt12"], show)}>
                    Select
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
