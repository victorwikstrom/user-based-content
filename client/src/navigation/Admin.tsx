import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import UserCard from "../components/UserCard";
import { User } from "../helpers";

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
    fetch("http://localhost:4000/api/users")
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

  const newUser = {
    username: "Oscar",
    password: "kattmy",
    role: "Slave",
  };

  const handlePostClick = () => {
    fetch("http://localhost:4000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    }).then(() => {
      setTriggerFetch(false);
    });
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h4">All Users</Typography>
      <Button onClick={handlePostClick}>Post user</Button>
      {users.map(({ username, role, _id }) => (
        <UserCard
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
