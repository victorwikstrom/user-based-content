import React, { useEffect, useState } from "react";
import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import { fakeUsers } from "../fakeUsers";
import UserCard from "../components/UserCard";

function Admin() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "100%",
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
