import React from "react";
import axios from "axios";
import Popup from "reactjs-popup";
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
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Loading from "../../../../global/Loading";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { useDepartmentsContext } from "../../../../hooks/useDepartmentContext";
import { DeleteOutline } from "@mui/icons-material";
const DepartmentTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { departments, depDispatch } = useDepartmentsContext();
  const [isloading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(true);

  const [departmentID, setDepartmentID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [search, setSearch] = useState();

  const [departmentIDError, setDepartmentIDError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
    setDepartmentID("");
    setTitle("");
    setDescription("");
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
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/departments", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response?.status === 200) {
          const json = await response.data;
          console.log(json);
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
  }, [depDispatch]);

  function depData(departmentID, title) {
    return { departmentID, title };
  }

  const rows = [
    depData("elementary", "elem"),
    depData("junior highschool", "jhs"),
    depData("senior highschool", "shs"),
    depData("college", "col"),
  ];
  const TableTitles = () => {
    return (
      <TableRow sx={{ backgroundColor: `${colors.tableHead[100]}` }}>
        <TableCell>DEPARTMENT ID</TableCell>
        <TableCell>TITLE</TableCell>
        <TableCell align="left">DESCRIPTION</TableCell>
        <TableCell align="left">ACTIVE</TableCell>
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
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val?.departmentID || "-"}
        </TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "uppercase" }}
        >
          {val?.title || "-"}
        </TableCell>
        <TableCell align="left">{val?.description || "-"}</TableCell>
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
            sx={{
              display: "grid",
              width: "50%",
              gridTemplateColumns: " 1fr 1fr 1fr",
            }}
          >
            {/* <IconButton sx={{ cursor: "pointer" }}>
              <Person2OutlinedIcon />
            </IconButton> */}

            {/* <UserEditForm user={user} /> */}
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
      departmentID,
      title,
      description,
    };
    setIsLoading(true);
    if (!error) {
      try {
        const response = await axios.post(
          "/api/departments/register",
          JSON.stringify(data),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response?.status === 201) {
          const json = await response.data;
          console.log("response;", json);
          depDispatch({ type: "CREATE_DEP", payload: json });
          setOpen(false);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response?.status === 400) {
          console.log(error.response.data.message);
        } else if (error.response?.status === 409) {
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
  const handleDelete = async ({ delVal }) => {
    try {
      setIsLoading(true);
      const response = await axios.delete("/api/departments/delete", {
        headers: { "Content-Type": "application/json" },
        data: delVal,
        withCredentials: true,
      });
      const json = await response.data;
      if (response?.status === 201) {
        console.log(json);
        depDispatch({ type: "DELETE_DEP", payload: json });
      }

      setIsLoading(false);
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
              ADD DEPARTMENT
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
                    <FormControl color="primWhite" variant="standard">
                      <InputLabel htmlFor="demo-customized-select-native">
                        Department Name
                      </InputLabel>
                      <NativeSelect
                        color="primWhite"
                        id="demo-customized-select-native"
                        value={departmentID}
                        onChange={(e) => {
                          setDepartmentID(e.target.value);
                          setError(false);
                          setDepartmentIDError(false);
                          rows
                            .filter((val) => {
                              return val.departmentID === e.target.value;
                            })
                            .map((data) => {
                              return setTitle(data.title);
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
                      color="primWhite"
                      autoComplete="off"
                      variant="standard"
                      label="Department Code"
                      disabled
                      value={title}
                      error={titleError}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
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
            onClick={() => setOpen((o) => !o)}
            variant="contained"
            sx={{ width: "200px", height: "50px", marginLeft: "20px" }}
          >
            <Typography color="white" variant="h6" fontWeight="500">
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
                        val.title.includes(search)
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
