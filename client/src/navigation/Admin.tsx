import React, { useEffect, useState } from "react";
import { Box, createStyles, makeStyles } from "@material-ui/core";
import UserCard from "../components/UserCard";
import { User } from "../helpers";
import PageHeading from "../components/PageHeading";
import Section from "../components/Section";
import { useHistory } from "react-router";

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
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    fetch("/api/users/authenticate", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!(result.user.role === "admin")) {
          history.replace("/");
        } else {
          setLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (loading) return <div>loading</div>;
  return (
    <Section>
      <Box className={classes.root}>
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
    </Section>
  );
}

export default Admin;
