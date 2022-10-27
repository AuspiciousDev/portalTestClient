import React from "react";
import { Typography } from "@mui/material";
import SubjectTable from "../home/components/SubjectTable";

const Subjects = () => {
  return (
    <div className="contents-container">
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ margin: "20px 0 5px 0", alignSelf: "start" }}
      >
        Subjects
      </Typography>
      <SubjectTable />
    </div>
  );
};

export default Subjects;
