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
    })
  );
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.loginContainer}>
        <Button component={Link} to="/login">
          Log in
        </Button>
        <Typography>or</Typography>
      </Box>
      <Button component={Link} to="/registration">
        Register
      </Button>
    </Box>
  );
}

export default HeaderLogin;
