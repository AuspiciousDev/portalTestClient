import React from "react";
import axios from "axios";
import {
  IconButton,
  Paper,
  TableCell,
  tableCellClasses,
  TableRow,
} from "@mui/material";
import {
  DriveFileRenameOutline,
  DeleteOutline,
  Person2,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
const SubjectDetails = ({ data, action }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const handleDelete = async () => {
    const res = await axios.delete("/api/subject/delete/" + data.subjectID);
    console.log(res);
  };
  return (
    <>
      <StyledTableCell align="left">{data.subjectID}</StyledTableCell>
      <StyledTableCell
        component="th"
        scope="row"
        sx={{ textTransform: "capitalize" }}
      >
        {data?.title}
      </StyledTableCell>

      <StyledTableCell align="left">
        <Box
          elevation={0}
          sx={{
        
            display: "grid",
            width: "150px",
            gridTemplateColumns: " 2fr 2fr 1fr",
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
        </Box>
      </StyledTableCell>
    </>
  );
};

export default SubjectDetails;
