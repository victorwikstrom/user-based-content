import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageHeading from "../components/PageHeading";

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
      root: {},
      form: {
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
    // Validate password match
    if (newUser.password !== newUser.confirmPassword) {
      setHasErr({ ...hasErr, password: true });
      return;
    }

    fetch("/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((result: { message: string; status: number }) => {
        // Validate username double in backend
        if (result.status === 500) {
          setHasErr({ ...hasErr, username: true });
          return;
        }
      });
  };

  return (
    <div className={classes.root}>
      <Header userIsLoggedIn={false} />
      <PageHeading pageName={"Create an account"} />
      <form className={classes.form}>
        <Box>
          <Box className={classes.spacing}>
            <TextField
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="filled"
              required
              fullWidth
            />
          </Box>
          <Box className={classes.spacing}>
            <TextField
              onChange={handleInputChange}
              name="confirmPassword"
              id="comfirmPassword"
              label="Comfirm Password"
              type="password"
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
              onClick={handlePostClick}
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
              Already a member?{" "}
              <Button component={Link} to="/login">
                Sign In
              </Button>
            </Box>
          </Box>
        </Box>
      </form>
    </div>
  );
}

export default Registration;
