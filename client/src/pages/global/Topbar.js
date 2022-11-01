import React from "react";
import "./Topbar.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { AccountCircle } from "@mui/icons-material";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

const Topbar = (props) => {
  const pathName = window.location.pathname;
  const pathFormat = pathName.substring(1);
  const pathFinalFormat = pathFormat.replace("/", "  >  ").toUpperCase();
  return (
    <div className="container-topbar">
      <div className="container-path">
        <OtherHousesOutlinedIcon sx={{ fontSize: "30px" }} color="gray" />
        <Typography color="primaryGray">{pathFinalFormat}</Typography>
      </div>

      <div className="container-account">
        <div className="container-accountinfo">
          <Typography color="primaryGray" variant="h6">
            Lorem Ipsum
          </Typography>
          <Typography color="primaryGray" textAlign="end">
            ADMIN
          </Typography>
        </div>
        <AccountCircle
          sx={{ fontSize: "50px" }}
          color="gray"
          style={{ margin: "0 20px" }}
        />
      </div>
    </div>
  );
};

export default Topbar;
