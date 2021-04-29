import { Button, createStyles, makeStyles } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";
import { Frame } from "../helpers";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import { LoggedInContext } from "../context/LoggedInContext";

function Start() {
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

  useEffect(() => {
    fetch("/api/frames")
      .then((res) => res.json())
      .then((result) => {
        setFrames(result);
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
          <div className={classes.reverse}>
            {frames.map((frame) => (
              <ImageCard
                frame={frame}
                key={frame._id}
                triggerFetch={() => setTriggerFetch(false)}
              />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

export default Start;
