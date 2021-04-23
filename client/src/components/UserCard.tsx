import React from "react";
import {
  Box,
  Button,
  createStyles,
  Divider,
  makeStyles,
  Typography,
} from "@material-ui/core";

interface Props {
  id: string;
  user: string;
  role: string;
  triggerFetch: () => void;
}

function UserCard(props: Props) {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "8rem",
      },
      buttonWrapper: {
        display: "flex",
        flexDirection: "column",
      },
    })
  );
  const classes = useStyles();

  const handleDeleteUserClick = (id: string) => {
    console.log(id);
    fetch(`http://localhost:4000/api/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      props.triggerFetch();
    });
  };

  return (
    <>
      <Box className={classes.root}>
        <Box>
          <Typography>{props.user}</Typography>
          <Typography>{props.role}</Typography>
        </Box>
        <Box className={classes.buttonWrapper}>
          <Button
            color="primary"
            onClick={() => handleDeleteUserClick(props.id)}
          >
            Delete User
          </Button>
          <Button color="secondary">Save User</Button>
        </Box>
      </Box>
      <Divider color="primary" />
    </>
  );
}

export default UserCard;
