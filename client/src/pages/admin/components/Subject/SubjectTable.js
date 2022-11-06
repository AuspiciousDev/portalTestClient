import React from "react";
import Popup from "reactjs-popup";
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
} from "@mui/material";
import { AutoStories, DeleteOutline } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Loading from "../../../../global/Loading";
import SubjectForm from "./SubjectForm";
import SubjectEditForm from "./SubjectEditForm";
import { useSubjectsContext } from "../../../../hooks/useSubjectsContext";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
const SubjectTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { subjects, dispatch } = useSubjectsContext();
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
      setIsLoading(true);
      const response = await fetch("/api/subjects", {});
      const json = await response.json();

      if (response.ok) {
        setIsLoading(false);

        dispatch({ type: "SET_SUBJECTS", payload: json });
      }
    };
    getData();
  }, [dispatch]);
  const handleAdd = () => {
    setIsFormOpen(true);
  };
  const handleDelete = async (searchID) => {
    const response = await fetch("/api/subjects/delete/" + searchID, {
      method: "DELETE",
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_SUBJECT", payload: json });
    }
  };
  const TableTitles = () => {
    return (
      <TableRow>
        <TableCell align="left">Subject ID</TableCell>
        <TableCell align="left">Subject Name</TableCell>
        <TableCell align="left">Subject Level</TableCell>
        <TableCell align="left">Action</TableCell>
      </TableRow>
    );
  };
  const tableDetails = (val) => {
    return (
      <StyledTableRow
        key={val._id}
        sx={
          {
            // "&:last-child td, &:last-child th": { border: 2 },
            // "& td, & th": { border: 2 },
          }
        }
      >
        {/* Subject ID */}
        <TableCell align="left" sx={{ textTransform: "uppercase" }}>
          {val.subjectID}
        </TableCell>
        {/* Subject Name */}
        <TableCell
          component="th"
          scope="row"
          sx={{ textTransform: "capitalize" }}
        >
          {val.title}
        </TableCell>
        {/* Subject Level */}
        <TableCell align="left">Grade {val.subjectLevel}</TableCell>

        <TableCell align="left">
          <Box
            elevation={0}
            sx={{
              display: "grid",
              width: "40%",
              gridTemplateColumns: " 1fr 1fr",
            }}
          >
            <SubjectEditForm data={val} />
            <DeleteRecord val={val} />
          </Box>
        </TableCell>
      </StyledTableRow>
    );
  };
  const DeleteRecord = ({ val }) => (
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
                {val.subjectID}
              </Typography>
              <Typography variant="h5">{val.title}</Typography>
            </Box>
          </div>
          <div className="actions">
            <Button
              type="button"
              onClick={() => {
                handleDelete(val.subjectID);
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

  return (
    <>
      {isFormOpen ? (
        <SubjectForm />
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
                SUBJECTS
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
                      ? subjects
                          .filter((data) => {
                            return (
                              data.subjectID.includes(search) ||
                              data.title.includes(search)
                            );
                          })
                          .map((data) => {
                            return tableDetails(data);
                          })
                      : subjects &&
                        subjects.slice(0, 8).map((data) => {
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
              {/* <Typography textTransform="uppercase">
                {console.log(Object.keys(subjects || {}).length)}
                {Object.keys(subjects || {}).length}
              </Typography> */}
              {isloading ? <Loading /> : <></>}
              {Object.keys(subjects || {}).length > 0 ? (
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
      )}
    </>
  );
};

export default SubjectTable;
