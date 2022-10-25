import React from "react";
import {
  Dashboard,
  ListAlt,
  Description,
  Menu,
  EmojiEvents,
  Grade,
  Person2Outlined,
  Badge,
  AutoStories,
  Diversity3,
  Groups,
  AccountCircle,
} from "@mui/icons-material";
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
        path: "home/students",
      },
      {
        title: "Subjects",
        icon: <AutoStories />,
        path: "home/subjects",
      },
      {
        title: "Employees",
        icon: <Badge />,
        path: "home/employees",
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
