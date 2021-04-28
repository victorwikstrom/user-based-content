import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

function HeaderLogin() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
      },
      loginContainer: {
        display: "flex",
        alignItems: "center",
      },
      right: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      },
    })
  );
  const classes = useStyles();
  return (
    <Box className={classes.right}>
      <Box className={classes.loginContainer}>
        <Button
          style={{ marginRight: "10px" }}
          variant="contained"
          component={Link}
          to="/login"
        >
          Log in
        </Button>
        <Typography>or</Typography>
      </Box>
      <Button
        style={{ background: "transparent", textDecoration: "underline" }}
        component={Link}
        to="/registration"
      >
        Register
      </Button>
    </Box>
  );
}

export default HeaderLogin;
