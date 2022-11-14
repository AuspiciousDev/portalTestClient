import React from "react";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
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

import { useStudentsContext } from "../../../../hooks/useStudentsContext";
import { useGradesContext } from "../../../../hooks/useGradesContext";
import { useSubjectsContext } from "../../../../hooks/useSubjectsContext";
import { useSectionsContext } from "../../../../hooks/useSectionContext";
import { useLevelsContext } from "../../../../hooks/useLevelsContext";
import { useDepartmentsContext } from "../../../../hooks/useDepartmentContext";
import { useActiveStudentsContext } from "../../../../hooks/useActiveStudentContext";

import { styled } from "@mui/material/styles";
import TopicOutlinedIcon from "@mui/icons-material/TopicOutlined";

import RecordsHistory from "./RecordsHistory";
const RecordTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const [search, setSearch] = useState();
  const [isloading, setIsLoading] = useState(false);
  const { students, studDispatch } = useStudentsContext();
  const { grades, gradeDispatch } = useGradesContext();
  const { subjects, subDispatch } = useSubjectsContext();
  const { levels, levelDispatch } = useLevelsContext();
  const { departments, depDispatch } = useDepartmentsContext();
  const { sections, secDispatch } = useSectionsContext();
  const { actives, activeDispatch } = useActiveStudentsContext();
  const [getData, setData] = useState([]);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: colors.tableRow[100],
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  useEffect(() => {
    const getData = async () => {
      const apiGrade = await axiosPrivate.get("/api/grades", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (apiGrade?.status === 200) {
        const json = await apiGrade.data;
        console.log(json);
        setIsLoading(false);

        gradeDispatch({ type: "SET_GRADES", payload: json });
      }
      const apiActive = await axiosPrivate.get("/api/activestudents", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (apiActive?.status === 200) {
        const json = await apiActive.data;
        console.log(json);
        setIsLoading(false);
        activeDispatch({ type: "SET_ACTIVES", payload: json });
      }
    };
    getData();
  }, [gradeDispatch, activeDispatch]);
  const TableTitles = () => {
    return (
      <TableRow sx={{ backgroundColor: `${colors.darkLightBlue[100]}` }}>
        <TableCell>STUDENT ID </TableCell>
        <TableCell>STUDENT NAME</TableCell>
        <TableCell>SEX</TableCell>
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
              {val.studID}
            </Typography>
          </ButtonBase>
        </TableCell>

        {/* Student Name */}
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
        {/* Student Level */}
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {students &&
            students
              .filter((stud) => {
                return stud.studID === val.studID;
              })
              .map((stud) => {
                return stud.gender;
              })}
        </TableCell>
        {/* Student Department */}

        <TableCell align="left">
          <Paper
            sx={{
              display: "flex",
              width: "30%",
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
                setIsFormOpen(true);
                setData(val);
              }}
            >
              <TopicOutlinedIcon />
              <Typography ml="10px">View Records</Typography>
            </ButtonBase>
          </Paper>
        </TableCell>
      </StyledTableRow>
    );
  };
  return (
    <>
      {!isFormOpen ? (
        <div className="contents-container">
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
              <Typography variant="h2" fontWeight="bold">
                Records
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
                  placeholder="Search Student"
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
                height: "800px",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableTitles />
                </TableHead>
                <TableBody>
                  {search
                    ? students &&
                      students
                        .filter((val) => {
                          return val.studID.includes(search);
                        })
                        .map((val) => {
                          return tableDetails({ val });
                        })
                    : actives &&
                      actives.map((val) => {
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
        </div>
      ) : (
        <RecordsHistory val={getData} />
      )}
    </>
  );
};

export default RecordTable;
