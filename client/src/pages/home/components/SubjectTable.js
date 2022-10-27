import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  Search,
} from "@mui/icons-material";
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
import { styled } from "@mui/material/styles";
import SubjectDetails from "./SubjectDetails";
import Loading from "../../global/Loading";
const SubjectTable = () => {
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
    const response = await axios("/api/subjects");
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
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
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
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search Subject" />
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
                <TableCell align="left">Subject ID</TableCell>
                <TableCell align="left">Subject Title</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {collection &&
                collection.map((val) => {
                  return (
                    <StyledTableRow
                      key={val._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <SubjectDetails
                        key={val._id}
                        data={val}
                        action={true}
                      ></SubjectDetails>
                    </StyledTableRow>
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
          {isloading ? <Loading /> : <></>}
          <Box
            display="flex"
            maxWidth="100%"
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

export default SubjectTable;
