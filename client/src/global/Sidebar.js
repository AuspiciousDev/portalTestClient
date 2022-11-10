import "./Sidebar.css";
import { SidebarData } from "../data/SidebarData";

import ExitToAppOutlined from "@mui/icons-material/ExitToAppOutlined";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import deped from "../images/Logo-DepEd-1.png";
import profilePic from "../images/profile2.png";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";

import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";

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
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import CoPresentIconOutlinedIcon from "@mui/icons-material/CoPresentOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import "react-pro-sidebar/dist/css/styles.css";
import { useEmployeesContext } from "../hooks/useEmployeesContext";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      // active={selected === title}
      active={window.location.pathname.includes(to)}
      // active={window.location.pathname === to}
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

  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const { employees, empDispatch } = useEmployeesContext();

  const [userName, setUserName] = useState();
  const [userType, setUserType] = useState();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [getPath, setPath] = useState("");
  const toggleMenu = (e) => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const getOverviewDetails = async () => {
      try {
        const apiEmp = await axiosPrivate.get("/api/employees");
        if (apiEmp?.status === 200) {
          const json = await apiEmp.data;
          empDispatch({ type: "SET_EMPLOYEES", payload: json });
        }
      } catch (error) {}

      setUserType(auth.roles);
    };
    getOverviewDetails();
  }, [empDispatch]);

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
          color: `${colors.yellowAccent[500]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.yellowAccent[500]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <SidebarHeader>
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 15px 0",
                color: colors.gray[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon
                      style={{
                        color: colors.gray[100],
                      }}
                    />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {isCollapsed && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                m="10px 0"
              >
                <img
                  alt="profile-user"
                  width="35px"
                  height="35px"
                  src={profilePic}
                  style={{
                    cursor: "pointer",
                    objectFit: "contain",
                    borderRadius: "50%",
                  }}
                />
              </Box>
            )}
            {!isCollapsed && (
              <Box mb="15px" sx={{ transition: ".5s" }}>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    alt="profile-user"
                    width="75px"
                    height="75px"
                    src={profilePic}
                    style={{
                      cursor: "pointer",
                      objectFit: "contain",
                      borderRadius: "50%",
                    }}
                  />
                </Box>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    color={colors.gray[100]}
                    sx={{ m: "10px 0 0 0", textTransform: "capitalize" }}
                  >
                    {employees &&
                      employees
                        .filter((data) => {
                          return data.empID === auth.username;
                        })
                        .map((val) => {
                          return val?.firstName + " " + val?.lastName;
                        })}
                  </Typography>
                  <Typography variant="h6" color={colors.yellowAccent[500]}>
                    {userType == 2001 ? "Teacher" : ""}
                  </Typography>
                </Box>
              </Box>
            )}
          </SidebarHeader>
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="dashboard"
              icon={<DashboardOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Student Grades"
              to="grade"
              icon={<GradeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Active Students"
              to="actives"
              icon={<CoPresentIconOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed ? (
              <Typography
                variant="h6"
                color={colors.gray[700]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Master List
              </Typography>
            ) : (
              <SidebarHeader />
            )}
            <Item
              title="Users"
              to="user"
              icon={<Person2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Students"
              to="student"
              icon={<SchoolOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Subjects"
              to="subject"
              icon={<AutoStoriesOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Employees"
              to="employee"
              icon={<BadgeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed ? (
              <Typography
                variant="h6"
                color={colors.gray[700]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Record
              </Typography>
            ) : (
              <SidebarHeader />
            )}
            <Item
              title="Records"
              to="record"
              icon={<FolderOpenOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed ? (
              <Typography
                variant="h6"
                color={colors.gray[700]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Maintenance
              </Typography>
            ) : (
              <SidebarHeader />
            )}
            <Item
              title="Section"
              to="section"
              icon={<GroupsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />{" "}
            <Item
              title="Level"
              to="level"
              icon={<StairsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Department"
              to="department"
              icon={<CorporateFareOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="School Year"
              to="schoolyear"
              icon={<CalendarMonthOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {/* <Box
              sx={{
                borderBottom: `1px solid ${colors.gray[900]}`,
                width: "90%",
              }}
            /> */}
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
    // navigate(val.path);
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
