import React from "react";
import {
  Dashboard,
  ListAlt,
  Description,
  Grade,
  Person2Outlined,
  Badge,
  AutoStories,
  Groups,
  Diversity3,
  Menu,
  EmojiEvents,
  AccountCircle,
} from "@mui/icons-material";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import SettingsApplicationsOutlinedIcon from "@mui/icons-material/SettingsApplicationsOutlined";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserGraduate,
  faBook,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <Dashboard />,
    path: "dashboard",
  },
  {
    title: "Student Grades",
    icon: <Grade />,
    path: "grades",
  },
  {
    title: "Master List",
    icon: <ListAlt />,
    path: "masterlist",
    subData: [
      {
        title: "Students",
        icon: <Groups />,
        path: "students",
      },
      {
        title: "Subjects",
        icon: <AutoStories />,
        path: "subjects",
      },
      {
        title: "Employees",
        icon: <Badge />,
        path: "employees",
      },
    ],
  },
  {
    title: "Reports",
    icon: <Description />,
    path: "reports",
  },
  {
    title: "Manage Users",
    icon: <Person2Outlined />,
    path: "users",
  },
  {
    title: "Maintenance",
    icon: <SettingsApplicationsOutlinedIcon />,
    path: "maintenance",
  },
];
