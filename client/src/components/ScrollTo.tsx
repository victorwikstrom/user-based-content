import { IconButton } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import React, { useEffect, useState } from "react";

interface Props {
  showBelow: number;
}

function ScrollTo(props: Props) {
  const [show, setShow] = useState(props.showBelow ? false : true);

  const handleScroll = () => {
    if (window.pageYOffset > props.showBelow) {
      if (!show) {
        setShow(true);
      }
    } else {
      if (show) {
        setShow(false);
      }
    }
  };

  useEffect(() => {
    if (props.showBelow) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });

  const handleBackToTopClick = () => {
    window["scrollTo"]({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <IconButton onClick={handleBackToTopClick}>
        <ArrowUpwardIcon />
      </IconButton>
    </div>
  );
}

export default ScrollTo;
