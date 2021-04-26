import { Button, createStyles, makeStyles } from "@material-ui/core";
import Header from "../components/Header";
import ImageCard from "../components/ImageCard";
import PageHeading from "../components/PageHeading";

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
  return (
    <div className={classes.root}>
      <Header userIsLoggedIn={false} />
      <PageHeading pageName={"Page name placeholder"} />
      <ImageCard />
      <ImageCard />
      <ImageCard />
      <Button variant="contained" color="primary" className={classes.addImage}>
        Add image
      </Button>
    </div>
  );
}

export default Start;
