import React, { useEffect, useState } from "react";
import { Box, createStyles, makeStyles } from "@material-ui/core";
import UserCard from "../components/UserCard";
import { User } from "../helpers";
import Header from "../components/Header";
import PageHeading from "../components/PageHeading";

function Admin() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "100%",
      },
    })
  );
  const classes = useStyles();

  const [users, setUsers] = useState<User[]>([]);
  const [triggerFetch, setTriggerFetch] = useState(false);
  console.log(triggerFetch);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(
        (result) => {
          setUsers(result);
          setTriggerFetch(true);
        }
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        // (error) => {
        //   setIsLoaded(true);
        //   setError(error);
        // }
      );
  }, [triggerFetch]);

  return (
    <Box className={classes.root}>
      <Header userIsLoggedIn={false} />
      <PageHeading pageName="All users" />
      {users.map(({ username, role, _id }) => (
        <UserCard
          key={_id}
          user={username}
          role={role}
          id={_id}
          triggerFetch={() => setTriggerFetch(false)}
        />
      ))}
    </Box>
  );
}

export default Admin;
