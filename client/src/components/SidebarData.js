import React from "react";
import {
  Dashboard,
  ListAlt,
  Description,
  Menu,
  EmojiEvents,
  Grade,
  Person2Outlined,
} from "@mui/icons-material";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "/dashboard",
  },
  {
    title: "Student Grades",
    icon: <Grade />,
    path: "/studentgrades",
  },
  {
    title: "Master List",
    icon: <ListAlt />,
    path: "/masterlist",
  },
  {
    title: "Reports",
    icon: <Description />,
    path: "/reports",
  },
  {
    title: "Manage Users",
    icon: <Person2Outlined />,
    path: "/manage",
  },
  {
    title: "Maintenance",
    icon: <SettingsApplicationsOutlinedIcon />,
    path: "/maintenance",
  },
];
