import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import { LoggedInContext } from "../context/LoggedInContext";
import Section from "../components/Section";

function Login() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {},
      form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "4rem",
      },
      spacing: { margin: "1rem" },
    })
  );
  const classes = useStyles();

  const loggedInContext = useContext(LoggedInContext);

  const [user, setUser] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });

  const history = useHistory();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/authenticate", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.authenticated) {
          history.replace("/");
        } else {
          setLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    fetch("/api/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((result: { message: string; status: number }) => {
        if (result.status === 404) {
          setHasErr(true);
          return;
        } else {
          history.push("/");
          loggedInContext.authenticateUser();
        }
      });
  };

  if (loading) return <div>loading</div>;
  return (
    <Section>
      <Box className={classes.root}>
        <PageHeading pageName={"Sign In"} />
        <form className={classes.form}>
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
              type="password"
              variant="filled"
              required
              fullWidth
            />
          </Box>
          {hasErr ? (
            <Typography color="error">Wrong username or password</Typography>
          ) : null}
          <Box className={classes.spacing}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleLoginClick}
            >
              Sign In
            </Button>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography>Not a member?</Typography>
            <Button component={Link} to="/registration">
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </Section>
  );
}

export default Login;
