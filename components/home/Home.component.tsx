import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';
import QRCode from 'qrcode.react';
import theme from '../../theme/DarkTheme'
import {GetInfoNode, NodeAddress} from "../../model/GetInfoNode";
import {useState} from "react";

const BootstrapInput = withStyles((_) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(2),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid ' + theme.palette.primary.light,
        padding: '20px 26px 20px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        '&:focus': {
            borderRadius: 4,
            borderColor: theme.palette.divider,
            boxShadow: '0 0 0 0.2rem ' + theme.palette.divider,
        },
    },
}))(InputBase);

type ParentProps = {
    nodeInfo: GetInfoNode | null
}

export default function HomeView({nodeInfo}: ParentProps) {
    if (nodeInfo === null)
        return <>NodeInfo null</>
    let addr: NodeAddress = nodeInfo!.address.length > 0 ? nodeInfo!.address[0] : nodeInfo!.binding[0]
    const [selectAddr, setSelectAddr] = useState(addr);

    let mapAddress = new Map();
    for (let i = 0; i < nodeInfo!.address.length; i++) {
        let addr = nodeInfo!.address[i];
        mapAddress.set(addr.type, addr);
    }
    return  <Grid
        container
        style={{ marginTop: "5em" }}
        direction="row"
        justify="center"
        alignItems="center"
    >
        <Card>
            <CardContent>
                <Grid
                    container
                    direction="row"
                    justify="center"
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
                <Grid>
                    <QRCode
                        value={`${selectAddr.address}:${selectAddr.port}`}
                        size={300}
                        level="H"
                    />
                </Grid>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center">
                    <FormControl variant="outlined" style={{
                        margin: theme.spacing(2),
                        minWidth: 230,
                        textAlign: "center",
                    }}>
                        <InputLabel id="address-select-outlined-label">Address</InputLabel>
                        <Select
                            labelId="address-select-outlined-label"
                            id="address-outlined-select"
                            value={selectAddr.type}
                            onChange={(event) => setSelectAddr(mapAddress.get(event.target.value))}
                            label="Address"
                            input={<BootstrapInput />}
                        >
                            {nodeInfo!.address.map((address, index) => {
                                return <MenuItem key={index} value={address.type}>{address.type}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </CardContent>
        </Card>
    </Grid>
}