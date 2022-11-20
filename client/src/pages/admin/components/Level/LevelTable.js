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
  ButtonBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { AutoStories, DeleteOutline } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";

import Loading from "../../../../global/Loading";
import { useLevelsContext } from "../../../../hooks/useLevelsContext";
import { useDepartmentsContext } from "../../../../hooks/useDepartmentContext";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";

import ConfirmDialogue from "../../../../global/ConfirmDialogue";
import SuccessDialogue from "../../../../global/SuccessDialogue";
import ErrorDialogue from "../../../../global/ErrorDialogue";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
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

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [successDialog, setSuccessDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });

  const clearInputForms = () => {
    setLevelID("");
    setlevelNum("");
    setDepartmentID("");
    setError(false);
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      // backgroundColor: colors.tableRow[100],
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
        if (response.status === 200) {
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
        } else if (error.response.status === 204) {
          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    };
    getData();
  }, [levelDispatch, depDispatch]);
  const toggleStatus = async ({ val }) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    let newStatus = val.status;
    val.status === true
      ? (newStatus = false)
      : val.status === false
      ? (newStatus = true)
      : (newStatus = false);

    await console.log(val);
    await console.log(newStatus);
    try {
      setIsLoading(true);
      const response = await axiosPrivate.patch(
        "/api/levels/status",
        JSON.stringify({ levelID: val.levelID, status: newStatus })
      );
      if (response.status === 200) {
        const json = await response.data;
        console.log(json);
        const response2 = await axiosPrivate.get("/api/levels");
        if (response2?.status === 200) {
          const json = await response2.data;
          console.log(json);
          setIsLoading(false);
          levelDispatch({ type: "SET_LEVELS", payload: json });
          setSuccessDialog({ isOpen: true });
        }
      }
    } catch (error) {
      if (!error?.response) {
        console.log("no server response");
      } else if (error.response.status === 400) {
        console.log(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };
  const TableTitles = () => {
    return (
      <TableRow
      // sx={{ backgroundColor: `${colors.darkLightBlue[100]}` }}
      >
        <TableCell align="left">LEVEL ID</TableCell>
        <TableCell align="left">LEVEL</TableCell>
        <TableCell align="left">DEPARTMENT</TableCell>
        <TableCell align="left">STATUS</TableCell>
        <TableCell align="left">ACTION</TableCell>
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
          <ButtonBase
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: `Are you sure to change status of  ${val.levelID.toUpperCase()}`,
                message: `${
                  val.status === true
                    ? "INACTIVE to ACTIVE"
                    : " ACTIVE to INACTIVE"
                }`,
                onConfirm: () => {
                  toggleStatus({ val });
                },
              });
            }}
          >
            {val?.status === true ? (
              <Paper
                sx={{
                  display: "flex",
                  p: "5px 15px",
                  justifyContent: "center",
                  backgroundColor: colors.primary[900],
                  color: colors.whiteOnly[100],
                }}
              >
                ACTIVE
              </Paper>
            ) : (
              <Paper
                sx={{
                  display: "flex",
                  p: "5px 10px",
                  justifyContent: "center",
                }}
              >
                INACTIVE
              </Paper>
            )}
          </ButtonBase>
        </TableCell>
        <TableCell align="left">
          {/* <Box
            elevation={0}
            sx={{
              display: "grid",
              width: "40%",
              gridTemplateColumns: " 1fr 1fr",
            }}
          > */}
          {/* <SubjectEditForm data={val} openForm={isFormOpen} /> */}
          {/* <DeleteRecord delVal={val} /> */}
          {/* </Box> */}
          <IconButton
            sx={{ cursor: "pointer" }}
            onClick={() => {
              console.log(val.levelID);
              setConfirmDialog({
                isOpen: true,
                title: `Are you sure to delete level ${val.levelID.toUpperCase()}`,
                message: `This action is irreversible!`,
                onConfirm: () => {
                  handleDelete({ val });
                },
              });
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{ color: colors.error[100] }} />
          </IconButton>
        </TableCell>
      </StyledTableRow>
    );
  };
  const DeleteRecord = ({ delVal }) => (
    <Popup
      trigger={
        <IconButton sx={{ cursor: "pointer" }}>
          <DeleteOutline sx={{ color: colors.secondary[500] }} />
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
            border: `solid 1px ${colors.black[200]}`,
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
    setIsLoading(true);
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
        if (response.status === 201) {
          closeModal();
          levelDispatch({ type: "CREATE_LEVEL", payload: json });
          clearInputForms();
          console.log(response.data.message);
          setIsLoading(false);
          setSuccessDialog({
            isOpen: true,
            message: "A new level has been added!",
          });
        }
      } catch (error) {
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response.status === 400) {
          console.log(error.response.data.message);
        } else if (error.response.status === 409) {
          setLevelIDError(true);
          setError(true);
          setErrorMessage(error.response.data.message);
        } else {
          console.log(error);
        }
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      console.log("Validation Error!");
    }
  };
  const handleDelete = async ({ val }) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      setIsLoading(true);
      const response = await axiosPrivate.delete("/api/levels/delete", {
        headers: { "Content-Type": "application/json" },
        data: val,
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
      } else if (error.response.status === 400) {
        console.log(error.response.data.message);
        setIsLoading(false);
      } else if (error.response.status === 404) {
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
      <ConfirmDialogue
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <SuccessDialogue
        successDialog={successDialog}
        setSuccessDialog={setSuccessDialog}
      />
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div
          className="modal-small-form"
          style={{
            border: `solid 1px ${colors.black[200]}`,
            backgroundColor: colors.black[900],
          }}
        >
          <IconButton className="close" onClick={closeModal} disableRipple>
            <CancelIcon />
            {/* <Typography variant="h4">&times;</Typography> */}
          </IconButton>
          <Box
            className="header"
            sx={{ borderBottom: `2px solid ${colors.primary[900]}` }}
          >
            <Typography variant="h3">ADD LEVELS</Typography>
          </Box>
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
                    <FormControl required fullWidth>
                      <InputLabel required id="demo-simple-select-label">
                        Department
                      </InputLabel>
                      <NativeSelect
                        id="demo-simple-select-label"
                        error={departmentIDError}
                        value={departmentID}
                        label="Department"
                        onChange={(e) => {
                          setError(false);
                          setDepartmentIDError(false);
                          setLevelIDError(false);
                          setDepartmentID(e.target.value);
                          setLevelID("");
                          setlevelNum("");
                        }}
                      >
                        <option aria-label="None" value="" />
                        {departments &&
                          departments
                            .filter((val) => {
                              return val.status === true;
                            })
                            .map((val) => {
                              return (
                                <option
                                  key={val._id}
                                  value={val.departmentID}
                                  style={{
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {val.depName}
                                </option>
                              );
                            })}
                      </NativeSelect>
                    </FormControl>
                    <FormControl required fullWidth>
                      <InputLabel required id="demo-simple-select-label">
                        Level
                      </InputLabel>
                      <NativeSelect
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
                                  key={val.level}
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
                      color={colors.error[100]}
                    >
                      {error ? errorMessage : ""}
                    </Typography>
                    {isloading ? <Loading /> : <></>}
                  </Box>
                </Box>
                <Box
                  display="flex"
                  justifyContent="end"
                  sx={{ margin: "40px 0 20px 0" }}
                >
                  <div className="actions">
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      sx={{
                        width: "200px",
                        height: "50px",
                        marginLeft: "20px",
                      }}
                    >
                      <Typography variant="h6">Confirm</Typography>
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
              startIcon={<AddIcon />}
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
                {/* {levels &&
                  levels
                    .filter((lvl) => {
                      return lvl.status === true;
                    })
                    .map((val) => {
                      return tableDetails(val);
                    })} */}

                {search
                  ? departments &&
                    levels &&
                    levels
                      .filter((val) => {
                        const res = departments
                          .filter((dep) => {
                            return (
                              val.departmentID === dep.departmentID &&
                              dep.status === true &&
                              val.levelID.includes(search)
                            );
                          })
                          .map((val) => {
                            return val.departmentID;
                          });
                        return res[0] === val.departmentID;
                      })
                      .map((data) => {
                        return tableDetails(data);
                      })
                  : departments &&
                    levels &&
                    levels
                      .filter((val) => {
                        const res = departments
                          .filter((dep) => {
                            return (
                              val.departmentID === dep.departmentID &&
                              dep.status === true
                            );
                          })
                          .map((val) => {
                            return val.departmentID;
                          });
                        return res[0] === val.departmentID;
                      })
                      .map((data) => {
                        return tableDetails(data);
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
