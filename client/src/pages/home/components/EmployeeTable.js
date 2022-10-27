import React from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import { useEmployeesContext } from "../../../hooks/useEmployeesContext";

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
  TextField,
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
  Person2,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import EmployeeDetails from "./EmployeeDetails";
import Loading from "../../global/Loading";
import EmployeeForm from "./EmployeeForm";
import PopupEmployee from "./PopupEmployee";
import EmployeeEditForm from "./EmployeeEditForm";
const EmployeeTable = () => {
  const { employees, dispatch } = useEmployeesContext();
  const [tableRow, setTableRow] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [withData, setWithData] = useState(false);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const PopupExample = ({ val }) => (
    <Popup
      trigger={
        <IconButton sx={{ cursor: "pointer" }}>
          <DriveFileRenameOutline />
        </IconButton>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">
            <Typography variant="h4" fontWeight="600">
              EDIT EMPLOYEE
            </Typography>
            <Typography variant="h6"> {val.empID}</Typography>
          </div>
          <div className="content">
            <EmployeeEditForm data={val} />
          </div>
          {/* <div className="actions">
            <Popup
              trigger={<button className="button"> Trigger </button>}
              position="top center"
              nested
            >
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                magni omnis delectus nemo, maxime molestiae dolorem numquam
                mollitia, voluptate ea, accusamus excepturi deleniti ratione
                sapiente! Laudantium, aperiam doloribus. Odit, aut.
              </span>
            </Popup>
            <button
              className="button"
              onClick={() => {
                console.log("modal closed ");
                close();
              }}
            >
              close modal
            </button>
          </div> */}
        </div>
      )}
    </Popup>
  );
  const DeleteRecord = ({ val }) => (
    <Popup
      trigger={
        <IconButton sx={{ cursor: "pointer" }}>
          <DeleteOutline color="errorColor" />
        </IconButton>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal-delete">
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
                {val.empID}
              </Typography>
              <Typography variant="h5">
                {val.middleName
                  ? val.firstName + " " + val.middleName + " " + val.lastName
                  : val.firstName + " " + val.lastName}
              </Typography>
            </Box>
          </div>
          <div className="actions">
            <Button
              type="button"
              onClick={() => {
                handleDelete(val.empID);
                close();
              }}
              variant="contained"
              color="red"
              sx={{ width: "200px", height: "50px", marginLeft: "20px" }}
            >
              <Typography color="white" variant="h6" fontWeight="500">
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
              color="primary"
              sx={{ width: "200px", height: "50px", marginLeft: "20px" }}
            >
              <Typography color="white" variant="h6" fontWeight="500">
                CANCEL
              </Typography>
            </Button>
          </div>
        </div>
      )}
    </Popup>
  );
  useEffect(() => {
    const getUsersDetails = async () => {
      setIsLoading(true);
      const response = await fetch("/api/employees", {});
      const json = await response.json();

      if (response.ok) {
        setIsLoading(false);
        console.log(json);
        dispatch({ type: "SET_EMPLOYEES", payload: json });
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
  }, [dispatch]);

  const handleAdd = () => {
    setIsFormOpen(true);
  };
  const handleDelete = async (searchID) => {
    const response = await fetch("/api/employees/delete/" + searchID, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_EMPLOYEE", payload: json });
    }
  };
  const handleEdit = () => {};

  const TableTitles = () => {
    return (
      <TableRow>
        <TableCell align="left">Employee ID</TableCell>
        <TableCell align="left">Name</TableCell>
        <TableCell align="left">Email</TableCell>
        <TableCell align="left">Position</TableCell>
        <TableCell align="left">Actions</TableCell>
      </TableRow>
    );
  };
  const tableDetails = (val) => {
    return (
      <StyledTableRow
        key={val._id}
        data-rowid={val.empID}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell align="left">{val.empID || "-"}</TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {val?.firstName + " " + val.lastName || "-"}
        </TableCell>
        <TableCell align="left">{val?.email || "-"}</TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val.position}
        </TableCell>
        <TableCell align="left">
          <Box
            elevation={0}
            sx={{
              display: "grid",
              width: "60%",
              gridTemplateColumns: " 1fr 1fr 1fr",
            }}
          >
            <IconButton sx={{ cursor: "pointer" }}>
              <Person2 />
            </IconButton>
            <PopupExample val={val} />
            <DeleteRecord val={val} />
            {/* <PopupExample val={val} /> */}
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
            <Box>
              <Typography variant="h4" fontWeight={600}></Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
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
                <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search User" />
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
                color="primary"
                sx={{ width: "200px", height: "50px", marginLeft: "20px" }}
              >
                <Typography color="white" variant="h6" fontWeight="500">
                  Add
                </Typography>
              </Button>
            </Box>
          </Box>
          <Box width="100%">
            <TableContainer>
              <Table sx={{ minWidth: "100%" }} aria-label="simple table">
                <TableHead>
                  <TableTitles />
                </TableHead>
                <TableBody>
                  {
                    (console.log(employees),
                    employees &&
                      employees.map((employee) => {
                        return tableDetails(employee);
                      }))
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
              <Box
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
              </Box>
            </Box>

            <Box display="flex" width="100%" marginTop="20px"></Box>
          </Box>
        </>
      )}
    </>
  );
};

export default EmployeeTable;
