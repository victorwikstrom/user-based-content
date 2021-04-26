import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  createStyles,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Frame } from "../helpers";

function Upload() {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
        marginTop: "4rem",
      },
      spacing: { margin: "2rem" },
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
    console.log(frame);
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
        if (result.status === 500) {
          setHasErr(true);
          return;
        }
      });
  };

  return (
    <Box className={classes.root}>
      <form>
        <Typography variant="h2">Add new frame</Typography>
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
        <Box className={classes.spacing}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCreateFrameClick}
            component={Link}
            to="/"
          >
            Upload new frame
          </Button>
          {hasErr ? <Typography>Something is wrong</Typography> : null}
        </Box>
      </form>
    </Box>
  );
}

export default Upload;
