import React from "react";
import "./Topbar.css";
import { AccountCircle } from "@mui/icons-material";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";

import {
  Typography,
  Box,
  IconButton,
  useTheme,
  MenuItem,
  Menu,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { styled, alpha } from "@mui/material/styles";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState();
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <Box
      display="flex"
      backgroundColor={colors.primary}
      justifyContent="flex-end"
      p="20px 50px"
    >
      <Box display="grid" gridTemplateColumns="1fr" gap={2}>
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon sx={{ fontSize: "20pt" }} />
          ) : (
            <LightModeOutlinedIcon sx={{ fontSize: "20pt" }} />
          )}
        </IconButton> */}
        {/* <IconButton>
          <SettingsOutlinedIcon sx={{ fontSize: "20pt" }} />
        </IconButton> */}
        <IconButton onClick={handleClick}>
          <SettingsOutlinedIcon sx={{ fontSize: "20pt" }} />
          {/* <PersonOutlinedIcon sx={{ fontSize: "20pt" }} /> */}
        </IconButton>
        <StyledMenu
          id="demo-customized-menu"
          MenuListProps={{
            "aria-labelledby": "demo-customized-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={colorMode.toggleColorMode} disableRipple>
            {theme.palette.mode === "dark" ? (
              <>
                <DarkModeOutlinedIcon sx={{ fontSize: "20pt" }} />
                Dark Mode
              </>
            ) : (
              <>
                <LightModeOutlinedIcon sx={{ fontSize: "20pt" }} />
                Light Mode
              </>
            )}
          </MenuItem>
          <MenuItem
            onClick={() => {
              signOut();
            }}
            disableRipple
          >
            <LogoutOutlinedIcon />
            Logout
          </MenuItem>
        </StyledMenu>
      </Box>
    </Box>
  );
};

// const Topbar = (props) => {
//   const pathName = window.location.pathname;
//   const pathFormat = pathName.substring(1);
//   const pathFinalFormat = pathFormat.replace("/", "  >  ").toUpperCase();
//   return (
//     <div className="container-topbar">
//       <div className="container-path">
//         <OtherHousesOutlinedIcon sx={{ fontSize: "30px" }} color="gray" />
//         <Typography color="primaryGray">{pathFinalFormat}</Typography>
//       </div>

//       <div className="container-account">
//         <div className="container-accountinfo">
//           <Typography color="primaryGray" variant="h6">
//             Lorem Ipsum
//           </Typography>
//           <Typography color="primaryGray" textAlign="end">
//             ADMIN
//           </Typography>
//         </div>
//         <AccountCircle
//           sx={{ fontSize: "50px" }}
//           color="gray"
//           style={{ margin: "0 20px" }}
//         />
//       </div>
//     </div>
//   );
// };

export default Topbar;
