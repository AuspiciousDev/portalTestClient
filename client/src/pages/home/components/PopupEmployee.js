import React from "react";
import { Box, Paper } from "@mui/material";
const PopupEmployee = (props) => {
  return props.trigger ? (
    <Box
      position="absolute"
      display="flex"
      width="200px"
      height="100px"
      sx={{ zIndex: 1 }}
    >
      <Paper sx={{ padding: "10px" }} elevation={6}>
        PopupEmployee
      </Paper>
    </Box>
  ) : (
    ""
  );
};

export default PopupEmployee;
