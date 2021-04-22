import React from "react";
import {
  Box,
  Button,
  createStyles,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";

interface User {
  user: string;
  role: string;
}

function UserCard(props: User) {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "8rem",
      },
      buttonWrapper: {
        display: "flex",
        flexDirection: "column",
      },
    })
  );
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Box>
          <Typography>{props.user}</Typography>
          <Typography>{props.role}</Typography>
        </Box>
        <Box className={classes.buttonWrapper}>
          <Button color="primary">Delete User</Button>
          <Button color="secondary">Save User</Button>
        </Box>
      </Box>
      <Divider color="primary" />
    </>
  );
}

export default UserCard;
