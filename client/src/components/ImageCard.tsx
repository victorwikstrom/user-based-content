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
import Eagle from "../assets/ramiro-pianarosa-RsOwHO8Q9Sc-unsplash.jpg";
import { Frame } from "../helpers";
import { Box, Button } from "@material-ui/core";
import { useState } from "react";

interface Props {
  frame: Frame;
  triggerFetch: () => void;
}

function ImageCard(props: Props) {
  const [showButtons, setShowButtons] = useState(false);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        position: "relative",
        maxWidth: 345,
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
        backgroundColor: red[500],
      },
      actionButtons: {
        position: "absolute",
        right: "0",
        display: showButtons ? "flex" : "none",
        flexDirection: "column",
      },
    })
  );
  const classes = useStyles();

  const toggleShowButtons = () => {
    setShowButtons(!showButtons);
  };

  const handleDeleteFrameClick = (id: string) => {
    fetch(`/api/frames/${id}`, {
      method: "DELETE",
    }).then(() => {
      props.triggerFetch();
    });
  };

  const { _id, title, description, author, date, image } = props.frame;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {author[0]}
          </Avatar>
        }
        action={
          <IconButton onClick={toggleShowButtons} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
        subheader={date}
      />
      <Box className={classes.actionButtons}>
        <Button variant="contained">Edit</Button>
        <Button onClick={() => handleDeleteFrameClick(_id)} variant="contained">
          Delete
        </Button>
      </Box>
      <CardMedia className={classes.media} image={image} title="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ImageCard;
