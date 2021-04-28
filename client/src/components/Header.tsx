import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import HeaderLogin from "./HeaderLogin";
import { useContext } from "react";
import { LoggedInContext } from "../context/LoggedInContext";
import { Link, useHistory } from "react-router-dom";
import Section from "./Section";

function Header() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "100%",
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #f4f4f4",
      },
      right: {
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
      },
      left: {
        display: "flex",
        flexDirection: "column",
      },
    })
  );
  const classes = useStyles();

  const history = useHistory();
  const loggedInContext = useContext(LoggedInContext);

  const handleLogOutClick = () => {
    console.log("clicked");
    fetch("/api/users/logout", {
      method: "DELETE",
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        history.replace("/upload");
      });
  };

  return (
    <Section>
      <div className={classes.root}>
        <Box className={classes.left}>
          <Typography component="h1" variant="h6">
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              Instaframe
            </Link>
          </Typography>
          <div>
            {loggedInContext.user?.role === "admin" ? (
              <Typography>
                <Link style={{ color: "black" }} to="/admin">
                  Go to admin
                </Link>
              </Typography>
            ) : null}
          </div>
        </Box>
        <Box className={classes.right}>
          {loggedInContext.authenticated ? (
            <Box className={classes.right}>
              <Typography style={{ marginBottom: "0.5rem" }}>
                Logged in as {loggedInContext.user?.username}
              </Typography>
              <Button
                size="small"
                variant="contained"
                onClick={handleLogOutClick}
              >
                Log out
              </Button>
            </Box>
          ) : (
            <HeaderLogin />
          )}
        </Box>
      </div>
    </Section>
  );
}

export default Header;
