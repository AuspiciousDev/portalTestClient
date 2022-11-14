import { React, useState } from "react";
import RecordTable from "./RecordTable";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Divider,
  NativeSelect,
  FormControl,
  TextField,
  InputLabel,
  ButtonBase,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import Loading from "../../../../global/Loading";
import { format } from "date-fns-tz";
import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import { useGradesContext } from "../../../../hooks/useGradesContext";
import { useSubjectsContext } from "../../../../hooks/useSubjectsContext";
import { useSectionsContext } from "../../../../hooks/useSectionContext";
import { useLevelsContext } from "../../../../hooks/useLevelsContext";
import { useDepartmentsContext } from "../../../../hooks/useDepartmentContext";
import { useActiveStudentsContext } from "../../../../hooks/useActiveStudentContext";
import { useSchoolYearsContext } from "../../../../hooks/useSchoolYearsContext";

import Popup from "reactjs-popup";

import { styled } from "@mui/material/styles";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";

const RecordsHistory = ({ val }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const [isFormOpen, setIsFormOpen] = useState(true);
  const [isGradesOpen, setIsGradesOpen] = useState(false);
  const [getID, setID] = useState("");

  const [search, setSearch] = useState();
  const [isloading, setIsLoading] = useState(false);
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
      backgroundColor: colors.tableRow[100],
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };
  const handleCellClick = (e) => {
    console.log(e.target.textContent);
  };

  const TableTitles = () => {
    return (
      <TableRow sx={{ backgroundColor: `${colors.darkLightBlue[100]}` }}>
        <TableCell>SCHOOL YEAR ID</TableCell>
        <TableCell>SCHOOL YEAR </TableCell>
        <TableCell>ENROLLED DATE</TableCell>
        <TableCell align="left">ACTION</TableCell>
      </TableRow>
    );
  };
  const tableDetails = ({ val }) => {
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
        {/* Student ID */}
        <TableCell align="left">
          <ButtonBase
            onClick={() => {
              // setOpen((o) => !o);
              // setID(val.studID);
            }}
          >
            <Typography
              sx={{ fontWeight: "bold", color: colors.darkWhiteBlue[100] }}
            >
              {val.schoolYearID}
            </Typography>
          </ButtonBase>
        </TableCell>

        {/* Student Name */}
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {years &&
            years
              .filter((fill) => {
                return fill.schoolYearID === val.schoolYearID;
              })
              .map((val) => {
                return val.title;
              })}
        </TableCell>
        {/* Student Level */}
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {format(
            new Date(
              actives &&
                actives
                  .filter((fill) => {
                    return fill.studID === val.studID;
                  })
                  .map((val) => {
                    return val.createdAt;
                  })
            ),
            "hh:mm a - MMM dd, yyyy"
            // "hh:mm a, EEEE"
          )}
        </TableCell>
        {/* Student Department */}

        <TableCell align="left">
          <Paper
            sx={{
              display: "flex",
              width: "40%",
              p: "5px",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            {/* <IconButton sx={{ cursor: "pointer" }}> */}
            {/* <Person2 /> */}
            {/* </IconButton> */}
            {/* {console.log(val)} */}
            {/* <StudentEditForm data={val} /> */}
            {/* <DeleteRecord val={val} /> */}
            <ButtonBase
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setOpen(true);
                setID(val.studID);
              }}
            >
              <TopicOutlinedIcon />
              <Typography ml="10px">View Grades</Typography>
            </ButtonBase>
          </Paper>
        </TableCell>
      </StyledTableRow>
    );
  };
  const GradeTableTitles = () => {
    return (
      <TableRow sx={{ backgroundColor: `${colors.darkLightBlue[100]}` }}>
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
  const GradeTableDetails = ({ val }) => {
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
        <TableCell align="left">
          {val.allGrades.map((val) => {
            return val.quarter1;
          })}
        </TableCell>
        <TableCell align="left">
          {val.allGrades.map((val) => {
            return val.quarter2;
          })}
        </TableCell>
        <TableCell align="left">
          {val.allGrades.map((val) => {
            return val.quarter3;
          })}
        </TableCell>
        <TableCell align="left">
          {val.allGrades.map((val) => {
            return val.quarter4;
          })}
        </TableCell>

        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val?.remark ? "passed" : "failed"}
        </TableCell>
        {/* Student Name */}
      </StyledTableRow>
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <>
      {isFormOpen ? (
        <Box m="0 50px">
          <Popup open={open} closeOnDocumentClick onClose={closeModal}>
            <div
              className="modal-small-form"
              style={{
                backgroundColor: colors.primary[900],
                border: `solid 1px ${colors.gray[200]}`,
              }}
            >
              <button
                className="close"
                onClick={closeModal}
                style={{
                  background: colors.yellowAccent[500],
                }}
              >
                <Typography variant="h4" sx={{ color: colors.whiteOnly[100] }}>
                  &times;
                </Typography>
              </button>
              <div
                className="header"
                style={{ backgroundColor: colors.primary[800] }}
              >
                <Typography variant="h3" sx={{ color: colors.whiteOnly[100] }}>
                  GRADES
                </Typography>
              </div>
              <div className="content">
                <Box
                  className="formContainer"
                  display="block"
                  width="100%"
                  flexDirection="column"
                  justifyContent="center"
                  margin="10px 10px"
                >
                  <Typography>
                    Student ID : {[" "]} {getID}
                  </Typography>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    Student Name : {[" "]}
                    {students &&
                      students
                        .filter((val) => {
                          return val.studID === getID;
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
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableHead>
                        <GradeTableTitles key={"asdas"} />
                      </TableHead>
                      <TableBody>
                        {grades &&
                          grades
                            .filter((grade) => {
                              return grade.studID === getID;
                            })
                            .map((val) => {
                              return GradeTableDetails({ val });
                            })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </div>
            </div>
          </Popup>

          <Box>
            <IconButton
              variant="contained"
              type="button"
              onClick={() => {
                setIsFormOpen((val) => !val);
              }}
            >
              <ArrowBackIosNewOutlinedIcon sx={{ fontSize: "50px" }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: " 1fr 1fr",
              margin: "10px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
              }}
            >
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{ textTransform: "capitalize" }}
              >
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
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  width: "320px",
                  height: "50px",
                  minWidth: "250px",
                  alignItems: "center",
                  justifyContent: "center",
                  p: "0 20px",
                  mr: "10px",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search School Year"
                  onChange={(e) => {
                    setSearch(e.target.value.toLowerCase());
                  }}
                  value={search}
                />
                <Divider sx={{ height: 30, m: 1 }} orientation="vertical" />
                <IconButton
                  type="button"
                  sx={{ p: "10px" }}
                  aria-label="search"
                >
                  <Search />
                </IconButton>
              </Paper>
            </Box>
          </Box>
          <Box width="100%">
            <TableContainer
              sx={{
                height: "400px",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableTitles />
                </TableHead>
                <TableBody>
                  {actives &&
                    actives
                      .filter((fill) => {
                        return fill.studID === val.studID;
                      })
                      .map((val) => {
                        return tableDetails({ val });
                      })}

                  {actives &&
                    grades &&
                    grades
                      .filter((val) => {
                        const res = actives
                          .filter((red) => {
                            // return (
                            //   console.log("actives: ", red.studID),
                            //   console.log("grades: ", val.studID),
                            //   console.log("actives: ", red.schoolYearID),
                            //   console.log("grades: ", val.schoolYearID)
                            // );
                            return (
                              red.studID === val.studID &&
                              red.schoolYearID === val.schoolYearID
                            );
                          })
                          .map((rel) => {
                            return rel.studID;
                          });
                        return (
                          val.studID === res[0]

                          //   console.log("actives: ", val.studID),
                          //   console.log("grades: ", res[0])
                        );
                      })
                      .map((val) => {
                        return tableDetails({ val });
                      })}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              display="flex"
              width="100%"
              sx={{ flexDirection: "column" }}
              justifyContent="center"
              alignItems="center"
            >
              {isloading ? <Loading /> : <></>}
            </Box>
          </Box>
        </Box>
      ) : (
        <RecordTable />
      )}
    </>
  );
};

export default RecordsHistory;
