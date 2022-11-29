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
  TablePagination,
  Paper,
  Card,
  Divider,
  Button,
} from "@mui/material";
import {
  AutoStories,
  Diversity3,
  Badge,
  Groups,
  AccountCircle,
  StairsOutlined
} from "@mui/icons-material";
import { format } from "date-fns-tz";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { styled } from "@mui/material/styles";
import { useStudentsContext } from "../../hooks/useStudentsContext";
import { useEmployeesContext } from "../../hooks/useEmployeesContext";
import { useSubjectsContext } from "../../hooks/useSubjectsContext";
import { useSectionsContext } from "../../hooks/useSectionContext";
import { useActiveStudentsContext } from "../../hooks/useActiveStudentContext";
import { useLevelsContext } from "../../hooks/useLevelsContext";
import Charts from "react-apexcharts";
import Loading from "../../global/Loading";
import useRefreshToken from "../../hooks/useRefreshToken";
const TeacherDashboard = () => {
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
  const { levels, levelDispatch } = useLevelsContext();
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    "&.MuiPaper-root ": {
      color: `${colors.black[100]}`,
      display: "flex",
      flexDirection: "column",
      borderRadius: 5,
      padding: "10px",
    },
  }));

  useEffect(() => {
    const getOverviewDetails = async () => {
      const controller = new AbortController();
      setIsLoading(true);
      try {
        const apiStud = await axiosPrivate.get("/api/students");
        const apiEmp = await axiosPrivate.get("/api/employees");
        const apiSub = await axiosPrivate.get("/api/subjects");
        const apiActive = await axiosPrivate.get("/api/enrolled");
        if (apiActive.status === 200) {
          const json = await apiActive.data;
          console.log(json);
          activeDispatch({ type: "SET_ACTIVES", payload: json });
        }
        const apiSec = await axiosPrivate.get("/api/sections");
        const apiLoginHistory = await axiosPrivate.get("/api/loginhistories");
        if (apiStud.status === 200) {
          const json = await apiStud.data;
          studDispatch({ type: "SET_STUDENTS", payload: json });
          setStudentsCount(json.length);
          console.log(json);
        }
        const apiLevel = await axiosPrivate.get("/api/levels");
        if (apiLevel?.status === 200) {
          const json = await apiLevel.data;

          levelDispatch({ type: "SET_LEVELS", payload: json });
        }

        if (apiEmp?.status === 200) {
          const json = await apiEmp.data;
          console.log(json);
          var count = 0;
          for (let x = 0; x < json.length; x++) {
            const empTypeCount = json[x].empType.length;
            for (let z = 0; z < empTypeCount; z++) {
              if (json[x].empType[z] === 2002) {
                count += 1;
              }
            }
          }
          setEmployeesCount(count);
          empDispatch({ type: "SET_EMPLOYEES", payload: json });
        }

        if (apiSub?.status === 200) {
          const json = await apiSub.data;
          subDispatch({ type: "SET_SUBJECTS", payload: json });
          console.log(json);
          setSubjectsCount(json.length);
        }
        if (apiSec?.status === 200) {
          const json = await apiSec.data;
          secDispatch({ type: "SET_SECS", payload: json });
          setSectionsCount(json.length);
        }
        if (apiLoginHistory?.status === 200) {
          const json = await apiLoginHistory.data;
          setLoginHistory(json);
        }
        setIsLoading(false);
      } catch (error) {
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response.status === 204) {
          console.log(error.response.data.message);
        } else if (error.response.status === 401) {
          navigate("/login", { state: { from: location }, replace: true });
          console.log(error.response.data.message);
        }
      }
    };
    getOverviewDetails();
  }, [studDispatch, empDispatch, subDispatch, secDispatch]);

  const tableDetails = ({ val }) => {
    return (
      <StyledTableRow key={val._id} data-rowid={val.departmentID}>
        <TableCell align="left" sx={{ textTransform: "uppercase" }}>
          {val?.studID || "-"}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {students &&
            students
              .filter((stud) => {
                return stud.studID === val.studID;
              })
              .map((stud) => {
                return stud?.middleName
                  ? stud.firstName + " " + stud.middleName + " " + stud.lastName
                  : stud.firstName + " " + stud.lastName;
              })}
        </TableCell>
        <TableCell align="left">
          {levels &&
            levels
              .filter((lev) => {
                return lev.levelID === val.levelID.toLowerCase();
              })
              .map((val) => {
                return val.levelNum;
              })}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {sections &&
            sections
              .filter((lev) => {
                return lev.sectionID === val.sectionID.toLowerCase();
              })
              .map((sec) => {
                return sec.sectionName;
              })}
        </TableCell>
      </StyledTableRow>
    );
  };

  const totalStudents = (
    <StyledPaper elevation={2}>
      {" "}
      {/* <Charts type="line" options={options} series={series} width={380} /> */}
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
    </StyledPaper>
  );
  const totalSubjects = (
    <StyledPaper elevation={2}>
      <AutoStories sx={{ fontSize: "80px", alignSelf: "center" }} />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        {employeesCount}
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Subjects
      </Typography>
    </StyledPaper>
  );
  const totalLevels = (
    <StyledPaper elevation={2}>
      <StairsOutlined sx={{ fontSize: "80px", alignSelf: "center" }} />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        {subjectsCount}
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Levels
      </Typography>
    </StyledPaper>
  );
  const totalSections = (
    <StyledPaper elevation={2}>
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
    </StyledPaper>
  );
  const StyledTableHeadRow = styled(TableRow)(({ theme }) => ({
    " & th": {
      fontWeight: "bold",
    },
    // hide last border
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: colors.tableRow[100],
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div className="contents-container">
      {" "}
      <Box
        sx={{ width: "100%", height: { xs: "800px", sm: "100%" }, mt: "20px" }}
      >
        <Paper
          elevation={2}
          sx={{
            width: "100%",
            margin: "0 0 10px 0",
            padding: { xs: "10px", sm: "0 10px" },
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: { sm: "end" },
                justifyContent: { xs: "center", sm: "start" },
                m: { xs: "20px 0" },
              }}
            >
              <Typography variant="h2" fontWeight="bold">
                DASHBOARD
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Box width="100%" mt={1} marginBottom={2}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", sm: "1fr 1fr 1fr 1fr" },
            }}
            gap={2}
          >
            <Box>{totalStudents}</Box>
            <Box>{totalSubjects}</Box>
            <Box>{totalLevels}</Box>
            <Box>{totalSections}</Box>
          </Box>
        </Box>

        <Box height="550px" sx={{ paddingBottom: "10px" }}>
          {/* <Typography variant="h4">Recent Students</Typography>
  <Typography>Showing 10 entries</Typography> */}

          <Box
            height="520px"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "7fr" },
            }}
          >
            <Paper elevation={2} sx={{ padding: "20px" }}>
              <Box>
                <Typography variant="h4">Recent Students</Typography>
                {/* <Typography>Showing 10 entries</Typography> */}
                <TableContainer>
                  <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                    <TableHead>
                      <StyledTableHeadRow>
                        <TableCell>Student ID</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Level</TableCell>
                        <TableCell align="left">Section</TableCell>
                      </StyledTableHeadRow>
                    </TableHead>
                    <TableBody>
                      {actives &&
                        actives
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((val) => {
                            return tableDetails({ val });
                          })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Divider />
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={actives && actives.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default TeacherDashboard;
