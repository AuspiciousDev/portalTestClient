import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Paper,
  Card,
} from "@mui/material";
import {
  AutoStories,
  Diversity3,
  Badge,
  Groups,
  AccountCircle,
} from "@mui/icons-material";

import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { styled } from "@mui/material/styles";
import StudentDetails from "./components/Student/StudentDetails";
const Dashboard = () => {
  const fCountVariant = "h3";
  const fDescVariant = "subtitle1";
  const fWeight = "800";
  const [isloading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [students, setStudents] = useState([]);
  const [collection, setCollection] = useState([]);
  const [withData, setWithData] = useState(false);
  const [studentsCount, setStudentsCount] = useState("0");
  const [employeesCount, setEmployeesCount] = useState("0");
  const [subjectsCount, setSubjectsCount] = useState("0");
  const [sectionsCount, setSectionsCount] = useState("0");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const getOverviewDetails = async () => {
    setIsLoading(true);
    const response = await axios("/api/employees");
    const response1 = await axios("/api/students");
    const response2 = await axios("/api/subjects");

    if (
      response.statusText === "OK" &&
      response1.statusText === "OK" &&
      response2.statusText === "OK"
    ) {
      setSectionsCount(response.data.length);
      setStudents(response1.data);
      var count = 0;
      for (let x = 0; x < response.data.length; x++) {
        if (response.data[x].position === "teacher") {
          count += 1;
        }
      }
      setEmployeesCount(count);
      setStudentsCount(response1.data.length);
      setSubjectsCount(response2.data.length);
      await setIsLoading(false);
    } else {
      return;
    }
  };
  const getTableDetails = async () => {
    setIsLoading(true);
    const response = await axios("/api/students");
    if (response.statusText === "OK") {
      await setCollection(response.data);
      await console.log(response);
      setIsLoading(false);
      if (!response.data || response.data.length === 0) {
        setWithData(false);
        return;
      } else {
        setWithData(true);
      }
    } else {
      return;
    }
  };
  useEffect(() => {
    getOverviewDetails();
    getTableDetails();
  }, []);

  const totalStudents = (
    <Box
      elevation={3}
      sx={{
        backgroundColor: `${colors.gray[900]}`,
        color: `${colors.black[100]}`,
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        padding: "10px",
      }}
    >
      <Groups sx={{ fontSize: "80px", alignSelf: "center" }} />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        {studentsCount}
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Students
      </Typography>
    </Box>
  );
  const totalInstructors = (
    <Box
      elevation={3}
      sx={{
        backgroundColor: `${colors.gray[900]}`,
        color: `${colors.black[100]}`,
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        padding: "10px",
      }}
    >
      <Badge sx={{ fontSize: "80px", alignSelf: "center" }} />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        {employeesCount}
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Instructors
      </Typography>
    </Box>
  );
  const totalSubjects = (
    <Box
      elevation={3}
      sx={{
        backgroundColor: `${colors.gray[900]}`,
        color: `${colors.black[100]}`,
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        padding: "10px",
      }}
    >
      <AutoStories sx={{ fontSize: "80px", alignSelf: "center" }} />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        {subjectsCount}
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Subjects
      </Typography>
    </Box>
  );
  const totalSections = (
    <Box
      elevation={2}
      sx={{
        backgroundColor: `${colors.gray[900]}`,
        color: `${colors.black[100]}`,
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        padding: "10px",
      }}
    >
      <Diversity3 sx={{ fontSize: "80px", alignSelf: "center" }} />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        {sectionsCount}
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Sections
      </Typography>
    </Box>
  );

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(StudentID, Name, Level, Section) {
    return { StudentID, Name, Level, Section };
  }

  const rows = [
    createData(2019115572, "Crystal Moran", "1", "Javascript"),
    createData(2019115573, "Marcos Day", "2", "Python"),
    createData(2019115574, "Eric Stephenson", "3", "PostGre"),
    createData(2019115575, "Kelsie Hodge", "4", "Java"),
    createData(2019115575, "Kelsie Hodge", "4", "Java"),
    createData(2019115574, "Eric Stephenson", "3", "PostGre"),
    createData(2019115575, "Kelsie Hodge", "4", "Java"),
  ];

  return (
    <div className="contents-container">
      <Box width="100%" marginBottom={5}>
        <Typography variant="h2" marginBottom="30px">
          Overview
        </Typography>
        <Grid
          container
          width="100%"
          spacing={5}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={3}>
            {totalStudents}
          </Grid>
          <Grid item xs={3}>
            {totalInstructors}
          </Grid>
          <Grid item xs={3}>
            {totalSubjects}
          </Grid>
          <Grid item xs={3}>
            {totalSections}
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h5">Recent Students</Typography>
        <Typography>Showing 10 entries</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}>
          <TableContainer>
            <Table sx={{ minWidth: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: `${colors.gray[900]}` }}>
                  <TableCell>Student ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Level</TableCell>
                  <TableCell align="left">Section</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {collection &&
                  collection.map((val) => {
                    return (
                      <StyledTableRow
                        key={val._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StudentDetails
                          key={val.username}
                          data={val}
                        ></StudentDetails>
                      </StyledTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box padding="0 0 0 25px">
            {/* <Typography variant="h5" marginBottom={2}>
              Recent Students
            </Typography> */}
            <Grid
              container
              sx={{ width: "400px" }}
              spacing={3}
              direction="column"
              alignItems="center"
              justify="center"
            >
              {students.slice(0, 5).map((val, key) => (
                <Grid
                  key={key}
                  item
                  xs={3}
                  sx={{ width: "100%", padding: "0 25px" }}
                >
                  <Box
                    elevation={1}
                    sx={{
                      backgroundColor: `${colors.gray[900]}`,
                      color: `${colors.black[100]}`,
                      display: "flex",
                      flexDirection: "row",
                      borderRadius: 5,
                      padding: "10px",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <AccountCircle
                      sx={{ fontSize: "40px", margin: "0 15px 0 10px" }}
                    />
                    <Box>
                      <Typography
                        color="primaryGray"
                        textTransform="capitalize"
                      >
                        {val.firstName + " " + val.lastName}
                      </Typography>
                      <Typography
                        color="primaryGray"
                        textTransform="capitalize"
                      >
                        Grade {val.level} - {val.section}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
