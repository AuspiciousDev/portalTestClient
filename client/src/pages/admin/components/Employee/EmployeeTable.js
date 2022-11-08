import React from "react";
import Popup from "reactjs-popup";
import axios from "axios";
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
import EmployeeForm from "./EmployeeForm";
import EmployeeEditForm from "./EmployeeEditForm";

import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
const EmployeeTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { employees, empDispatch } = useEmployeesContext();
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
      const response = await fetch("/api/employees", {});
      const json = await response.json();
      if (response.ok) {
        setIsLoading(false);

        empDispatch({ type: "SET_EMPLOYEES", payload: json });
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
  }, [empDispatch]);
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
            <Typography variant="h4" fontWeight="600">
              Delete Record
            </Typography>
          </div>
          <div className="content">
            <Typography variant="h6">Are you sure to delete </Typography>
            <Box margin="20px 0">
              <Typography variant="h4" fontWeight="700">
                {delVal.empID}
              </Typography>
              <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                {delVal.middleName
                  ? delVal.firstName +
                    " " +
                    delVal.middleName +
                    " " +
                    delVal.lastName
                  : delVal.firstName + " " + delVal.lastName}
              </Typography>
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

  const handleAdd = () => {
    setIsFormOpen(true);
  };
  const handleDelete = async ({ delVal }) => {
    try {
      setIsLoading(true);
      const response = await axios.delete("/api/employees/delete", {
        headers: { "Content-Type": "application/json" },
        data: delVal,
        withCredentials: true,
      });
      const json = await response.data;
      if (response.status === 200) {
        console.log(response.data.message);
        empDispatch({ type: "DELETE_EMPLOYEE", payload: json });
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

  const TableTitles = () => {
    return (
      <TableRow sx={{ backgroundColor: `${colors.tableHead[100]}` }}>
        <TableCell align="left"></TableCell>
        <TableCell align="left">Employee ID</TableCell>
        <TableCell align="left">Name</TableCell>
        <TableCell align="left">Email</TableCell>
        <TableCell align="left">Type</TableCell>
        <TableCell align="left">Actions</TableCell>
      </TableRow>
    );
  };
  const tableDetails = (val) => {
    return (
      <StyledTableRow
        key={val._id}
        data-rowid={val.empID}
        sx={
          {
            // "&:last-child td, &:last-child th": { border: 1 },
            // "& td, & th": { border: 1 },
          }
        }
      >
        <TableCell sx={{ p: "0 0" }} align="center">
          <AccountCircle sx={{ fontSize: "50px" }} />
        </TableCell>
        <TableCell align="left">{val.empID || "-"}</TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {val?.middleName
            ? val?.firstName +
              " " +
              val?.middleName.charAt(0) +
              ". " +
              val?.lastName
            : val?.firstName + " " + val?.lastName}
        </TableCell>
        <TableCell align="left">{val?.email || "-"}</TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val.empType}
        </TableCell>
        <TableCell align="left">
          <Box
            elevation={0}
            sx={{
              display: "grid",
              width: "50%",
              gridTemplateColumns: " 1fr 1fr 1fr",
            }}
          >
            <IconButton sx={{ cursor: "pointer" }}>
              <Person2OutlinedIcon />
            </IconButton>
            <EmployeeEditForm data={val} />
            <DeleteRecord delVal={val} />
          </Box>
        </TableCell>
      </StyledTableRow>
    );
  };
  return (
    <>
      {isFormOpen ? (
        <EmployeeForm />
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
                EMPLOYEES
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
                  placeholder="Search Employee"
                  onChange={(e) => {
                    setSearch(e.target.value.toLowerCase());
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
                sx={{ width: "200px", height: "50px", ml: "20px" }}
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
                height: "700px",
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
                    (console.log(search),
                    search
                      ? employees
                          .filter((data) => {
                            return (
                              data.firstName.includes(search) ||
                              data.empID.includes(search)
                            );
                          })
                          .map((data) => {
                            return tableDetails(data);
                          })
                      : employees &&
                        employees.slice(0, 8).map((data) => {
                          return tableDetails(data);
                        }))

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
              {Object.keys(employees || {}).length > 0 ? (
                <></> // <Typography textTransform="uppercase">data</Typography>
              ) : (
                <Typography textTransform="uppercase">no data</Typography>
              )}
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

export default EmployeeTable;
