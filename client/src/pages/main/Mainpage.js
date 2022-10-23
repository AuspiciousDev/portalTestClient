import React from "react";
import {
  Outlet,
} from "react-router-dom";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar.js";

import "../../App.css";
const MainPage = () => {
  return (
    <div className="mainpage-container">
      <div className="mainpage-sidebar">
        <Sidebar />
      </div>
      <div className="mainpage-content">
        <Topbar />
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
