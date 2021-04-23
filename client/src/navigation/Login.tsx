import React, { ChangeEvent, useState } from "react";
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

  const [user, setUser] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  const [hasErr, setHasErr] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setHasErr(false);
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLoginClick = () => {
    console.log(user);
    fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result: { message: string; status: number }) => {
        // Validate username double in backend
        if (result.status === 500) {
          setHasErr(true);
          return;
        }
      });
  };
  return (
    <Box className={classes.root}>
      <form>
        <Typography variant="h2">Sign In</Typography>
        <Box className={classes.spacing}>
          <TextField
            onChange={handleInputChange}
            id="username"
            label="Username"
            name="username"
            variant="filled"
            required
            fullWidth
          />
        </Box>

        <Box className={classes.spacing}>
          <TextField
            onChange={handleInputChange}
            id="password"
            label="Password"
            name="password"
            variant="filled"
            required
            fullWidth
          />
        </Box>
        <Box className={classes.spacing}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLoginClick}
          >
            Sign In
          </Button>
          {hasErr ? <Typography>Wrong username or password</Typography> : null}
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
