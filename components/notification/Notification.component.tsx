import styled from "@emotion/styled";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import theme from "../../theme/DarkTheme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import { amber, green } from "@mui/material/colors";
import SnackbarContent from "@mui/material/SnackbarContent";
import WarningIcon from "@mui/icons-material/Warning";

const PREFIX = "NOTIFICATION";

const classes = {
  success: `${PREFIX}-success`,
  error: `${PREFIX}-error`,
  info: `${PREFIX}-info`,
  warning: `${PREFIX}-warning`,
  icon: `${PREFIX}-icon`,
  iconVariant: `${PREFIX}-iconVariant`,
  message: `${PREFIX}-message`,
};

const StyledGrid = styled(Grid)(() => ({
  [`& .${classes.success}`]: {
    backgroundColor: green[600],
  },

  [`& .${classes.error}`]: {
    backgroundColor: theme.palette.error.dark,
  },

  [`& .${classes.info}`]: {
    backgroundColor: theme.palette.primary.main,
  },

  [`& .${classes.warning}`]: {
    backgroundColor: amber[700],
  },

  [`& .${classes.icon}`]: {
    fontSize: 20,
    color: "#fff",
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },

  [`& .${classes.message}`]: {
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
}));

const typeOfIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

export interface NotificationProps {
  onClose?: () => void;
  variant: keyof typeof typeOfIcon;
  message?: string;
}

export default function SnackbarContentWrapper(props: NotificationProps) {
  console.log("HELLO");
  const { onClose, variant, message } = props;
  const Icon = typeOfIcon[variant];

  return (
    <StyledGrid>
      <SnackbarContent
        className={classes[variant]}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={classes.icon} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </StyledGrid>
  );
}
