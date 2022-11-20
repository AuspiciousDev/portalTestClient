import React from "react";
import { useState, useEffect } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
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
  FormControl,
  TextField,
  TableHead,
  TableCell,
  TableBody,
  InputLabel,
  Select,
  Menu,
  MenuItem,
} from "@mui/material";
import Grades from "../../Grades";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";

import { styled } from "@mui/material/styles";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import { useGradesContext } from "../../../../hooks/useGradesContext";
import { useSubjectsContext } from "../../../../hooks/useSubjectsContext";
import { useSectionsContext } from "../../../../hooks/useSectionContext";
import { useLevelsContext } from "../../../../hooks/useLevelsContext";
import { useDepartmentsContext } from "../../../../hooks/useDepartmentContext";
import { useActiveStudentsContext } from "../../../../hooks/useActiveStudentContext";
import { useSchoolYearsContext } from "../../../../hooks/useSchoolYearsContext";

import useAuth from "../../../../hooks/useAuth";
import GradesTable from "./GradesTable";

const GradesForm = ({ val }) => {
  console.log(val);
  const { auth } = useAuth();
  const [isFormOpen, setIsFormOpen] = useState(true);
  const [quarter1Grade, setQuarter1Grade] = useState();
  const [quarter2Grade, setQuarter2Grade] = useState();
  const [quarter3Grade, setQuarter3Grade] = useState();
  const [quarter4Grade, setQuarter4Grade] = useState();
  const [subjectGrade, setSubjectGrade] = useState();
  const [quarter, setQuarter] = useState();
  const [finalGrade, setFinalGrade] = useState(0);
  const [remarks, setRemarks] = useState("failed");
  const [getStudSubjectID, setStudSubjectID] = useState("");
  const [currYear, setCurrYear] = useState();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const { students, studDispatch } = useStudentsContext();
  const { grades, gradeDispatch } = useGradesContext();
  const { subjects, subDispatch } = useSubjectsContext();
  const { levels, levelDispatch } = useLevelsContext();
  const { departments, depDispatch } = useDepartmentsContext();
  const { sections, secDispatch } = useSectionsContext();
  const { actives, activeDispatch } = useActiveStudentsContext();
  const { years, yearDispatch } = useSchoolYearsContext();
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const handleCellClick = (e) => {
    console.log(e.target.textContent);
  };
  // useEffect(() => {
  //   let finalGrades = 0;

  //   finalGrades =
  //     (Number(quarter1Grade) +
  //       Number(quarter2Grade) +
  //       Number(quarter3Grade) +
  //       Number(quarter4Grade)) /
  //     4;

  //   setFinalGrade(finalGrades);

  //   finalGrades >= 75 ? setRemarks("passed") : setRemarks("failed");
  // }, [quarter1Grade, quarter2Grade, quarter3Grade, quarter4Grade]);

  useEffect(() => {
    years &&
      years
        .filter((fill) => {
          return fill.status === true;
        })
        .map((val) => {
          return setCurrYear(val.schoolYearID);
        });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(auth.username);
    // let username =
    // let schoolYearID = 2023;

    // const allGrades = [
    //   {
    //     quarter1: quarter1Grade,
    //     quarter2: quarter2Grade,
    //     quarter3: quarter3Grade,
    //     quarter4: quarter4Grade,
    //   },
    // ];
    const data = {
      studID: val.studID,
      subjectID: getStudSubjectID,
      schoolYearID: currYear,
      empID: auth.username,
      grade: subjectGrade,
      quarter,
    };
    console.log(data);
    try {
      const response = await axiosPrivate.post(
        "/api/grades/register",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const json = await response.data;
        console.log("response;", json);
        gradeDispatch({ type: "CREATE_GRADE", payload: json });
      }
    } catch (error) {
      if (!error?.response) {
        console.log("no server response");
      } else if (error.response.status === 400) {
        console.log(error.response.data.message);
      } else if (error.response.status === 409) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };
  const StudGradeTableTitles = () => {
    return (
      <TableRow>
        <TableCell align="left">SUBJECT ID</TableCell>
        <TableCell align="left">SUBJECT NAME</TableCell>
        <TableCell align="left">1st </TableCell>
        <TableCell align="left">2nd </TableCell>
        <TableCell align="left">3rd </TableCell>
        <TableCell align="left">4th </TableCell>
        <TableCell align="left">REMARKS</TableCell>
      </TableRow>
    );
  };
  const StudGradeTableDetails = ({ val }) => {
    return (
      <StyledTableRow
        key={val._id}
        data-rowid={val.studID}
        sx={{
          display: "table",
          width: "100%",
          tableLayout: "fixed",
          // "&:last-child td, &:last-child th": { border: 2 },
          // "& td, & th": { border: 2 },
        }}
      >
        {/* Student ID */}
        <TableCell align="left" onClick={handleCellClick}>
          {val.subjectID}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {subjects &&
            subjects
              .filter((sub) => {
                // return console.log(sub.subjectID, val.subjectID);
                return (
                  sub.subjectID.toLowerCase() === val.subjectID.toLowerCase()
                );
              })
              .map((sub) => {
                return sub.subjectName;
              })}
        </TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>
        <TableCell align="left"></TableCell>

        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val?.remark ? "passed" : "failed"}
        </TableCell>
        {/* Student Name */}
      </StyledTableRow>
    );
  };

  return (
    <>
      {!isFormOpen ? (
        <GradesTable />
      ) : (
        <Box
          className="formContainer"
          display="block"
          width="100%"
          height="900px"
          flexDirection="column"
          justifyContent="center"
          mt="15px"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                onClick={() => {
                  setIsFormOpen((o) => !o);
                }}
              >
                <ArrowBackIosNewOutlinedIcon sx={{ fontSize: "50px" }} />
              </IconButton>
              <Box ml="10px">
                <Typography variant="h3" sx={{ textTransform: "capitalize" }}>
                  {students &&
                    students
                      .filter((stud) => {
                        return stud.studID === val.studID;
                      })
                      .map((stud) => {
                        return stud?.middleName
                          ? stud.firstName +
                              " " +
                              stud.middleName +
                              " " +
                              stud.lastName
                          : stud.firstName + " " + stud.lastName;
                      })}
                </Typography>
                <Typography sx={{ textTransform: "capitalize" }}>
                  {val.studID}
                </Typography>
                <Typography sx={{ textTransform: "capitalize" }}>
                  Grade{[" "]}
                  {levels &&
                    levels
                      .filter((lvl) => {
                        // return console.log(lvl.levelID, val.levelID);
                        return lvl.levelID === val.levelID.toLowerCase();
                      })
                      .map((stud) => {
                        return stud.levelNum;
                      })}
                  {[" "]}
                  {sections &&
                    sections
                      .filter((sec) => {
                        // return console.log(lvl.levelID, val.levelID);
                        return sec.sectionID === val.sectionID.toLowerCase();
                      })
                      .map((stud) => {
                        return stud.sectionName;
                      })}
                </Typography>
              </Box>
            </Box>
            <Box>
              <TableContainer>
                <Box mt="10px">
                  <Typography variant="h3">GRADES</Typography>
                </Box>
                <Table aria-label="simple table">
                  <TableHead
                    sx={{
                      display: "table",
                      width: "100%",
                      tableLayout: "fixed",
                    }}
                  >
                    <StudGradeTableTitles key={"asdas"} />
                  </TableHead>
                  <TableBody
                    sx={{
                      display: "block",
                      height: "200px",
                      overflow: "auto",
                    }}
                  >
                    {grades &&
                      grades
                        .filter((grade) => {
                          return grade.studID === val.studID;
                        })
                        .map((val) => {
                          return StudGradeTableDetails({ val });
                        })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            {/* <Box mt="50px">
          <Typography variant="h3">ADD GRADES</Typography>
        </Box> */}
            <form
              style={{
                width: "100%",
                height: "900px",
              }}
              onSubmit={handleSubmit}
            >
              {/* <FormControl>
            <Typography>Subject Code</Typography>
            <TextField variant="outlined" disabled value={"Lorem Ipsum"} />
          </FormControl> */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  width: "200px",
                }}
                gap={1}
              >
                <Box>
                  <Typography>Subject Code</Typography>
                  <FormControl fullWidth>
                    {/* <InputLabel id="demo-simple-select-label">
                Subject Code
              </InputLabel> */}
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={getStudSubjectID}
                      // error={}
                      // label="Subject Code"
                      onChange={(e) => {
                        setStudSubjectID(e.target.value);
                        setQuarter1Grade("");
                        setQuarter2Grade("");
                        setQuarter3Grade("");
                        setQuarter4Grade("");
                      }}
                    >
                      <MenuItem aria-label="None" value="" />
                      {subjects &&
                        subjects
                          .filter((subj) => {
                            return subj.levelID === val.levelID.toLowerCase();
                            // return console.log(
                            //   subj.levelID,
                            //   val.levelID.toLowerCase()
                            // );
                          })
                          .map((val) => {
                            return (
                              <MenuItem value={val?.subjectID}>
                                {val?.subjectID}
                              </MenuItem>
                            );
                          })}
                    </Select>
                  </FormControl>
                </Box>
                <FormControl>
                  <Typography>Subject Name</Typography>
                  <TextField
                    variant="outlined"
                    disabled
                    value={
                      getStudSubjectID &&
                      subjects &&
                      subjects
                        .filter((subj) => {
                          return (
                            subj.subjectID.toLowerCase() ===
                            getStudSubjectID.toLowerCase()
                          );
                          // return console.log(
                          //   subj.subjectID.toLowerCase() ===
                          //     getStudSubjectID.toLowerCase()
                          // );
                        })
                        .map((val2) => {
                          // return console.log(val.subjectName);
                          return val2.subjectName;
                        })
                    }
                  />
                </FormControl>
                <FormControl required>
                  <Typography>Quarter</Typography>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quarter}
                    onChange={(e) => {
                      setQuarter(e.target.value);
                    }}
                  >
                    <MenuItem aria-label="None" value="" />
                    <MenuItem value={1}>Q1</MenuItem>
                    <MenuItem value={2}>Q2</MenuItem>
                    <MenuItem value={3}>Q3</MenuItem>
                    <MenuItem value={4}>Q4</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <Typography>Final Grade</Typography>
                  <TextField
                    variant="outlined"
                    value={subjectGrade}
                    onChange={(e) => {
                      setSubjectGrade(e.target.value);
                    }}
                  />
                </FormControl>

                <div></div>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: { xs: "center", sm: "end" },
                  }}
                  mt="20px"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    sx={{
                      width: { xs: "100%", sm: "200px" },
                      height: "50px",
                    }}
                  >
                    <Typography variant="h6">Confirm</Typography>
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    sx={{
                      width: { xs: "100%", sm: "200px" },
                      height: "50px",
                      ml: { xs: "0", sm: "20px" },
                      mt: { xs: "20px", sm: "0" },
                    }}
                    // onClick={closeModal}
                  >
                    <Typography variant="h6">CANCEL</Typography>
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
};

export default GradesForm;
