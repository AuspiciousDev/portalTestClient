import React from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { FormControl, IconButton, TextField, Typography } from "@mui/material";
import Grades from "../../Grades";
const GradesForm = () => {
  const [isFormOpen, setIsFormOpen] = useState(true);
  return (
    <>
      {isFormOpen ? (
        <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => {
                setIsFormOpen((o) => !o);
              }}
            >
              <ArrowBackIosNewOutlinedIcon sx={{ fontSize: "50px" }} />
            </IconButton>
            <Box ml="10px">
              <Typography variant="h3">Lorem Ipsum</Typography>
              <Typography>Lorem Ipsum</Typography>
            </Box>
          </Box>
          <Box mt="50px">
            <Typography variant="h2">ADD GRADES</Typography>
          </Box>
          <Box
            mt="10px"
            display="flex"
            flexDirection="column"
            gap={3}
            width="400px"
          >
            <FormControl>
              <Typography>Subject Code</Typography>
              <TextField variant="outlined" disabled value={"Lorem Ipsum"} />
            </FormControl>
            <FormControl>
              <Typography>Subject Name</Typography>
              <TextField variant="outlined" disabled value={"Lorem Ipsum"} />
            </FormControl>
          </Box>
        </Box>
      ) : (
        <Grades />
      )}
    </>
  );
};

export default GradesForm;
