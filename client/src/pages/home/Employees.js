import { Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import EmployeeForm from "././components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
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
      <EmployeeTable />
      {/* <EmployeeForm /> */}
    </div>
  );
};

export default Employees;
