import { createStyles, makeStyles } from "@material-ui/core";
import React from "react";
import phone from "../assets/phone.png";

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
        bcakground: "transparent",
      },
      container: {
        marginTop: "-20px",
        padding: "1rem 0",
        position: "relative",
        backgroundColor: "#f4f4f4",
        maxWidth: "430px",
        width: "65vw",
        overflowX: "auto",
        maxHeight: "840px",
        height: "75vh",
        borderRadius: "20px",
      },
      phone: {
        maxWidth: "530px",
        maxHeight: "950px",
        width: "75vw",
        height: "100vh",
        position: "absolute",
        zIndex: -1,
      },
    })
  );
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.phone} src={phone} alt="phone-background" />
      <div className={classes.container}>{children}</div>
    </div>
  );
};

export default Container;
