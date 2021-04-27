import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      container: {
        backgroundColor: "#f4f4f4",
        border: "2px solid black",
        maxWidth: "400px",
        width: "60vw",
        overflowX: "auto",
        maxHeight: "800px",
        height: "95vh",
        borderRadius: "5px",
      },
    })
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default Container;
