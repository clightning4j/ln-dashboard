import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import FileCopyTwoTone from "@mui/icons-material/FileCopyTwoTone";
import Box from "@mui/material/Box";
import QRCode from "qrcode.react";
import theme from "../../theme/DarkTheme";
import { GetInfoNode, NodeAddress } from "../../model/GetInfoNode";
import { useState } from "react";
import { NodeTable } from "../tableNodes/NodeTable.component";

type ParentProps = {
  nodeInfo: GetInfoNode | null;
  show: (visible: boolean, message: string) => void;
};

export default function HomeView({ nodeInfo, show }: ParentProps) {
  let addr: NodeAddress =
    nodeInfo!.address.length > 0 ? nodeInfo!.address[0] : nodeInfo!.binding[0];
  const [selectAddr, setSelectAddr] = useState(addr);
  let mapAddress = new Map();
  for (let i = 0; i < nodeInfo!.address.length; i++) {
    let addr = nodeInfo!.address[i];
    mapAddress.set(addr.type, addr);
  }
  if (nodeInfo === null) return <>NodeInfo null</>;
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Card>
        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Box component="span" m={1}>
              <Chip
                label={nodeInfo!.alias}
                sx={{
                  background: "#" + nodeInfo!.color,
                }}
              />
            </Box>
          </Grid>
          <Grid>
            <QRCode
              value={`${nodeInfo!.id}@${selectAddr.address}:${selectAddr.port}`}
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
            <FormControl
              variant="outlined"
              sx={{
                margin: theme.spacing(2),
                minWidth: 230,
                textAlign: "center",
              }}
            >
              <InputLabel id="address-select-outlined-label">
                Address
              </InputLabel>
              <Select
                labelId="address-select-outlined-label"
                id="address-outlined-select"
                value={selectAddr.type}
                onChange={(event: any) =>
                  setSelectAddr(mapAddress.get(event.target.value))
                }
                label="Address"
              >
                {nodeInfo!.address.map((address, index) => {
                  return (
                    <MenuItem key={index} value={address.type}>
                      {address.type}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <IconButton
              onClick={() =>
                navigator.clipboard.writeText(
                  `${nodeInfo!.id}@${selectAddr.address}:${selectAddr.port}`
                )
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
      >
        <NodeTable show={show} />
      </Grid>
    </Grid>
  );
}
