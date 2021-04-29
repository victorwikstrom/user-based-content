import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Frame } from "../helpers";
import { Box, Button, TextField } from "@material-ui/core";
import { ChangeEvent, useContext, useState } from "react";
import { LoggedInContext } from "../context/LoggedInContext";
import userEvent from "@testing-library/user-event";
import { Link } from "react-router-dom";

interface Props {
  frame: Frame;
  triggerFetch: () => void;
}

function ImageCard(props: Props) {
  const [showButtons, setShowButtons] = useState(false);
  const [editable, setEditable] = useState(false);

  const loggedInContext = useContext(LoggedInContext);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        position: "relative",
        width: "100%",
        marginBottom: "2rem",
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
      expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: "rotate(180deg)",
      },
      avatar: {
        backgroundColor: "#8C52FF",
      },
      actionButtons: {
        position: "absolute",
        right: "0",
        display: showButtons ? "flex" : "none",
        flexDirection: "column",
      },
      showOnEdit: {
        display: editable ? "block" : "none",
        marginTop: "1rem",
      },
      hideOnEdit: {
        display: editable ? "none" : "block",
      },
    })
  );
  const classes = useStyles();

  const { _id, title, description, author, date, image, user } = props.frame;

  const toggleShowButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleEditFrameClick = (id: string) => {
    setEditable(!editable);
    setShowButtons(!showButtons);
  };

  const [editedFrame, setEditedFrame] = useState({
    title: title,
    description: description,
  });

  const handleEditFrameChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedFrame({
      ...editedFrame,
      [name]: value,
    });
  };

  const handleSaveEditedFrame = (id: string) => {
    fetch(`/api/frames/${id}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedFrame),
    }).then(() => {
      props.triggerFetch();
    });
    setEditable(false);
  };

  const handleDeleteFrameClick = (id: string) => {
    fetch(`/api/frames/${id}`, {
      method: "DELETE",
    }).then(() => {
      props.triggerFetch();
    });
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {author[0]}
          </Avatar>
        }
        action={
          loggedInContext.user?.username === author ||
          loggedInContext.user?.role === "admin" ? (
            <IconButton onClick={toggleShowButtons} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          ) : null
        }
        title={
          <div>
            <Typography
              variant="body2"
              color="primary"
              style={{ fontWeight: "bold" }}
            >
              <Link to={`/${user._id}`}>{author}</Link>
            </Typography>
            {editable ? (
              <TextField
                onChange={handleEditFrameChange}
                className={classes.showOnEdit}
                name="title"
                value={editedFrame.title}
              />
            ) : (
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                {title}
              </Typography>
            )}
          </div>
        }
        subheader={date}
      />
      <Box className={classes.actionButtons}>
        <Button onClick={() => handleEditFrameClick(_id)} variant="contained">
          Edit
        </Button>
        <Button onClick={() => handleDeleteFrameClick(_id)} variant="contained">
          Delete
        </Button>
      </Box>
      <CardMedia className={classes.media} image={image} title={title} />
      <CardContent>
        <Typography
          className={classes.hideOnEdit}
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {description}
        </Typography>

        <TextField
          onChange={handleEditFrameChange}
          className={classes.showOnEdit}
          name="description"
          value={editedFrame.description}
          multiline
        />
        <Button
          className={classes.showOnEdit}
          variant="contained"
          onClick={() => handleSaveEditedFrame(_id)}
        >
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
}

export default ImageCard;
