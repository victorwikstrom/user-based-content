import { Button, createStyles, makeStyles } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import ImageCard from "../components/ImageCard";
import { Frame } from "../helpers";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { LoggedInContext } from "../context/LoggedInContext";

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

  const loggedInContext = useContext(LoggedInContext);

  const [triggerFetch, setTriggerFetch] = useState(false);
  const [frames, setFrames] = useState<Frame[]>([]);

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
      <Header userIsLoggedIn={loggedInContext.authenticated} />
      {frames.map((frame) => (
        <ImageCard
          frame={frame}
          key={frame._id}
          triggerFetch={() => setTriggerFetch(false)}
        />
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
      <Footer userIsLoggedIn={loggedInContext.authenticated} />
    </div>
  );
}

export default Start;
