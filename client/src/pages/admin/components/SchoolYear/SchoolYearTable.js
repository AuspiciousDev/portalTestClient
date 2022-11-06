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
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Loading from "../../../../global/Loading";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import { useSchoolYearsContext } from "../../../../hooks/useSchoolYearsContext";
import { DeleteOutline } from "@mui/icons-material";
import SchoolYearForm from "./SchoolYearForm";
const SchoolYearTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { schoolyears, sydispatch } = useSchoolYearsContext();
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
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/schoolyears", {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        if (response?.status === 200) {
          const json = await response.data;
          console.log(json);
          setIsLoading(false);
          sydispatch({ type: "SET_SCHOOLYEARS", payload: json });
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
  }, [sydispatch]);

  const TableTitles = () => {
    return (
      <TableRow sx={{ backgroundColor: `${colors.tableHead[100]}` }}>
        {/* <TableCell align="left"></TableCell> */}
        <TableCell>SCHOOL YEAR ID</TableCell>
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
        data-rowid={val.schoolYearID}
        sx={
          {
            // "&:last-child td, &:last-child th": { border: 2 },
            // "& td, & th": { border: 2 },
          }
        }
      >
        {/* <TableCell align="left">-</TableCell> */}
        <TableCell align="left">{val?.schoolYearID || "-"}</TableCell>
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {val?.title || "-"}
        </TableCell>
        <TableCell align="left">{val?.description || "-"}</TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          {val?.active === true ? "ACTIVE" : "INACTIVE"}
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
            <Typography variant="h5">Are you sure to delete user </Typography>
            <Box margin="20px 0">
              <Typography variant="h2" fontWeight="bold">
                {delVal.schoolYearID}
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
  const handleAdd = () => {
    setIsFormOpen(true);
  };
  const handleDelete = async ({ delVal }) => {
    setIsLoading(true);
    try {
      const response = await axios.delete("/api/users/delete", {
        headers: { "Content-Type": "application/json" },
        data: delVal,
        withCredentials: true,
      });
      const json = await response.data;
      if (response.ok) {
        console.log(response.data.message);
        sydispatch({ type: "DELETE_USER", payload: json });
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
      {isFormOpen ? (
        <SchoolYearForm />
      ) : (
        <>
          <Box
            sx={{
              width: "100%",
              display: "grid",
              gridTemplateColumns: " 1fr 1fr",
              margin: "0 0 10px 0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
              }}
            >
              <Typography variant="h2" fontWeight="bold">
                SCHOOL YEAR
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
                    search
                      ? schoolyears &&
                        schoolyears
                          .filter((val) => {
                            return val.title.includes(search);
                          })
                          .map((val) => {
                            return tableDetails(val);
                          })
                      : schoolyears &&
                        schoolyears.map((val) => {
                          return tableDetails({ val });
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

export default SchoolYearTable;
