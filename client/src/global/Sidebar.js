import React, { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "../data/SidebarData";

import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";

import deped from "../images/Logo-DepEd-1.png";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { tokens } from "../theme";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "react-pro-sidebar/dist/css/styles.css";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.gray[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};
const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [getPath, setPath] = useState("");
  const toggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[800]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.yellowAccent[300]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.yellowAccent[500]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.gray[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.gray[100]}>
                  MENU
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={deped}
                  style={{
                    cursor: "pointer",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h3"
                  color={colors.gray[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  Lorem Ipsum
                </Typography>
                <Typography variant="h5" color={colors.yellowAccent[500]}>
                Lorem Ipsum
                </Typography>
              </Box>
            </Box>
          )}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin/dashboard"
              icon={<DashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.gray[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Data
              </Typography>
            )}

            <Item
              title="Student Grades"
              to="grades"
              icon={<GradeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Users"
              to="users"
              icon={<Person2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <SubMenu title="Master List" icon={<Person2OutlinedIcon />}>
              <Item
                title="Students"
                to="students"
                icon={<GroupsOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Subjects"
                to="subjects"
                icon={<AutoStoriesOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Employees"
                to="employees"
                icon={<BadgeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </SubMenu>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
    // <div className="sidebar-container">
    //   <div className="sidebar-image">
    //     <img src={deped} alt="" />
    //   </div>
    //   <ul className="sidebarList">
    //     {SidebarData.map((val, key) => {
    //       if (val.subData) {
    //         return (
    //           <div key={key}>
    //             <li
    //               className="sidebarRow"
    //               key={key}
    //               onClick={() => {
    //                 toggleMenu();
    //                 console.log(window.location.pathname);
    //                 console.log(val.path);
    //               }}
    //             >
    //               <div id="icon"> {val.icon}</div>
    //               <div id="title"> {val.title}</div>
    //               <div id="arrow">
    //                 <ExpandMore />
    //               </div>
    //             </li>
    //             {isMenuOpen &&
    //               val.subData.map((item, itemkey) => (
    //                 <li
    //                   className="sidebarRow sub"
    //                   id={
    //                     window.location.pathname.includes(val.path)
    //                       ? "active"
    //                       : ""
    //                   }
    //                   key={itemkey}
    //                   onClick={() => {
    //                     window.location.pathname = item.path;
    //                     console.log(window.location.pathname);
    //                     console.log(item.path);
    //                     console.log((window.location.pathname = item.path));
    //                   }}
    //                 >
    //                   <div id="icon"> {item.icon}</div>
    //                   <div id="title"> {item.title}</div>
    //                 </li>
    //               ))}
    //           </div>
    //         );
    //       } else {
    //         return (
    //           <li
    //             className="sidebarRow"
    //             id={window.location.pathname.includes(val.path) ? "active" : ""}
    //             key={key}
    //             onClick={() => {
    //               navigate(val.path);
    //               console.log(val.path);
    //             }}
    //           >
    //             <div id="icon"> {val.icon}</div>
    //             <div id="title"> {val.title}</div>
    //             <div id="arrow"> </div>
    //           </li>
    //         );
    //       }
    //     })}
    //   </ul>
    //   <div className="logout-div">
    //     <ul className="sidebarList logout">
    //       <li
    //         className="sidebarRow logout"
    //         onClick={() => {
    //           navigate("/login");
    //         }}
    //       >
    //         <div id="icon">
    //           <Logout />
    //         </div>
    //         <div id="title"> Logout</div>
    //         <div id="arrow"> </div>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default Sidebar;
