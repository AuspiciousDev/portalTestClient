import React from "react";
import axios from "axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Button,
} from "@mui/material";
import {
  AutoStories,
  Diversity3,
  Badge,
  Groups,
  AccountCircle,
} from "@mui/icons-material";
import { format } from "date-fns-tz";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { styled } from "@mui/material/styles";
import StudentDetails from "./components/Student/StudentDetails";
import { useStudentsContext } from "../../hooks/useStudentsContext";
import { useEmployeesContext } from "../../hooks/useEmployeesContext";
import { useSubjectsContext } from "../../hooks/useSubjectsContext";
import { useSectionsContext } from "../../hooks/useSectionContext";
import { useActiveStudentsContext } from "../../hooks/useActiveStudentContext";
import Loading from "../../global/Loading";
import useRefreshToken from "../../hooks/useRefreshToken";
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const refresh = useRefreshToken();

  const fCountVariant = "h3";
  const fDescVariant = "subtitle1";
  const fWeight = "800";

  const { students, studDispatch } = useStudentsContext();
  const { employees, empDispatch } = useEmployeesContext();
  const { departments, subDispatch } = useSubjectsContext();
  const { sections, secDispatch } = useSectionsContext();
  const { actives, activeDispatch } = useActiveStudentsContext();

  const [isloading, setIsLoading] = useState(false);
  // const [students, setStudents] = useState([]);
  const [collection, setCollection] = useState([]);
  const [withData, setWithData] = useState(false);
  const [loginHistory, setLoginHistory] = useState([]);
  const [studentsCount, setStudentsCount] = useState("0");
  const [employeesCount, setEmployeesCount] = useState("0");
  const [subjectsCount, setSubjectsCount] = useState("0");
  const [sectionsCount, setSectionsCount] = useState("0");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    const getOverviewDetails = async () => {
      const controller = new AbortController();
      setIsLoading(true);
      try {
        const apiStud = await axiosPrivate.get("/api/students");
        const apiEmp = await axiosPrivate.get("/api/employees");
        const apiSub = await axiosPrivate.get("/api/subjects", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const apiSec = await axiosPrivate.get("/api/sections", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const apiLoginHistory = await axiosPrivate.get("/api/loginhistories", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (apiStud?.status === 200) {
          const json = await apiStud.data;
          setIsLoading(false);
          studDispatch({ type: "SET_STUDENTS", payload: json });
          setStudentsCount(json.length);
          console.log(json);
        }
        if (apiEmp?.status === 200) {
          const json = await apiEmp.data;
          setIsLoading(false);
          var count = 0;
          for (let x = 0; x < json.length; x++) {
            if (json[x].empType === "teacher") {
              count += 1;
            }
          }
          setEmployeesCount(count);
          empDispatch({ type: "SET_EMPLOYEES", payload: json });
        }
        if (apiSub?.status === 200) {
          const json = await apiSub.data;
          setIsLoading(false);
          subDispatch({ type: "SET_SUBJECTS", payload: json });
          console.log(json);
          setSubjectsCount(json.length);
        }
        if (apiSec?.status === 200) {
          const json = await apiSec.data;
          setIsLoading(false);
          secDispatch({ type: "SET_SECS", payload: json });
          setSectionsCount(json.length);
        }
        if (apiLoginHistory?.status === 200) {
          const json = await apiLoginHistory.data;
          setIsLoading(false);
          setLoginHistory(json);
        }
      } catch (error) {
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getOverviewDetails();
  }, [studDispatch, empDispatch, subDispatch, secDispatch]);

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
      backgroundColor: colors.tableRow[100],
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
      {/* <Button
        type="button"
        onClick={() => {
          refresh();
        }}
      >
        REFRESH
      </Button> */}
      <br />
      {isloading ? (
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            flexDirection="column"
          >
            <Loading />
            <Typography variant="h3">Loading...</Typography>
          </Box>
        </>
      ) : (
        <>
          {" "}
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
            <Typography variant="h4">Recent Students</Typography>
            {/* <Typography>Showing 10 entries</Typography> */}
            <Box sx={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}>
              <TableContainer>
                <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow
                      sx={{ backgroundColor: `${colors.tableHead[100]}` }}
                    >
                      <TableCell>Student ID</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Level</TableCell>
                      <TableCell align="left">Section</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {students &&
                      students.map((val) => {
                        console.log(val.studID);
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
                <Typography variant="h5" marginBottom={2}>
                  Recent Logins
                </Typography>
                <Grid
                  container
                  sx={{ width: "400px" }}
                  spacing={3}
                  direction="column"
                  alignItems="center"
                  justify="center"
                >
                  {loginHistory &&
                    loginHistory.slice(0, 5).map((val, key) => (
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
                              {val.username}
                            </Typography>
                            {/* <Typography
                          color="primaryGray"
                          textTransform="capitalize"
                        >
                          {val.firstName + " " + val.lastName}
                        </Typography>*/}
                            <Typography textTransform="capitalize">
                              {/* console.log(format(new Date(), 'yyyy/MM/dd kk:mm:ss')) */}
                              {format(
                                new Date(val.createdAt),
                                // "kk:mm a  MMM dd, yyyy"
                                "hh:mm a, EEEE"
                              )}
                              {/* {val.createdAt} */}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
};

export default Dashboard;
