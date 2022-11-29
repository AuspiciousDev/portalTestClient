import React from "react";
import { Box, Typography } from "@mui/material";
import SectionTable from "./components/Section/SectionTable";
const TeachersSection = () => {
  return (
    <div className="contents-container">
      {/* <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: " 1fr 1fr",
          margin: "10px 0",
        }}
      >
        <Box>
          <Typography variant="h2" fontWeight={600}>
            Section
          </Typography>
          <Typography>Showing 5 entries</Typography>
        </Box>
      </Box> */}
      <SectionTable />
    </div>
  );
};

export default TeachersSection;
