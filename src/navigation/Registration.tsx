import React from "react";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

function Registration() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "2rem",
      },
      spacing: { margin: "2rem" },
    })
  );
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <form>
        <Box>
          <Typography variant="h2">Registration</Typography>
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
          <Typography className={classes.spacing}>
            <TextField
              id="comfirmPassword"
              label="Comfirm Password"
              variant="filled"
              required
              fullWidth
            />
          </Typography>
          <Box className={classes.spacing}>
            <Button variant="contained" color="primary" fullWidth>
              Complete registration
            </Button>
          </Box>
          <Box>
            <Typography>
              Already a member? <Button>Sign In</Button>
            </Typography>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default Registration;
