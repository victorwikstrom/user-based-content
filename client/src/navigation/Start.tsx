import { Button, createStyles, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ImageCard from "../components/ImageCard";
import PageHeading from "../components/PageHeading";
import { Frame } from "../helpers";
import { Link } from "react-router-dom";

function Start() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {},
      addImage: {
        position: "fixed",
        bottom: "10%",
        right: "41%",
      },
    })
  );
  const classes = useStyles();

  const [triggerFetch, setTriggerFetch] = useState(false);
  const [frames, setFrames] = useState<Frame[]>([]);
  console.log(frames);

  useEffect(() => {
    fetch("/api/frames")
      .then((res) => res.json())
      .then(
        (result) => {
          setFrames(result);
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
    <div className={classes.root}>
      <Header userIsLoggedIn={false} />
      <PageHeading pageName={"Page name placeholder"} />
      {frames.map((frame) => (
        <ImageCard frame={frame} triggerFetch={() => setTriggerFetch(false)} />
      ))}
      <Button
        variant="contained"
        color="primary"
        className={classes.addImage}
        component={Link}
        to="/upload"
      >
        Add image
      </Button>
    </div>
  );
}

export default Start;
