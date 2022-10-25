import React from "react";
import axios from "axios";
import { IconButton, Paper, TableCell } from "@mui/material";
import {
  DriveFileRenameOutline,
  DeleteOutline,
  Person2,
} from "@mui/icons-material";

const SubjectDetails = ({data, action}) => {
  const handleDelete = async () => {
    const res = await axios.delete("/api/subject/delete/" + data.subjectID);
    console.log(res);
  };
  return (
    <>
      <TableCell align="left">{data.subjectID }</TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{ textTransform: "capitalize" }}
      >
        {data?.title }
      </TableCell>
      {action ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default SubjectDetails;
