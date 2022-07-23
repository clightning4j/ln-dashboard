import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import FileCopyTwoTone from "@mui/icons-material/FileCopyTwoTone";
import Box from "@mui/material/Box";
import QRCode from "qrcode.react";
import theme from "../theme/DarkTheme";
import { GetInfoNode } from "../model/GetInfoNode";
import { CodeBlock, dracula } from "react-code-blocks";
import { OfferTable } from "../components/tableNodes/OfferTable.component";
import APIProvider from "../api/APIProvider";
import { GetServerSideProps } from "next";
import { ListOffers, OfferInfo } from "../model/CoreLN";
import { useState } from "react";

type ParentProps = {
  nodeInfo: GetInfoNode | null;
  show: (visible: boolean, message: string) => void;
};

type DonationViewProps = {
  listOffers: ListOffers | null;
  offer: OfferInfo | null;
  error: any | null;
  info: GetInfoNode | null;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let offers = null;
  let info = null;
  try {
    offers = await APIProvider.api().listOffers();
    info = await APIProvider.api().getInfo();
    console.log(info);
  } catch (e) {
    console.error(e);
    return {
      props: {
        listOffers: null,
        offer: null,
        info: null,
        error: e,
      },
    };
  }
  // TODO make this code safe.
  return {
    props: {
      listOffers: offers,
      offer: offers?.offers[0],
      error: null,
      info: info,
    },
  };
};

export default function DonationView(
  { nodeInfo, show }: ParentProps,
  { listOffers, offer, info, error }: DonationViewProps
) {
  if (error) {
    //TODO adding an error view
    show(true, `Error: ${error.toString()}`);
    return <></>;
  }
  nodeInfo = info;
  console.log(nodeInfo);
  let [offerSelected, setOfferSelected] = useState(offer);
  console.log(`Data received is: ${JSON.stringify(listOffers)}`);
  if (offer === null) return <>No Offers available at the moment</>;
  const commandFetchInvoice = "lightning-cli fetchinvoice {bol12 offer}\n";
  const commandPay = "lightning-cli pay {invoice}";

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
            <QRCode value={`${offerSelected!.bolt12}`} size={300} level="H" />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              onClick={() =>
                navigator.clipboard.writeText(`${offerSelected!.bolt12}`)
              }
              size="large"
            >
              <FileCopyTwoTone />
            </IconButton>
          </Grid>
        </CardContent>
      </Card>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        margin="m"
      >
        <CodeBlock
          text={`${commandFetchInvoice}${commandPay}`}
          language={"bash"}
          showLineNumbers={true}
          startingLineNumber={false}
          theme={dracula}
        />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <OfferTable
          show={show}
          listOffers={listOffers?.offers!}
          selectedOffer={setOfferSelected}
        />
      </Grid>
    </Grid>
  );
}
