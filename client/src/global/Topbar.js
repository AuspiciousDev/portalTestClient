import React from "react";
import "./Topbar.css";
import { AccountCircle } from "@mui/icons-material";
import OtherHousesOutlinedIcon from "@mui/icons-material/OtherHousesOutlined";

import { Typography, Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      display="flex"
      backgroundColor={colors.primary[900]}
      justifyContent="flex-end"
      p={2}
    >
      <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={1}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon sx={{ fontSize: "20pt" }} />
          ) : (
            <LightModeOutlinedIcon sx={{ fontSize: "20pt" }} />
          )}
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon sx={{ fontSize: "20pt" }} />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon sx={{ fontSize: "20pt" }} />
        </IconButton>
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
