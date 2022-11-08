import React from "react";
import axios from "axios";
import { IconButton, Paper, TableCell } from "@mui/material";
import {
  DriveFileRenameOutline,
  DeleteOutline,
  Person2,
} from "@mui/icons-material";
const UsersDetails = ({ user, result }) => {
  const handleDelete = async () => {
    const res = await axios.delete("/api/users/delete/" + user.username);
    console.log(res);
  };
  return (
    <>
      <TableCell align="left">{user?.username || "-"}</TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{ textTransform: "capitalize" }}
      >
        {result?.firstName + " " + result?.lastName || "-"}
      </TableCell>

      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        {user?.role || "-"}
      </TableCell>
      <TableCell align="left">
        <Paper
          elevation={0}
          sx={{
            display: "grid",
            width: "60%",
            gridTemplateColumns: " 1fr 1fr 1fr",
          }}
        >
          <IconButton sx={{ cursor: "pointer" }}>
            <Person2 />
          </IconButton>
          <IconButton sx={{ cursor: "pointer" }}>
            <DriveFileRenameOutline />
          </IconButton>
          <IconButton onClick={handleDelete} sx={{ cursor: "pointer" }}>
            <DeleteOutline color="errorColor" />
          </IconButton>
        </Paper>
      </TableCell>
    </>
  );
};

export default UsersDetails;
