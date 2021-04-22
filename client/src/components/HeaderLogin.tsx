import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";

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
        <Button>Log in</Button>
        <Typography>or</Typography>
      </Box>
      <Button>Register</Button>
    </Box>
  );
}

export default HeaderLogin;
