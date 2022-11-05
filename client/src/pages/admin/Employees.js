import { Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import React from "react";
import EmployeeForm from "././components/EmployeeForm";
import EmployeeTable from "./components/EmployeeTable";
const Employees = () => {
  return (
    <div className="contents-container">
      <EmployeeTable />
    </div>
  );
};

export default Employees;
