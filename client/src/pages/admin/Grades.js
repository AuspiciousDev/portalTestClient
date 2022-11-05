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
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  DriveFileRenameOutline,
  AccountCircle,
  DeleteOutline,
  Person2,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
const Grades = () => {
  const [getLevelID, setLevelID] = useState("");
  const [getSectionID, setSectionID] = useState("");
  const [getLevelTitle, setLevelTitle] = useState("");
  const [getSectionTitle, setSectionTitle] = useState("");

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
        id={data.levelID === getLevelID ? "active" : ""}
      >
        <ButtonBase
          sx={{
            minWidth: "220px",
            minHeight: "60px",
          }}
          onClick={() => {
            setLevelID(data.levelID);
            setLevelTitle(data.levelTitle);
            setSectionID("");
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
        id={data.sectionID === getSectionID ? "active" : ""}
      >
        <ButtonBase
          sx={{
            minWidth: "220px",
            minHeight: "60px",
          }}
          onClick={() => {
            setSectionID(data.sectionID);
            setSectionTitle(data.sectionTitle);
          }}
        >
          <Typography variant="h6"> {data.sectionTitle}</Typography>
        </ButtonBase>
      </Paper>
    );
  };
  const TableTitles = () => {
    return (
      <TableRow>
        <TableCell align="center"></TableCell>
        <TableCell align="left">Student ID</TableCell>
        <TableCell align="left">Name</TableCell>
        <TableCell align="left">Sex</TableCell>
        <TableCell align="left">Actions</TableCell>
      </TableRow>
    );
  };
  const tableDetails = (val) => {
    return (
      <StyledTableRow
        key={val._id}
        data-rowid={val.studID}
        sx={
          {
            // "&:last-child td, &:last-child th": { border: 2 },
            // "& td, & th": { border: 2 },
          }
        }
      >
        {/* Profile ID */}
        <TableCell sx={{ p: "0 0" }} align="center">
          <AccountCircle sx={{ fontSize: "50px" }} />
        </TableCell>
        {/* Student ID */}
        <TableCell align="left">{val.studID}</TableCell>
        {/* Student Name */}
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {val.firstName + " " + val.lastName}
        </TableCell>
        {/* Student Level */}
        <TableCell align="left">Grade {val.level}</TableCell>
        {/* Student Department */}
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val.department}
        </TableCell>
        <TableCell align="left">
          <Box
            elevation={0}
            sx={{
              display: "grid",
              width: "60%",
              gridTemplateColumns: " 1fr 1fr 1fr",
            }}
          >
            <IconButton sx={{ cursor: "pointer" }}>
              {/* <Person2 /> */}
            </IconButton>
            {console.log(val)}
            {/* <StudentEditForm data={val} /> */}
            {/* <DeleteRecord val={val} /> */}
          </Box>
        </TableCell>
      </StyledTableRow>
    );
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
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
            margin: "10px 0 30px 0",
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
              {getLevelID ? (
                sections
                  .filter((val) => {
                    return val.levelID === getLevelID;
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
        <Box>
          {getLevelID && getSectionID ? (
            <Typography variant="h5" fontWeight={600}>
              Grade {getLevelTitle} - {getSectionTitle}{" "}
            </Typography>
          ) : (
            <></>
          )}
          {getLevelID && getSectionID ? (
            <Typography variant="h5" fontWeight={600}>
              <Typography>
                Student list will appear base on chosen grade level and section.
              </Typography>
              <TableContainer
                sx={{
                  height: "700px",
                }}
              >
                <Table aria-label="simple table">
                  <TableHead>
                    <TableTitles />
                  </TableHead>
                  <TableBody>
                    {
                      // collection
                      //   .filter((employee) => {
                      //     return employee.firstName === "ing";
                      //   })
                      //   .map((employee) => {
                      //     return tableDetails(employee);
                      //   })
                      // search
                      //   ? students
                      //       .filter((data) => {
                      //         return (
                      //           data.firstName.includes(search) ||
                      //           data.studID.includes(search)
                      //         );
                      //       })
                      //       .map((data) => {
                      //         return tableDetails(data);
                      //       })
                      //   : students &&
                      //     students.slice(0, 8).map((data) => {
                      //       return tableDetails(data);
                      //     })
                      // (collection.filter((employee) => {
                      //   return employee.empID === 21923595932985;
                      // }),
                      // (console.log(
                      //   "🚀 ~ file: EmployeeTable.js ~ line 526 ~ EmployeeTable ~ collection",
                      //   collection
                      // ),
                      // collection &&
                      //   collection.slice(0, 8).map((employee) => {
                      //     return tableDetails(employee);
                      //   })))
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Grades;
