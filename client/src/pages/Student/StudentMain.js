import React from "react";
import { Outlet } from "react-router-dom";
const StudentMain = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default StudentMain;
