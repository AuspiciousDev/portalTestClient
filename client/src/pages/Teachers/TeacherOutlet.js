import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../global//Teacher/Sidebar";
import Topbar from "../../global/Teacher/Topbar";
import { useState } from "react";
import "../../App.css";
const TeacherOutlet = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className="mainpage-container">
      <Sidebar isSidebar={isSidebar} />

      <div className="mainpage-content">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default TeacherOutlet;
