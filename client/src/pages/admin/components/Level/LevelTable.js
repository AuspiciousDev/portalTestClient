import React from "react";
import Popup from "reactjs-popup";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  NativeSelect,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AutoStories, DeleteOutline } from "@mui/icons-material";

import Loading from "../../../../global/Loading";
import { useLevelsContext } from "../../../../hooks/useLevelsContext";
import { useDepartmentsContext } from "../../../../hooks/useDepartmentContext";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import axios from "axios";
const LevelTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const axiosPrivate = useAxiosPrivate();

  const { levels, levelDispatch } = useLevelsContext();
  const { departments, depDispatch } = useDepartmentsContext();
  const [search, setSearch] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [levelID, setLevelID] = useState("");
  const [levelNum, setlevelNum] = useState("");
  const [departmentID, setDepartmentID] = useState("");

  const [levelIDError, setLevelIDError] = useState(false);
  const [levelNumError, setLevelNumError] = useState(false);
  const [departmentIDError, setDepartmentIDError] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
    clearInputForms();
  };

  const clearInputForms = () => {
    setLevelID("");
    setlevelNum("");
    setDepartmentID("");
    setError(false);
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: colors.tableRow[100],
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  function lvlData(level, departmentID) {
    return { level, departmentID };
  }

  const rows = [
    lvlData("1", "elem"),
    lvlData("2", "elem"),
    lvlData("3", "elem"),
    lvlData("4", "elem"),
    lvlData("5", "elem"),
    lvlData("6", "elem"),
    lvlData("7", "jhs"),
    lvlData("8", "jhs"),
    lvlData("9", "jhs"),
    lvlData("10", "jhs"),
    lvlData("11", "shs"),
    lvlData("12", "shs"),
    lvlData("1", "col"),
    lvlData("2", "col"),
    lvlData("3", "col"),
    lvlData("4", "col"),
    lvlData("5", "col"),
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get("/api/levels", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response?.status === 200) {
          const json = await response.data;
          setIsLoading(false);
          levelDispatch({ type: "SET_LEVELS", payload: json });
        }
        const apiDep = await axiosPrivate.get("/api/departments", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (apiDep?.status === 200) {
          const json = await apiDep.data;
          setIsLoading(false);
          depDispatch({ type: "SET_DEPS", payload: json });
        }
      } catch (error) {
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response?.status === 204) {
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    };
    getData();
  }, [levelDispatch, depDispatch]);

  const TableTitles = () => {
    return (
      <TableRow 
      sx={{ backgroundColor: `${colors.darkLightBlue[100]}` }}>        <TableCell align="left">LEVEL ID</TableCell>
        <TableCell align="left">LEVEL</TableCell>
        <TableCell align="left">DEPARTMENT</TableCell>
        <TableCell align="left">ACTIVE</TableCell>
        <TableCell align="left">Action</TableCell>
      </TableRow>
    );
  };
  const tableDetails = (val) => {
    return (
      <StyledTableRow key={val._id}>
        <TableCell align="left" sx={{ textTransform: "uppercase" }}>
          {val.levelID}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {val.levelNum}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {departments &&
            departments
              .filter((dep) => {
                return dep.departmentID === val.departmentID;
              })
              .map((val) => {
                return val.depName;
              })}
        </TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val?.active === true ? (
            <Paper
              sx={{
                display: "flex",
                width: "65px",
                p: "5px",
                justifyContent: "center",
                color: colors.yellowAccent[500],
              }}
            >
              ACTIVE
            </Paper>
          ) : (
            <Paper
              sx={{
                display: "flex",
                width: "65px",
                p: "5px",
                justifyContent: "center",
              }}
            >
              INACTIVE
            </Paper>
          )}
        </TableCell>
        <TableCell align="left">
          <Box
            elevation={0}
            sx={{
              display: "grid",
              width: "40%",
              gridTemplateColumns: " 1fr 1fr",
            }}
          >
            {/* <SubjectEditForm data={val} openForm={isFormOpen} /> */}
            <DeleteRecord delVal={val} />
          </Box>
        </TableCell>
      </StyledTableRow>
    );
  };
  const DeleteRecord = ({ delVal }) => (
    <Popup
      trigger={
        <IconButton sx={{ cursor: "pointer" }}>
          <DeleteOutline sx={{ color: colors.red[500] }} />
        </IconButton>
      }
      modal
      nested
    >
      {(close) => (
        <div
          className="modal-delete"
          style={{
            backgroundColor: colors.primary[900],
            border: `solid 1px ${colors.gray[200]}`,
          }}
        >
          <button className="close" onClick={close}>
            &times;
          </button>
          <div
            className="header"
            style={{ backgroundColor: colors.primary[800] }}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.whiteOnly[100] }}
            >
              DELETE RECORD
            </Typography>
          </div>
          <div className="content">
            <Typography variant="h5">Are you sure to delete record</Typography>
            <Box margin="20px 0">
              <Typography
                variant="h2"
                fontWeight="700"
                sx={{ textTransform: "uppercase" }}
              >
                {delVal.levelID}
              </Typography>
              <Typography variant="h4">Level - {delVal.title}</Typography>
            </Box>
          </div>
          <div className="actions">
            <Button
              type="button"
              onClick={() => {
                handleDelete({ delVal });
                close();
              }}
              variant="contained"
              color="secButton"
              sx={{
                width: "150px",
                height: "50px",
                ml: "20px",
                mb: "10px",
              }}
            >
              <Typography variant="h6" sx={{ color: colors.whiteOnly[100] }}>
                Confirm
              </Typography>
            </Button>
            <Button
              type="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
              variant="contained"
              sx={{ width: "150px", height: "50px", ml: "20px", mb: "10px" }}
            >
              <Typography variant="h6" sx={{ color: colors.whiteOnly[100] }}>
                CANCEL
              </Typography>
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      levelID,
      levelNum,
      departmentID,
    };
    console.log(data);

    // if (!levelID) {
    //   setLevelIDError(true);
    // } else {
    //   setLevelIDError(false);
    // }
    // if (!levelNum) {
    //   setLevelNumError(true);
    // } else {
    //   setLevelNumError(false);
    // }
    // if (!departmentID) {
    //   setDepartmentIDError(true);
    // } else {
    //   setDepartmentIDError(false);
    // }

    if (!error) {
      try {
        const response = await axiosPrivate.post(
          "/api/levels/register",
          JSON.stringify(data),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        const json = await response.data;
        if (response?.status === 201) {
          closeModal();
          levelDispatch({ type: "CREATE_LEVEL", payload: json });
          clearInputForms();
          console.log(response.data.message);
        }
      } catch (error) {
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response?.status === 400) {
          console.log(error.response.data.message);
        } else if (error.response?.status === 409) {
          setLevelIDError(true);
          setError(true);
          setErrorMessage(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    } else {
      console.log("Validation Error!");
    }
  };
  const handleDelete = async ({ delVal }) => {
    console.log(delVal);
    try {
      setIsLoading(true);
      const response = await axiosPrivate.delete("/api/levels/delete", {
        headers: { "Content-Type": "application/json" },
        data: delVal,
        withCredentials: true,
      });
      if (response.status === 200) {
        const json = await response.data;
        console.log(json);
        setIsLoading(false);
        levelDispatch({ type: "DELETE_LEVEL", payload: json });
      }
    } catch (error) {
      if (!error?.response) {
        console.log("no server response");
        setIsLoading(false);
      } else if (error.response?.status === 400) {
        console.log(error.response.data.message);
        setIsLoading(false);
      } else if (error.response?.status === 404) {
        console.log(error.response.data.message);
        setIsLoading(false);
      } else {
        console.log(error);
        setIsLoading(false);
      }
    }
  };
  return (
    <>
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
              ADD LEVELS
            </Typography>
          </div>
          <div className="content">
            <Box
              className="formContainer"
              display="block"
              width="100%"
              flexDirection="column"
              justifyContent="center"
            >
              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                {/* <Typography variant="h5">Registration</Typography> */}

                <Typography variant="h5" sx={{ margin: "25px 0 10px 0" }}>
                  Level Information
                </Typography>
                <Box marginBottom="40px">
                  <Box
                    sx={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns: "1fr ",
                      gap: "20px",
                    }}
                  >
                    <TextField
                      required
                      autoComplete="off"
                      variant="filled"
                      label="Level ID"
                      placeholder="Level ID"
                      disabled
                      error={levelIDError}
                      value={levelID}
                      onChange={(e) => {
                        setLevelID(e.target.value);
                        setLevelIDError(false);
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "grid",
                      width: "100%",
                      gridTemplateColumns: "1fr 1fr ",
                      gap: "20px",
                      mt: "20px",
                    }}
                  >
                    <FormControl color="primWhite" required fullWidth>
                      <InputLabel required id="demo-simple-select-label">
                        Department
                      </InputLabel>
                      <NativeSelect
                        color="primWhite"
                        id="demo-simple-select-label"
                        error={departmentIDError}
                        value={departmentID}
                        label="Department"
                        onChange={(e) => {
                          setDepartmentID(e.target.value);
                          setLevelID(e.target.value + levelNum);
                        }}
                      >
                        <option aria-label="None" value="" />
                        {departments &&
                          departments
                            .filter((val) => {
                              return val.active === true;
                            })
                            .map((val) => {
                              return (
                                <option
                                  value={val.departmentID}
                                  style={{
                                    textTransform: "capitalize",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  {val.depName}
                                </option>
                              );
                            })}
                      </NativeSelect>
                    </FormControl>
                    <FormControl color="primWhite" required fullWidth>
                      <InputLabel required id="demo-simple-select-label">
                        Level
                      </InputLabel>
                      <NativeSelect
                        color="primWhite"
                        id="demo-simple-select-label"
                        error={levelNumError}
                        value={levelNum}
                        label="Level"
                        onChange={(e) => {
                          setlevelNum(e.target.value);
                          setLevelIDError(false);
                          setError(false);
                          setLevelID(departmentID + e.target.value);
                        }}
                      >
                        <option aria-label="None" value="" />
                        {rows &&
                          rows
                            .filter((val) => {
                              return val.departmentID === departmentID;
                            })
                            .map((val) => {
                              return (
                                <option
                                  value={val.level}
                                  style={{
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {val.level}
                                </option>
                              );
                            })}
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  <Box display="flex" height="10px">
                    <Typography
                      variant="h5"
                      sx={{ mt: "10px" }}
                      color={colors.red[500]}
                    >
                      {error ? errorMessage : ""}
                    </Typography>
                    {isloading ? <Loading /> : <></>}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="end"
                  height="70px"
                  sx={{ margin: "20px 0" }}
                >
                  <div className="actions">
                    <Button
                      type="submit"
                      variant="contained"
                      color="secButton"
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: colors.whiteOnly[100] }}
                      >
                        Confirm
                      </Typography>
                    </Button>
                    <Button
                      type="button"
                      variant="contained"
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                      onClick={closeModal}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: colors.whiteOnly[100] }}
                      >
                        CANCEL
                      </Typography>
                    </Button>
                  </div>
                </Box>
              </form>
            </Box>
          </div>
        </div>
      </Popup>
      <>
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
              LEVELS
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
                placeholder="Search Level"
                onChange={(e) => {
                  setSearch(e.target.value.toLowerCase());
                }}
              />
              <Divider sx={{ height: 30, m: 1 }} orientation="vertical" />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <Search />
              </IconButton>
            </Paper>
            <Button
              type="button"
              onClick={() => setOpen((o) => !o)}
              variant="contained"
              sx={{ width: "200px", height: "50px", marginLeft: "20px" }}
            >
              <Typography variant="h6" fontWeight="500">
                Add
              </Typography>
            </Button>
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
                {
                  // collection
                  //   .filter((employee) => {
                  //     return employee.firstName === "ing";
                  //   })
                  //   .map((employee) => {
                  //     return tableDetails(employee);
                  //   })
                  search
                    ? levels
                        .filter((data) => {
                          return (
                            data.levelID.includes(search) ||
                            data.levelNum.includes(search) ||
                            data.departmentID.includes(search)
                          );
                        })
                        .map((data) => {
                          return tableDetails(data);
                        })
                    : levels &&
                      levels.slice(0, 8).map((data) => {
                        return tableDetails(data);
                      })
                }
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
            {/* <Typography textTransform="uppercase">
            {console.log(Object.keys(subjects || {}).length)}
            {Object.keys(subjects || {}).length}
          </Typography> */}
            {isloading ? <Loading /> : <></>}
            {Object.keys(levels || {}).length > 0 ? (
              <></> // <Typography textTransform="uppercase">data</Typography>
            ) : (
              <Typography textTransform="uppercase">no data</Typography>
            )}
            {/* {console.log(Object.keys(subjects).length)} */}
            {/* {Object.keys(prop.subjectID).length > 0
            ? console.log("true")
            : console.log("false")} */}
            {/* {subjects.length < 0 ? console.log("true") : console.log("false")} */}
            {/* {Object.key(subjects).length ? (
            <Typography textTransform="uppercase">data</Typography>
          ) : (
            <Typography textTransform="uppercase">no data</Typography>
          )} */}

            {/* <Box
          display="flex"
          width="100%"
          justifyContent="center"
          marginTop="20px"
          marginBottom="20px"
        >
          <Box
            width="200px"
            display="grid"
            gridTemplateColumns="1fr 1fr"
            justifyItems="center"
          >
            <ArrowBackIosNewOutlined color="gray" />
            <ArrowForwardIosOutlined color="gray" />
          </Box>
        </Box> */}
          </Box>

          <Box display="flex" width="100%" marginTop="20px"></Box>
        </Box>
      </>
    </>
  );
};

export default LevelTable;
