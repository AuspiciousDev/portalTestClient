import React from "react";
import { Typography } from "@mui/material";
const Grades = () => {
  return (
    <div className="contents-container">
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ margin: "20px 0 5px 0", alignSelf: "start" }}
      >
        Grades
      </Typography>
    </div>
  );
};

export default Grades;
