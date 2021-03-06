import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PageHeading from "../components/PageHeading";
import Section from "../components/Section";

function Upload() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {},
      form: {
        width: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "4rem",
      },
      spacing: { margin: "1rem" },
    })
  );
  const classes = useStyles();

  const [frame, setFrame] = useState({
    title: "",
    description: "",
    author: "",
    date: "",
    image: "",
  });
  const [hasErr, setHasErr] = useState(false);
  const [loading, setLoading] = useState(true);
  const [missingImage, setMissingImage] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetch("/api/users/authenticate", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        if (!result.authenticated) {
          history.replace("/");
        } else {
          setLoading(false);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setHasErr(false);
    const { name, value } = e.target;
    setFrame({
      ...frame,
      [name]: value,
    });
  };

  const handleCreateFrameClick = () => {
    if (!frame.image) {
      setMissingImage(true);
      return;
    }
    fetch("/api/frames", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(frame),
    })
      .then((res) => res.json())
      .then((result: { message: string; status: number }) => {
        history.replace("/");
        if (result.status === 500) {
          setHasErr(true);
          return;
        }
      });
  };

  if (loading) return <div>loading</div>;
  return (
    <Section>
      <Box className={classes.root}>
        <PageHeading pageName="Create new frame" />
        <form className={classes.form}>
          <Box className={classes.spacing}>
            <TextField
              onChange={handleInputChange}
              id="title"
              label="Title"
              name="title"
              variant="filled"
              required
              fullWidth
            />
          </Box>

          <Box className={classes.spacing}>
            <TextField
              onChange={handleInputChange}
              id="description"
              label="Description"
              name="description"
              variant="filled"
              multiline
              required
              fullWidth
            />
          </Box>

          <Box className={classes.spacing}>
            <TextField
              onChange={handleInputChange}
              id="image"
              label="Image url"
              name="image"
              variant="filled"
              required
              fullWidth
            />
          </Box>
          {missingImage ? (
            <Typography color="error">
              You need to choose an image to create a frame
            </Typography>
          ) : null}
          <Box className={classes.spacing}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCreateFrameClick}
            >
              Upload new frame
            </Button>
            {hasErr ? <Typography>Something is wrong</Typography> : null}
          </Box>
        </form>
      </Box>
    </Section>
  );
}

export default Upload;
