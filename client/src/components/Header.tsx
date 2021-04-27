import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import HeaderLogin from "./HeaderLogin";
import { Link } from "react-router-dom";

interface Props {
  userIsLoggedIn: boolean;
}

function Header(props: Props) {
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
    })
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h1" variant="h6">
        <Link style={{ textDecoration: "none", color: "black" }} to="/">
          Instaframe
        </Link>
      </Typography>
      <Box className={classes.right}>
        {props.userIsLoggedIn ? (
          <Box className={classes.right}>
            <Typography>Logged in as [user]</Typography>
            <Button>Log out</Button>
          </Box>
        ) : (
          <HeaderLogin />
        )}
      </Box>
    </div>
  );
}

export default Header;
