import React from "react";
import { useState } from "react";
import {
  Box,
  Paper,
  InputBase,
  Divider,
  Button,
  Typography,
  IconButton,
  ButtonBase,
} from "@mui/material";
const Grades = () => {
  const [getLevel, setLevel] = useState("GR1");
  const [getSection, setSection] = useState("");

  function createLevel(levelID, levelTitle) {
    return { levelID, levelTitle };
  }

  const grades = [
    createLevel("GR1", "1"),
    createLevel("GR2", "2"),
    createLevel("GR3", "3"),
    createLevel("GR4", "4"),
    createLevel("GR5", "5"),
    createLevel("GR6", "6"),
  ];

  function createSection(levelID, sectionID, sectionTitle) {
    return { levelID, sectionID, sectionTitle };
  }

  const sections = [
    createSection("GR1", "SC1", "Malala"),
    createSection("GR1", "SC2", "ALALAY"),
    createSection("GR2", "SC1", "EWAN"),
    createSection("GR5", "SC1", "IDOWN"),
  ];

  const GradeLevel = ({ data }) => {
    return (
      <Paper
        className="cardLevel"
        sx={{
          display: "flex",
          minWidth: "220px",
          minHeight: "60px",
          mr: "20px",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
        elevation={2}
        key={data.levelID}
        id={data.levelID === getLevel ? "active" : ""}
      >
        <ButtonBase
          sx={{
            minWidth: "220px",
            minHeight: "60px",
          }}
          onClick={() => {
            setLevel(data.levelID);
          }}
        >
          <Typography variant="h6">Grade {data.levelTitle}</Typography>
        </ButtonBase>
      </Paper>
    );
  };
  const Section = ({ data }) => {
    return (
      <Paper
        className="cardSection"
        sx={{
          display: "flex",
          minWidth: "220px",
          minHeight: "60px",
          mr: "20px",
          borderRadius: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
        elevation={2}
        key={data.sectionID}
        id={data.sectionID === getSection ? "active" : ""}
      >
        <ButtonBase
          sx={{
            minWidth: "220px",
            minHeight: "60px",
          }}
          onClick={() => {
            setSection(data.sectionID);
          }}
        >
          <Typography variant="h6"> {data.sectionTitle}</Typography>
        </ButtonBase>
      </Paper>
    );
  };
  return (
    <div className="contents-container">
      <Box sx={{ display: "flex", width: "100%", flexDirection: "column" }}>
        {/* Header Title */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            margin: "10px 0",
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight={600}>
              Select Grade Level and Section
            </Typography>
            <Typography>
              Student list will appear base on chosen grade level and section.
            </Typography>
          </Box>
        </Box>
        {/* Grades card */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            margin: "10px 0",
            flexDirection: "column",
          }}
        >
          <Box mb="20px">
            <Typography variant="h6" fontWeight={600}>
              Grade Levels
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "50px",
                padding: "10px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {grades.map((val) => {
                return <GradeLevel key={val.levelID} data={val} />;
              })}
            </Box>
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Sections
            </Typography>
            <Box
              sx={{
                width: "100%",
                height: "50px",
                padding: "10px",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {getLevel ? (
                sections
                  .filter((val) => {
                    return val.levelID === getLevel;
                  })
                  .map((val) => {
                    return <Section key={val.sectionID} data={val} />;
                  })
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Box>
        <Typography>{getLevel}</Typography>
      </Box>
    </div>
  );
};

export default Grades;
