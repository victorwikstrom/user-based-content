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
import { Link, useHistory, useLocation } from "react-router-dom";
import Section from "./Section";
import logo from "../assets/instaframe.png";

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
        marginBottom: "1rem",
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
      logo: {
        height: "100px",
      },
    })
  );
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
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
        loggedInContext.authenticateUser();
        console.log(loggedInContext.user);
        history.replace("/");
      });
  };

  return (
    <Section>
      <div className={classes.root}>
        <Box className={classes.left}>
          <Typography component="h1" variant="h6">
            <Link style={{ textDecoration: "none", color: "black" }} to="/">
              <img className={classes.logo} src={logo} alt="instaframe" />
            </Link>
          </Typography>
          <div>
            {loggedInContext.user?.role === "admin" ? (
              <Typography>
                <Link
                  style={{ color: "black" }}
                  to={location.pathname === "/admin" ? "/" : "/admin"}
                >
                  {location.pathname === "/admin"
                    ? "Go back to home page"
                    : "Go to admin page"}
                </Link>
              </Typography>
            ) : null}
          </div>
        </Box>
        <Box className={classes.right}>
          {loggedInContext.authenticated ? (
            <Box className={classes.right}>
              <Box style={{ display: "flex" }}>
                <Typography style={{ marginBottom: "0.5rem" }}>
                  Logged in as{" "}
                  <Link to={`/${loggedInContext.user?._id}`}>
                    {loggedInContext.user?.username}
                  </Link>
                </Typography>
              </Box>
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
