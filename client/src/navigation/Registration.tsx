import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";

interface newUser {
  username: string;
  password: string;
  confirmPassword: string;
}

function Registration() {
  const [hasErr, setHasErr] = useState({
    username: false,
    password: false,
  });
  const [newUser, setNewUser] = useState<newUser>({
    username: "",
    password: "",
    confirmPassword: "",
  });

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

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setHasErr({ username: false, password: false });
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handlePostClick = () => {
    if (newUser.password !== newUser.confirmPassword) {
      setHasErr({ ...hasErr, password: true });
      return;
    }
    fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((result: { message: string; status: number }) => {
        if (result.status === 500) {
          setHasErr({ ...hasErr, username: true });
          return;
        }
      });
  };

  return (
    <div className={classes.root}>
      <form>
        <Box>
          <Typography variant="h2">Registration</Typography>
          <Box className={classes.spacing}>
            <TextField
              onChange={(e) => handleInputChange(e)}
              id="username"
              name="username"
              label="Username"
              variant="filled"
              required
              fullWidth
            />
          </Box>

          <Box className={classes.spacing}>
            <TextField
              onChange={(e) => handleInputChange(e)}
              id="password"
              name="password"
              label="Password"
              variant="filled"
              required
              fullWidth
            />
          </Box>
          <Box className={classes.spacing}>
            <TextField
              onChange={(e) => handleInputChange(e)}
              name="confirmPassword"
              id="comfirmPassword"
              label="Comfirm Password"
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
              onClick={() => handlePostClick()}
            >
              Complete registration
            </Button>
            {hasErr.username ? (
              <Typography>Username is already taken</Typography>
            ) : null}
            {hasErr.password ? (
              <Typography>Password don't match, please try again</Typography>
            ) : null}
          </Box>
          <Box>
            <Box>
              Already a member? <Button>Sign In</Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default Registration;
