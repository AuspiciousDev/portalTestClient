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
          console.log(json1);
          setIsLoading(false);
          dispatch({ type: "SET_USERS", payload: json1 });
        }
        if (response2?.status === 200) {
          const json2 = await response2.data;
          console.log(json2);
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

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

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
            border: `solid 3px ${colors.gray[200]}`,
          }}
        >
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">
            <Typography variant="h4" fontWeight="600">
              Delete Record
            </Typography>
          </div>
          <div className="content">
            <Typography variant="h6">Are you sure to delete </Typography>
            <Box margin="20px 0">
              <Typography variant="h4" fontWeight="700">
                {user.username}
              </Typography>
              <Typography variant="h5">
                {employee?.middleName
                  ? employee.firstName +
                    " " +
                    employee.middleName +
                    " " +
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
              sx={{
                backgroundColor: colors.red[500],
                width: "150px",
                height: "50px",
                ml: "20px",
                mb: "10px",
              }}
            >
              <Typography variant="h6" fontWeight="500">
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
              <Typography variant="h6" fontWeight="500">
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
  const handleDelete = async ({ val }) => {
    try {
      const response = await axios.delete(
        "/api/subjects/register",
        JSON.stringify(val),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const json = await response.data;
      if (response.ok) {
        dispatch({ type: "DELETE_USER", payload: json });
      }
    } catch (error) {
      if (!error?.response) {
        console.log("no server response");
      } else if (error.response?.status === 400) {
        // console.log("Missing Username/Password");
        console.log(error.response.data.message);
        // setErrMsg(error.response.data.message);
      } else if (error.response?.status === 401) {
        // console.log("Unauthorized");
        console.log(error.response.data.message);
        // setErrMsg(error.response.data.message);
      } else {
        console.log(error);
      }
    }
  };
  const TableTitles = () => {
    return (
      <TableRow>
        {/* <TableCell align="left"></TableCell> */}
        <TableCell>Username</TableCell>
        <TableCell>Name</TableCell>
        <TableCell align="left">Email</TableCell>
        <TableCell align="left">Type</TableCell>
        <TableCell align="left">Action</TableCell>
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
              width: "60%",
              gridTemplateColumns: " 1fr 1fr 1fr",
            }}
          >
            <IconButton sx={{ cursor: "pointer" }}>
              <Person2 />
            </IconButton>
            <IconButton sx={{ cursor: "pointer" }}>
              <DriveFileRenameOutline />
            </IconButton>
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
            <Box>
              <Typography variant="h3" fontWeight={600}>
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
                  width: "350px",
                  minWidth: "250px",
                  alignItems: "center",
                  justifyContent: "center",
                  p: "0 20px",
                  mr: "10px",
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search Employee"
                  onChange={(e) => {
                    setSearch(e.target.value.toLowerCase);
                  }}
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
                <Typography color="white" variant="h6" fontWeight="500">
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
                    employees &&
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
