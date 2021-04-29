import {
  Box,
  Button,
  createStyles,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageCard from "../components/ImageCard";
import Section from "../components/Section";
import { LoggedInContext } from "../context/LoggedInContext";
import { Frame } from "../helpers";

function MyFeed() {
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
  console.log(loggedInContext.user?._id);

  const [triggerFetch, setTriggerFetch] = useState(false);
  const [frames, setFrames] = useState<Frame[]>([]);

  useEffect(() => {
    fetch(`/api/frames/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        const myFrames = result.filter(
          (frame: Frame) => frame.user._id === loggedInContext.user?._id
        );
        setFrames(myFrames);
        setTriggerFetch(true);
      });
  }, [triggerFetch]);

  return (
    <>
      <div className={classes.root}>
        <Section>
          {loggedInContext.authenticated ? (
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
                My uploaded frames
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

export default MyFeed;
