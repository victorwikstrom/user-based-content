import React, { useEffect, useState } from "react";
import { Box, createStyles, makeStyles, Typography } from "@material-ui/core";
import { fakeUsers } from "../fakeUsers";
// import makeRequest, { User } from "../helpers";
import UserCard from "../components/UserCard";

function Admin() {
  // let users: User[] = [];
  // const [users, setUsers] = useState();

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const getAllUsers = () => {
  //   setUsers(fakeUsers);
  // };

  // const fetchUsers = async () => {
  //   const response = await makeRequest("/api/users", "GET");
  //   const result = response.json();
  //   console.log(result);
  // };

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
