import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
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
        overflowX: "auto",
        height: "800px",
        padding: "5px 10px",
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