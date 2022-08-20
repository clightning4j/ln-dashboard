import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import FileCopyTwoTone from "@mui/icons-material/FileCopyTwoTone";
import Box from "@mui/material/Box";
import QRCodeSVG from "qrcode.react";
import theme from "../../theme/DarkTheme";
import { GetInfoNode } from "../../model/GetInfoNode";
import { OfferTable } from "../tableNodes/OfferTable.component";
import { ListOffers, OfferInfo } from "../../model/CoreLN";
import { useState } from "react";
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContentWrapper from "../notification/Notification.component";

type DonationViewProps = {
  nodeInfo: GetInfoNode | null;
  listOffers: ListOffers | null;
  offer: OfferInfo | null;
};

export default function DonationView({
  nodeInfo,
  offer,
  listOffers,
}: DonationViewProps) {
  let [offerSelected, setOfferSelected] = useState(offer);
  if (offer === null) return <>No Offers available at the moment</>;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(`${offerSelected!.bolt12}`);
    setOpen(true);
  };

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
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Card>
        <CardContent
          style={{
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box component="span" m={1}>
              <Chip
                label={nodeInfo!.alias}
                style={{
                  background: "#" + nodeInfo!.color,
                }}
              />
            </Box>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <QRCodeSVG
              value={`${offerSelected!.bolt12}`}
              size={300}
              level="H"
            />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton onClick={handleClick} size="large">
              <FileCopyTwoTone />
            </IconButton>
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
                  message="Copied the bolt12 string to clipboard"
                />
              </Box>
            </Snackbar>
          </Grid>
        </CardContent>
      </Card>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <OfferTable
          listOffers={listOffers!.offers}
          onSelect={setOfferSelected}
        />
      </Grid>
    </Grid>
  );
}
