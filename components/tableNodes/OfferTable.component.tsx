import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import Box from "@mui/material/Box";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import theme from "../../theme/DarkTheme";
import { OfferInfo } from "../../model/CoreLN";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContentWrapper from "../notification/Notification.component";
import { useState } from "react";

type OfferTableProps = {
  listOffers: Array<OfferInfo>;
  onSelect: (offer: OfferInfo) => void;
};

const PREFIX = "OfferTable";

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
};

const StyledBox = styled(Box)({
  [`&.${classes.root}`]: {
    width: "85%",
  },
  [`& .${classes.container}`]: {
    maxHeight: "100vh",
    maxWidth: "100vw",
  },
});

export function OfferTable({
  listOffers,
  onSelect,
}: OfferTableProps): JSX.Element {
  const [open, setOpen] = useState(false);

  function handleClick() {
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
  return (
    <StyledBox
      mt={theme.spacing(1)}
      mb={theme.spacing(2)}
      className={classes.root}
    >
      <TableContainer component={Paper} className={classes.container}>
        <Table stickyHeader aria-label="Node that shows the list of offers">
          <TableHead>
            <TableRow>
              <TableCell>Active</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Single Use</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOffers.map((offer: OfferInfo, index: number) => (
              <TableRow key={index} hover>
                <TableCell component="th" scope="row">
                  <Chip
                    label={offer.active ? "Active" : "Offline"}
                    style={{
                      background: "#" + (offer.active ? "82ad44" : "f07178"),
                    }}
                  />
                  {}
                </TableCell>

                <TableCell component="th" scope="row">
                  {offer.info.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {offer.single_use ? "Yes" : "No"}
                </TableCell>
                <TableCell component="th" scope="row">
                  <Button
                    onClick={() => {
                      handleClick();
                      onSelect(offer);
                    }}
                  >
                    Select
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
                        variant="success"
                        message="Updated the QR code with selected offer"
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
