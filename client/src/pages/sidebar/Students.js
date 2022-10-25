import React from "react";
import { Typography } from "@mui/material";
import StudentTable from "../home/components/StudentTable";

const Students = () => {
  return (
    <div className="contents-container">
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ margin: "20px 0 5px 0", alignSelf: "start" }}
      >
        Students
      </Typography>
      <StudentTable />
    </div>
  );
};

export default Students;
