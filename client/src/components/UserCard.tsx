import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  createStyles,
  Divider,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  Typography,
  MenuItem,
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

  const [newRole, setNewRole] = useState<string | undefined | unknown>("");

  const handleRoleChange = (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setNewRole(e.target.value);
    console.log(e.target.value);
  };

  const handleDeleteUserClick = (id: string) => {
    fetch(`/api/users/${id}`, {
      method: "DELETE",
    }).then(() => {
      props.triggerFetch();
    });
  };

  const handleUpdateUserRoleClick = (
    id: string,
    newRole: string | undefined | unknown
  ) => {
    fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: newRole }),
    }).then(() => {
      props.triggerFetch();
    });
  };

  return (
    <Box>
      <Box className={classes.root}>
        <Box>
          <Typography>{props.user}</Typography>
          <FormControl>
            <InputLabel id="demo-customized-select-label">Role</InputLabel>
            <Select defaultValue={props.role} onChange={handleRoleChange}>
              <MenuItem value={"member"}>Member</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.buttonWrapper}>
          <Button
            color="primary"
            onClick={() => handleDeleteUserClick(props.id)}
          >
            Delete User
          </Button>
          <Button
            onClick={() => handleUpdateUserRoleClick(props.id, newRole)}
            color="secondary"
          >
            Save User
          </Button>
        </Box>
      </Box>
      <Divider color="primary" />
    </Box>
  );
}

export default UserCard;
