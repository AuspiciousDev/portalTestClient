import React from "react";
import {
  Avatar,
  Box,
  Typography,
  Paper,
  useTheme,
  Divider,
} from "@mui/material";
import deped from "../../images/Logo-DepEd-1.png";
import { borderColor, color } from "@mui/system";
import { ColorModeContext, tokens } from "../../theme";
import { styled, alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      width="100%"
      sx={{
        display: "flex",
        backgroundColor: colors.Sidebar[100],
        p: { xs: "7.5px 10px", sm: "20px 45px" },
        boxShadow: "rgba(0, 0, 0, 0.15) 1px 1px 2.6px",
        borderRadius: "20px 20px 0 0",
      }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box gap={2} sx={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/"
          style={{
            alignItems: "center",
            color: colors.black[100],
            textDecoration: "none",
          }}
        >
          <img
            alt="web-logo"
            src={deped}
            style={{ width: "100px", objectFit: "contain" }}
          />
        </Link>
        <Typography variant="h3">Student Portal</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
        <Paper
          sx={{
            p: "10px 25px",
            borderRadius: "20px",
            border: `1px solid `,
            borderColor: colors.primary[950],
            backgroundColor: colors.Sidebar[100],
          }}
        >
          <Link
            to="/register"
            style={{
              alignItems: "center",
              color: colors.PrimaNwhite[100],
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            <Typography variant="h5">Sign up</Typography>
          </Link>
        </Paper>
        <Paper
          sx={{
            p: "10px 25px",
            borderRadius: "20px",
            backgroundColor: colors.primary[950],
          }}
        >
          <Link
            to="/login"
            style={{
              alignItems: "center",
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <Typography variant="h5">Login</Typography>
          </Link>
        </Paper>
      </Box>
    </Box>
  );
};

export default Topbar;
