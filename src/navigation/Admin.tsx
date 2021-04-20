import React from "react";
import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import UserCard from "../components/UserCard";
import { fakeUsers } from "../fakeUsers";

function Admin() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "400px",
      },
    })
  );
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h4">All Users</Typography>
      {fakeUsers.map(({ username, role }) => (
        <UserCard user={username} role={role} />
      ))}
    </Box>
  );
}

export default Admin;
