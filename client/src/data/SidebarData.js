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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate, faBook } from "@fortawesome/free-solid-svg-icons";

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
        title: "Student List",
        icon: <FontAwesomeIcon icon={faUserGraduate} />,
        path: "home/studentlist",
      },
      {
        title: "Subject List",
        icon: <FontAwesomeIcon icon={faBook} />,
        path: "home/subjectlist",
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