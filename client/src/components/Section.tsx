import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Section: React.FC<Props> = ({ children }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        padding: "5px 10px",
      },
    })
  );
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

export default Section;
