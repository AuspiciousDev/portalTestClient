import { Typography } from "@mui/material";
import React from "react";
import EmployeeForm from "././components/EmployeeForm";
const Employees = () => {
  return (
    <div className="contents-container">
      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ margin: "20px 0 5px 0", alignSelf: "start" }}
      >
        Employee
      </Typography>
      <EmployeeForm />
    </div>
  );
};

export default Employees;
