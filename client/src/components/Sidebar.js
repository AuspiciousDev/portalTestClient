import React from "react";
import "../css/Sidebar.css";
import deped from "../images/Logo-DepEd-1.png";
import { SidebarData } from "./SidebarData";
import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
function Sidebar() {
  return (
    <div className="Sidebar">
      <div className="sidebar-image">
        <img src={deped} alt="" />
      </div>
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              className="sidebarRow"
              id={window.location.pathname == val.path ? "active" : ""}
              key={key}
              onClick={() => {
                window.location.pathname = val.path;
              }}
            >
              <div id="icon"> {val.icon}</div>
              <div id="title"> {val.title}</div>
            </li>
          );
        })}
      </ul>

      <ul className="sidebarList logout">
        <li className="sidebarRow">
          <div id="icon">
            <ExitToAppOutlined />
          </div>
          <div id="title"> Logout</div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
