import React from "react";
import axios from "axios";
import { IconButton, Paper, TableCell } from "@mui/material";
import {
  DriveFileRenameOutline,
  DeleteOutline,
  Person2,
} from "@mui/icons-material";
const TableBodyDetails = ({ data }) => {
  const handleDelete = async () => {
    const res = await axios.delete("/api/employees/delete/" + data.empID);
    console.log(res);
  };
  return (
    <>
      <TableCell align="left">{data.empID || "-"}</TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{ textTransform: "capitalize" }}
      >
        {data?.firstName + " " + data.lastName || "-"}
      </TableCell>
      <TableCell align="left">{data?.email || "-"}</TableCell>
      <TableCell align="left" sx={{ textTransform: "capitalize" }}>
        {data.position}
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

export default TableBodyDetails;
