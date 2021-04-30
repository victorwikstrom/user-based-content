import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import Section from "../components/Section";
import { LoggedInContext } from "../context/LoggedInContext";
import { Frame, User } from "../helpers";

interface Params {
  id: string;
}

function PersonalFeed() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: { position: "relative" },
      addImage: {
        float: "right",
        marginBottom: "2rem",
      },
      reverse: {
        display: "flex",
        flexDirection: "column-reverse",
      },
    })
  );
  const classes = useStyles();

  const loggedInContext = useContext(LoggedInContext);

  const [triggerFetch, setTriggerFetch] = useState(false);
  const [frames, setFrames] = useState<Frame[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);
  const match = useRouteMatch<Params>();

  useEffect(() => {
    fetch(`/api/users/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        const user: User | undefined = result.find(
          (u: User) => u._id === match.params.id
        );
        setUser(user);
      })
      .then(() => {
        fetch(`/api/frames/`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((result) => {
            const myFrames = result.filter(
              (frame: Frame) => frame.user._id === user?._id
            );
            setFrames(myFrames);
            setTriggerFetch(true);
          });
      });
  }, [triggerFetch]);

  return (
    <>
      <div className={classes.root}>
        <Section>
          {loggedInContext.authenticated &&
          loggedInContext.user?._id === user?._id ? (
            <Button
              variant="contained"
              color="primary"
              className={classes.addImage}
              component={Link}
              to="/upload"
            >
              Post new frame
            </Button>
          ) : null}
          {frames.length ? (
            <Box>
              <Typography variant="h6" style={{ marginBottom: "1rem" }}>
                {user?.username === loggedInContext.user?.username
                  ? "My uploaded frames"
                  : `${user?.username}'s uploaded frames`}
              </Typography>
              <div className={classes.reverse}>
                {frames.map((frame) => (
                  <ImageCard
                    frame={frame}
                    key={frame._id}
                    triggerFetch={() => setTriggerFetch(false)}
                  />
                ))}
              </div>
            </Box>
          ) : (
            <div className={classes.reverse}>
              <Typography>You haven't uploaded any frames yet</Typography>
            </div>
          )}
        </Section>
      </div>
    </>
  );
}

export default PersonalFeed;
