import React from "react";
import "./Topbar.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import { Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';

const Topbar = (props) => {
  const pathName = window.location.pathname;
  const pathFormat = pathName.substring(1);
  const pathFinalFormat = pathFormat.replace("/", "  >  ").toUpperCase();
  return (
    <div className="container-topbar">
      <OtherHousesOutlinedIcon sx={{ fontSize: "30px" }} />
      <p >{pathFinalFormat}</p>
    </div>
  );
};

export default Topbar;
