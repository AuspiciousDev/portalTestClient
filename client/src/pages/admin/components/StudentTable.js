import React from "react";
import Popup from "reactjs-popup";
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
  AccountCircle,
  DeleteOutline,
  Person2,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Loading from "../../../global/Loading";
import StudentForm from "./StudentForm";
import StudentEditForm from "./StudentEditForm";
import { useStudentsContext } from "../../../hooks/useStudentsContext";
const StudentTable = () => {
  const { students, dispatch } = useStudentsContext();
  const [search, setSearch] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
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
      const response = await fetch("/api/students", {});
      const json = await response.json();

      if (response.ok) {
        setIsLoading(false);

        dispatch({ type: "SET_STUDENTS", payload: json });
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
      dispatch({ type: "DELETE_STUDENT", payload: json });
    }
  };
  const TableTitles = () => {
    return (
      <TableRow>
        <TableCell align="center"></TableCell>
        <TableCell align="left">Student ID</TableCell>
        <TableCell align="left">Name</TableCell>
        <TableCell align="left">Grade</TableCell>
        <TableCell align="left">Section</TableCell>
        <TableCell align="left">Department</TableCell>
        <TableCell align="left">Actions</TableCell>
      </TableRow>
    );
  };
  const tableDetails = (val) => {
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
        {/* Profile ID */}
        <TableCell sx={{ p: "0 0" }} align="center">
          <AccountCircle sx={{ fontSize: "50px" }} />
        </TableCell>
        {/* Student ID */}
        <TableCell align="left">{val.studID}</TableCell>
        {/* Student Name */}
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {val.firstName + " " + val.lastName}
        </TableCell>
        {/* Student Level */}
        <TableCell align="left">Grade {val.level}</TableCell>
        {/* Student Section */}
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val.section}
        </TableCell>
        {/* Student Department */}
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val.department}
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
            {console.log(val)}
            <StudentEditForm data={val} />
            <DeleteRecord val={val} />
          </Box>
        </TableCell>
      </StyledTableRow>
    );
  };
  return (
    <>
      {isFormOpen ? (
        <StudentForm />
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
                STUDENTS
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
                  placeholder="Search Student"
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
                    search
                      ? students
                          .filter((data) => {
                            return (
                              data.firstName.includes(search) ||
                              data.studID.includes(search)
                            );
                          })
                          .map((data) => {
                            return tableDetails(data);
                          })
                      : students &&
                        students.slice(0, 8).map((data) => {
                          return tableDetails(data);
                        })

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
              {Object.keys(students || {}).length > 0 ? (
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

export default StudentTable;
