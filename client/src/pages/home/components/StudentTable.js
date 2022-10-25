import React from "react";
import axios from "axios";
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
import StudentDetails from "./StudentDetails";
import Loading from "../../global/Loading";
const StudentTable = () => {
  const [tableRow, setTableRow] = useState([]);
  const [collection, setCollection] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [withData, setWithData] = useState(false);

  useEffect(() => {
    getTableDetails();
  }, []);
  const getTableDetails = async () => {
    setIsLoading(true);
    const response = await axios("/api/students");
    if (response.statusText === "OK") {
      await setCollection(response.data);
      await console.log(response);
      setIsLoading(false);
      if (!response.data || response.data.length === 0) {
        setWithData(false);
        return;
      } else {
        setWithData(true);
      }
    } else {
      return;
    }
  };
  return (
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
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </Paper>
          <Button
            type="button"
            // onClick={handleAdd}
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
              <TableRow>
                <TableCell align="left">Student ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Level</TableCell>
                <TableCell align="left">Section</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collection &&
                collection.map((val) => {
                  return (
                    <TableRow
                      key={val._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <StudentDetails
                        key={val.username}
                        data={val}
                      ></StudentDetails>
                    </TableRow>
                  );
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
          {withData ? (
            <Typography textTransform="capitalize">data</Typography>
          ) : (
            <Typography textTransform="capitalize">no data</Typography>
          )}
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

        <Box display="flex" width="100%" marginTop="20px">
          {/* <Button
    variant="outlined"
    color="primary"
    sx={{ width: "200px", height: "50px" }}
  >
    <Typography fontWeight="500" color="primary" variant="h6">
      IMPORT
    </Typography>
  </Button> */}
        </Box>
      </Box>
    </>
  );
};

export default StudentTable;
