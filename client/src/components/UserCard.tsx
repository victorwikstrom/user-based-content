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
  useTheme,
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
        margin: "2rem 0",
      },
      buttonWrapper: {
        display: "flex",
        flexDirection: "column",
      },
    })
  );
  const classes = useStyles();

  const [role, setRole] = useState<string | undefined | unknown>(props.role);
  const [roleHasChanged, setRoleHasChanged] = useState(false);

  const handleRoleChange = (
    e: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setRole(e.target.value);
    setRoleHasChanged(true);
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
      setRoleHasChanged(false);
    });
  };

  const theme = useTheme();

  return (
    <Box>
      <Box className={classes.root}>
        <Box>
          <Typography style={{ marginBottom: "10px" }} variant="h6">
            {props.user}
          </Typography>
          <FormControl>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={handleRoleChange}>
              <MenuItem value={"member"}>Member</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box className={classes.buttonWrapper}>
          <Button
            color="primary"
            size="small"
            onClick={() => handleDeleteUserClick(props.id)}
          >
            Delete User
          </Button>
          {roleHasChanged ? (
            <Button
              onClick={() => handleUpdateUserRoleClick(props.id, role)}
              variant="contained"
              color="primary"
              size="small"
            >
              Save Changes
            </Button>
          ) : null}
        </Box>
      </Box>
      <Divider color="primary" />
    </Box>
  );
}

export default UserCard;
