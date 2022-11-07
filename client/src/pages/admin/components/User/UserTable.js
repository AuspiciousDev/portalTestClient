import React from "react";
import Popup from "reactjs-popup";
import { useUsersContext } from "../../../../hooks/useUserContext";
import { useEmployeesContext } from "../../../../hooks/useEmployeesContext";

import { useEffect, useState } from "react";
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
} from "@mui/material";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  Search,
} from "@mui/icons-material";
import {
  DriveFileRenameOutline,
  DeleteOutline,
  AccountCircle,
  Person2,
} from "@mui/icons-material";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

import { styled } from "@mui/material/styles";
import Loading from "../../../../global/Loading";
import UserForm from "./UserForm";
import UserEditForm from "./UserEditForm";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import axios from "axios";
const UserTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { users, dispatch } = useUsersContext();
  const { employees, empDispatch } = useEmployeesContext();
  //   const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [isloading, setIsLoading] = useState(false);
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
    const getUsersDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/users", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        const response2 = await axios.get("/api/employees", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response?.status === 200) {
          const json1 = await response.data;
          setIsLoading(false);
          dispatch({ type: "SET_USERS", payload: json1 });
        }
        if (response2?.status === 200) {
          const json2 = await response2.data;
          setIsLoading(false);
          empDispatch({ type: "SET_EMPLOYEES", payload: json2 });
          //   setEmployees(json);
        }
      } catch (error) {
        if (!error?.response) {
          console.log("no server response");
        } else if (error.response?.status === 204) {
          // console.log("Missing Username/Password");
          console.log(error.response.data.message);
          // setErrMsg(error.response.data.message);
        } else {
          console.log(error);
        }
      }

      // if (response.statusText === "OK") {
      //   await setEmployees(response.data);
      //
      //   if (!response.data || response.data.length === 0) {
      //     setWithData(false);
      //     return;
      //   } else {
      //     setWithData(true);
      //   }
      // } else {
      //   return;
      // }
    };
    getUsersDetails();
  }, [dispatch, empDispatch]);

  const DeleteRecord = ({ user, employee }) => (
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
            <Typography variant="h5">Are you sure to delete user </Typography>
            <Box margin="20px 0">
              <Typography variant="h2" fontWeight="bold">
                {user.username}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                textTransform="capitalize"
              >
                {employee?.middleName
                  ? employee.firstName +
                    " " +
                    employee.middleName.charAt(0) +
                    ". " +
                    employee.lastName
                  : employee.firstName + " " + employee.lastName}
              </Typography>
            </Box>
          </div>
          <div className="actions">
            <Button
              type="button"
              onClick={() => {
                handleDelete({ user });
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
  const handleAdd = () => {
    setIsFormOpen(true);
  };
  const handleDelete = async ({ user }) => {
    setIsLoading(true);
    try {
      const response = await axios.delete("/api/users/delete", {
        headers: { "Content-Type": "application/json" },
        data: user,
        withCredentials: true,
      });
      const json = await response.data;
      if (response.ok) {
        console.log(response.data.message);
        dispatch({ type: "DELETE_USER", payload: json });
      }

      const apiUsers = await axios.get("/api/users", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const apiEmp = await axios.get("/api/employees", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (apiUsers?.status === 200) {
        const userJSON = await apiUsers.data;
        console.log(userJSON);
        setIsLoading(false);
        dispatch({ type: "SET_USERS", payload: userJSON });
      }
      if (apiEmp?.status === 200) {
        const userEMP = await apiEmp.data;
        console.log(userEMP);
        setIsLoading(false);
        empDispatch({ type: "SET_EMPLOYEES", payload: userEMP });
      }
      setIsLoading(false);
    } catch (error) {
      if (!error?.response) {
        console.log("no server response");
        setIsLoading(false);
      } else if (error.response?.status === 204) {
        console.log(error.response.data.message);
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
  const TableTitles = () => {
    return (
      <TableRow sx={{ backgroundColor: `${colors.tableHead[100]}` }}>
        {/* <TableCell align="left"></TableCell> */}
        <TableCell>USERNAME</TableCell>
        <TableCell>NAME</TableCell>
        <TableCell align="left">EMAIL</TableCell>
        <TableCell align="left">TYPE</TableCell>
        <TableCell align="left">ACTION</TableCell>
      </TableRow>
    );
  };
  const tableDetails = ({ user, result }) => {
    return (
      <StyledTableRow
        key={user._id}
        data-rowid={user.username}
        sx={
          {
            // "&:last-child td, &:last-child th": { border: 2 },
            // "& td, & th": { border: 2 },
          }
        }
      >
        {/* <TableCell align="left">-</TableCell> */}
        <TableCell align="left">{user?.username || "-"}</TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {result?.middleName
            ? result?.firstName +
              " " +
              result?.middleName.charAt(0) +
              ". " +
              result?.lastName
            : result?.firstName + " " + result?.lastName}
        </TableCell>
        <TableCell align="left">{result.email}</TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {user.roles.map((item, i) => {
            return (
              <ul style={{ padding: "0", listStyle: "none" }}>
                {item === 2000 ? (
                  <li>Admin</li>
                ) : item === 2001 ? (
                  <li> Teacher</li>
                ) : item === 2003 ? (
                  <li> Student</li>
                ) : (
                  <></>
                )}
              </ul>
            );
          })}
        </TableCell>
        <TableCell align="left">
          <Box
            sx={{
              display: "grid",
              width: "50%",
              gridTemplateColumns: " 1fr 1fr 1fr",
            }}
          >
            <IconButton sx={{ cursor: "pointer" }}>
              <Person2OutlinedIcon />
            </IconButton>
            {/* <UserEditForm user={user} /> */}
            <DeleteRecord user={user} employee={result} />
          </Box>
        </TableCell>
      </StyledTableRow>
    );
  };
  return (
    <>
      {isFormOpen ? (
        <UserForm />
      ) : (
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
                USERS
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
                  placeholder="Search User"
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
              <Button
                type="button"
                onClick={handleAdd}
                variant="contained"
                sx={{ width: "200px", height: "50px", marginLeft: "20px" }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Add
                </Typography>
              </Button>
            </Box>
          </Box>
          <Box width="100%">
            <TableContainer
              sx={{
                height: "700px",
              }}
            >
              <Table aria-label="simple table">
                <TableHead>
                  <TableTitles />
                </TableHead>
                <TableBody>
                  {
                    search
                      ? employees &&
                        users &&
                        users
                          .filter((user) => {
                            return user.username.includes(search);
                          })

                          .map((user) => {
                            const result = employees.find(
                              (uuid) => uuid.empID === user.username
                            );
                            return tableDetails({ user, result });
                          })
                      : employees &&
                        users &&
                        users.map((user) => {
                          const result = employees.find(
                            (uuid) => uuid.empID === user.username
                          );
                          return tableDetails({ user, result });
                        })
                    // collection
                    //   .filter((employee) => {
                    //     return employee.firstName === "ing";
                    //   })
                    //   .map((employee) => {
                    //     return tableDetails(employee);
                    //   })
                    // (console.log(search),
                    // search
                    //   ? employees
                    //       .filter((data) => {
                    //         return (
                    //           data.firstName.includes(search) ||
                    //           data.empID.includes(search)
                    //         );
                    //       })
                    //       .map((data) => {
                    //         return tableDetails(data);
                    //       })
                    //   : employees &&
                    //     employees.slice(0, 8).map((data) => {
                    //       return tableDetails(data);
                    //     }))
                    // (collection.filter((employee) => {
                    //   return employee.empID === 21923595932985;
                    // }),
                    // (console.log(
                    //   "🚀 ~ file: EmployeeTable.js ~ line 526 ~ EmployeeTable ~ collection",
                    //   collection
                    // ),
                    // collection &&
                    //   collection.slice(0, 8).map((employee) => {
                    //     return tableDetails(employee);
                    //   })))
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
              {/* {withData ? (
            <Typography textTransform="capitalize">data</Typography>
          ) : (
            <Typography textTransform="capitalize">no data</Typography>
          )} */}
              {isloading ? <Loading /> : <></>}
              {/* {Object.keys(employees || {}).length > 0 ? (
                <></> // <Typography textTransform="uppercase">data</Typography>
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
      )}
    </>
  );
};

export default UserTable;
