import React from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { useNavigate, useLocation } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Loading from "../../../../global/Loading";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { useDepartmentsContext } from "../../../../hooks/useDepartmentContext";
import { DeleteOutline } from "@mui/icons-material";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import ConfirmDialogue from "../../../../global/ConfirmDialogue";
import SuccessDialogue from "../../../../global/SuccessDialogue";

const DepartmentTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const navigate = useNavigate();
  const location = useLocation();

  const axiosPrivate = useAxiosPrivate();

  const { departments, depDispatch } = useDepartmentsContext();
  const [isloading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const [departmentID, setDepartmentID] = useState("");
  const [depName, setDepName] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState();

  const [departmentIDError, setDepartmentIDError] = useState(false);
  const [depNameError, setDepNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [stat, setStat] = useState();
  const [open, setOpen] = useState(false);

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

  const closeModal = () => {
    setOpen(false);
    setDepartmentID("");
    setDepName("");
    setDescription("");
    setError(false);
    setDepartmentIDError(false);
    setDepNameError(false);
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
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get("/api/departments");
        if (response.status === 200) {
          const json = await response.data;
          console.log(json);
          setIsLoading(false);
          depDispatch({ type: "SET_DEPS", payload: json });
        }
      } catch (error) {
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response.status === 204) {
          console.log(error.response.data.message);
        } else if (error.response.status === 403) {
          navigate("/login", { state: { from: location }, replace: true });
        } else {
          console.log(error);
        }
      }
    };
    getData();
  }, [depDispatch]);

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

    await console.log(newStatus);
    try {
      setIsLoading(true);
      const response = await axiosPrivate.patch(
        "/api/departments/status",
        JSON.stringify({ departmentID: val.departmentID, status: newStatus })
      );
      if (response.status === 200) {
        const json = await response.data;
        console.log(json);
        const response2 = await axiosPrivate.get("/api/departments");
        if (response2?.status === 200) {
          const json = await response2.data;
          console.log(json);
          setIsLoading(false);
          depDispatch({ type: "SET_DEPS", payload: json });
          setSuccessDialog({
            isOpen: true,
            message: "Department has been added!",
          });
        }
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
  function depData(depName, departmentID) {
    return { depName, departmentID };
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      departmentID,
      depName,
      description,
    };
    setIsLoading(true);
    if (!error) {
      try {
        const response = await axiosPrivate.post(
          "/api/departments/register",
          JSON.stringify(data),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 201) {
          const json = await response.data;
          console.log("response;", json);
          depDispatch({ type: "CREATE_DEP", payload: json });
          setOpen(false);
          setSuccessDialog({ isOpen: true });
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response.status === 400) {
          console.log(error.response.data.message);
        } else if (error.response.status === 409) {
          setDepartmentIDError(true);
          setError(true);
          setErrorMessage(error.response.data.message);

          console.log(error.response.data.message);
        } else {
          console.log(error);
        }
      }
    } else {
      console.log(errorMessage);
    }
  };
  const handleDelete = async ({ val }) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    try {
      setIsLoading(true);
      const response = await axiosPrivate.delete("api/departments/delete", {
        headers: { "Content-Type": "application/json" },
        data: val,
        withCredentials: true,
      });
      const json = await response.data;
      if (response.status === 201) {
        console.log(json);
        depDispatch({ type: "DELETE_DEP", payload: json });
        setSuccessDialog({ isOpen: true });
      }

      setIsLoading(false);
    } catch (error) {
      if (!error.response) {
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
        console.log(error.response);
        setIsLoading(false);
      }
    }
  };
  const rows = [
    depData("elementary", "elem"),
    depData("junior highschool", "jhs"),
    depData("senior highschool", "shs"),
    depData("college", "col"),
  ];
  const TableTitles = () => {
    return (
      <TableRow
      //  sx={{ backgroundColor: `${colors.darkLightBlue[100]}` }}
      >
        <TableCell>DEPARTMENT ID</TableCell>
        <TableCell>DEPARTMENT NAME</TableCell>
        <TableCell align="left">DESCRIPTION</TableCell>
        <TableCell align="left">STATUS</TableCell>
        <TableCell align="left">ACTION</TableCell>
      </TableRow>
    );
  };

  const tableDetails = ({ val }) => {
    return (
      <StyledTableRow
        key={val._id}
        data-rowid={val.departmentID}
        sx={
          {
            // "&:last-child td, &:last-child th": { border: 2 },
            // "& td, & th": { border: 2 },
          }
        }
      >
        {/* <TableCell align="left">-</TableCell> */}
        <TableCell align="left" sx={{ textTransform: "uppercase" }}>
          {val?.departmentID || "-"}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {val?.depName || "-"}
        </TableCell>
        <TableCell align="left">{val?.description || "-"}</TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          <ButtonBase
            onClick={() => {
              setConfirmDialog({
                isOpen: true,
                title: `Are you sure to change status of  ${val.departmentID.toUpperCase()}`,
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
            sx={{
              display: "grid",
              width: "50%",
              gridTemplateColumns: " 1fr 1fr 1fr",
            }}
          > */}
          {/* <IconButton sx={{ cursor: "pointer" }}>
              <Person2OutlinedIcon />
            </IconButton> */}

          {/* <UserEditForm user={user} /> */}
          {/* <DeleteRecord delVal={val} /> */}
          {/* </Box> */}
          <Box
            sx={{
              display: "grid",
              width: "50%",
              gridTemplateColumns: " 1fr 1fr 1fr",
            }}
          >
            <IconButton
              sx={{ cursor: "pointer" }}
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: `Are you sure to Department ${val.departmentID.toUpperCase()}`,
                  message: `This action is irreversible!`,
                  onConfirm: () => {
                    handleDelete({ val });
                  },
                });
              }}
            >
              <DeleteOutlineOutlinedIcon
                sx={{ color: colors.error[100] }}
              />
            </IconButton>

            {/* <UserEditForm user={user} /> */}
            {/* <DeleteRecord delVal={val} /> */}
          </Box>
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
            <Typography variant="h5">Are you sure to delete record </Typography>
            <Box margin="20px 0">
              <Typography
                variant="h2"
                fontWeight="bold"
                sx={{ textTransform: "capitalize" }}
              >
                {delVal.departmentID}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                textTransform="capitalize"
              ></Typography>
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

  return (
    <>
      <SuccessDialogue
        successDialog={successDialog}
        setSuccessDialog={setSuccessDialog}
      />
      <ConfirmDialogue
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div
          className="modal-small-form"
          style={{
            backgroundColor: colors.black[900],
            border: `solid 1px ${colors.black[200]}`,
          }}
        >
          <IconButton className="close" onClick={closeModal} disableRipple>
            <CancelIcon />
            {/* <Typography variant="h4">&times;</Typography> */}
          </IconButton>
          <div
            className="header"
            style={{
              backgroundColor: colors.black[900],
              borderBottom: `2px solid ${colors.primary[900]}`,
            }}
          >
            <Typography variant="h3">ADD DEPARTMENT</Typography>
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
                  Department Information
                </Typography>
                <Box marginBottom="50px">
                  <Box
                    sx={{
                      display: "grid",
                      width: "100%",
                      gridTemplateRows: "1fr ",
                      gap: "20px",
                    }}
                  >
                    <FormControl required variant="standard">
                      <InputLabel htmlFor="demo-customized-select-native">
                        Department Name
                      </InputLabel>
                      <NativeSelect
                        required
                        id="demo-customized-select-native"
                        value={depName}
                        onChange={(e) => {
                          setDepName(e.target.value);
                          setDepartmentID("");
                          setError(false);
                          setDepNameError(false);
                          setDepartmentIDError(false);
                          rows
                            .filter((val) => {
                              return val.depName === e.target.value;
                            })
                            .map((data) => {
                              return setDepartmentID(data.departmentID);
                            });
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value={"elementary"}>Elementary</option>
                        <option value={"junior highschool"}>
                          Junior Highschool
                        </option>
                        <option value={"senior highschool"}>
                          Senior Highschool
                        </option>
                        <option value={"college"}>College</option>
                      </NativeSelect>
                    </FormControl>
                    <TextField
                      autoComplete="off"
                      variant="standard"
                      label="Department Code"
                      disabled
                      value={departmentID}
                      error={departmentIDError}
                      onChange={(e) => {
                        setDepartmentID(e.target.value);
                      }}
                    />
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
                  height="70px"
                  sx={{ margin: "20px 0" }}
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
            DEPARTMENT
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
              placeholder="Search Department"
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              value={search}
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
              {search
                ? departments &&
                  departments
                    .filter((val) => {
                      return (
                        val.departmentID.includes(search) ||
                        val.depName.includes(search)
                      );
                    })
                    .map((val) => {
                      return tableDetails({ val });
                    })
                : departments &&
                  departments.map((val) => {
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
    </>
  );
};

export default DepartmentTable;
