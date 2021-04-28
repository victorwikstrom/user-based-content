import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../context/LoggedInContext";

function Footer() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        backgroundColor: "#333",
        position: "relative",
        bottom: "0",
        height: "100px",
        width: "100%",
      },
    })
  );
  const classes = useStyles();

  const loggedInContext = useContext(LoggedInContext);

  return (
    <footer className={classes.root}>
      {loggedInContext.authenticated ? (
        <div>
          {loggedInContext.user?.role === "admin" ? (
            <Typography>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to="/admin"
              >
                Admin
              </Link>
            </Typography>
          ) : null}
        </div>
      ) : null}
    </footer>
  );
}

export default Footer;
