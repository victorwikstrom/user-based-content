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
        display: "flex",
        justifyContent: "center",
      },
      container: {
        border: "1px solid black",
        maxWidth: "400px",
        minHeight: "800px",
        padding: "5px 10px",
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
