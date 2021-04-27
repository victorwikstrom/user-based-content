import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  userIsLoggedIn: boolean;
}

function Footer(props: Props) {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        height: "50px",
        width: "100%",
      },
    })
  );
  const classes = useStyles();

  return (
    <div>
      {props.userIsLoggedIn ? (
        <div className={classes.root}>
          <Typography>
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to="/admin"
            >
              Admin
            </Link>
          </Typography>
        </div>
      ) : null}
    </div>
  );
}

export default Footer;
