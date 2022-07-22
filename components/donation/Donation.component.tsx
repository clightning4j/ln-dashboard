import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import FileCopyTwoTone from "@mui/icons-material/FileCopyTwoTone";
import Box from "@mui/material/Box";
import QRCode from "qrcode.react";
import theme from "../../theme/DarkTheme";
import { GetInfoNode } from "../../model/GetInfoNode";
import useSWR from "swr";
import { fetcher } from "../../utils/AppUtils";
import { CodeBlock, dracula } from "react-code-blocks";
import { OfferTable } from "../tableNodes/OfferTable.component";
import { ListOffers, OfferInfo } from "../../model/CoreLN";
import Loading from "../genericView/Loading.component";
import { useEffect, useState } from "react";

type ParentProps = {
  nodeInfo: GetInfoNode | null;
  show: (visible: boolean, message: string) => void;
};

export default function DonationView({ nodeInfo, show }: ParentProps) {
  const { data, error } = useSWR<{ data: ListOffers }, Error>(
    "/api/listOffers",
    fetcher
  );
  let offer: OfferInfo | null = null;
  let listOffers: Array<OfferInfo> = [];
  let [bolt12, setbolt12] = useState("");
  if (error) {
    //TODO adding an error view
    show(true, `Error: ${error.toString()}`);
    return <></>;
  }
  if (!data) return <Loading />;
  console.log(`Data received is: ${JSON.stringify(data)}`);
  if (error === undefined && data!.data.offers.length > 0) {
    offer = data!.data.offers[0];
    listOffers = data!.data.offers;
  }

  if (offer === null) return <>No Offers available at the moment</>;
  const commandFetchInvoice = "lightning-cli fetchinvoice {bol12 offer}\n";
  const commandPay = "lightning-cli pay {invoice}";

  function updatebolt12(selectedOffer: OfferInfo) {
     bolt12 = selectedOffer.bolt12;
     setbolt12(bolt12);
     console.log(bolt12);
  }

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
            <QRCode value={`${bolt12}`} size={300} level="H" />
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              onClick={() => navigator.clipboard.writeText(`${offer!.bolt12}`)}
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
        <OfferTable show={show} listOffers={listOffers} selectedOffer={updatebolt12} />
      </Grid>
    </Grid>
  );
}
