import React, { useState } from "react";

import deped from "../../images/Logo-DepEd-1.png";
// import deped from "../images/gg1.png";
import { SidebarData } from "../../data/SidebarData";
import "./Sidebar.css";
import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="sidebar-container">
      <div className="sidebar-image">
        <img src={deped} alt="" />
      </div>
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          if (val.subData) {
            return (
              <div>
                <li
                  className="sidebarRow"
                  id={window.location.pathname === val.path ? "active" : ""}
                  key={key}
                  onClick={toggleMenu}
                >
                  <div id="icon"> {val.icon}</div>
                  <div id="title"> {val.title}</div>
                  <div id="arrow">
                    <ExpandMore />
                  </div>
                </li>
                {isMenuOpen &&
                  val.subData.map((item, itemkey) => (
                    <li
                      className="sidebarRow sub"
                      id={
                        window.location.pathname === item.path ? "active" : ""
                      }
                      key={itemkey}
                      onClick={() => {
                        window.location.pathname = item.path;
                      }}
                    >
                      <div id="icon"> {item.icon}</div>
                      <div id="title"> {item.title}</div>
                    </li>
                  ))}
              </div>
            );
          } else {
            return (
              <li
                className="sidebarRow"
                id={window.location.pathname === val.path ? "active" : ""}
                key={key}
                onClick={() => {
                  navigate(val.path);
                }}
              >
                <div id="icon"> {val.icon}</div>
                <div id="title"> {val.title}</div>
                <div id="arrow"> </div>
              </li>
            );
          }
        })}
      </ul>
      <div className="logout-div">
        <ul className="sidebarList logout">
          <li className="sidebarRow logout">
            <div id="icon">
              <Logout />
            </div>
            <div id="title"> Logout</div>
            <div id="arrow"> </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
