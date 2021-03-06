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
import theme from "../../theme/DarkTheme";
import { selectedOffer } from "../../utils/AppUtils";
import { makeStyles } from "@mui/styles";
import { OfferInfo } from "../../model/CoreLN";

type OfferTableProps = {
  listOffers: Array<OfferInfo>;
  show: (visible: boolean, message: string) => void;
};

const useStyles = makeStyles({
  root: {
    width: "85%",
  },
  container: {
    maxHeight: "100vh",
    maxWidth: "100vw",
  },
});

export function OfferTable({ show, listOffers }: OfferTableProps): JSX.Element {
  const classes = useStyles();
  return (
    <Box mt={theme.spacing(1)} mb={theme.spacing(2)} className={classes.root}>
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
                  <Button onClick={() => selectedOffer(offer.bolt12, show)}>
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
