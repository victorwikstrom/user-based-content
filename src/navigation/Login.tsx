import React from "react";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

function Login() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "4rem",
      },
      spacing: { margin: "2rem" },
    })
  );
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <form>
        <Typography variant="h2">Sign In</Typography>
        <Typography className={classes.spacing}>
          <TextField
            id="username"
            label="Username"
            variant="filled"
            required
            fullWidth
          />
        </Typography>

        <Typography className={classes.spacing}>
          <TextField
            id="password"
            label="Password"
            variant="filled"
            required
            fullWidth
          />
        </Typography>
        <Box className={classes.spacing}>
          <Button variant="contained" color="primary" fullWidth>
            Sign In
          </Button>
        </Box>
        <Box>
          <Typography>
            Not a member? <Button>Sign Up</Button>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
