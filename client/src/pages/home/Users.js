import React from "react";
import {
  Box,
  Button,
  Grid,
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
  DriveFileRenameOutline,
  DeleteOutline,
  Person2,
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  Search,
} from "@mui/icons-material";
const Users = () => {
  function createData(Name, Email, Type) {
    return { Name, Email, Type };
  }

  const rows = [
    createData("Lorem Ipsum", "emailaddress@gmail.com", "Teacher"),
    createData("Lorem Ipsum", "emailaddress@gmail.com", "Teacher"),
    createData("Lorem Ipsum", "emailaddress@gmail.com", "Teacher"),
    createData("Lorem Ipsum", "emailaddress@gmail.com", "Teacher"),
    createData("Lorem Ipsum", "emailaddress@gmail.com", "Teacher"),
    createData("Lorem Ipsum", "emailaddress@gmail.com", "Teacher"),
  ];
  return (
    <div className="contents-container">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: " 1fr 1fr",
          margin: "10px 0",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={600}>
            Users
          </Typography>
          <Typography>Showing 5 entries</Typography>
        </Box>
        <Paper
          elevation={1}
          sx={{
            display: "flex",
            width: "65%",
            alignItems: "center",
            justifySelf: "end",
            justifyContent: "center",
            padding: "0 20px",
            marginRight: "10px",
          }}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search User" />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <Search />
          </IconButton>
        </Paper>
      </Box>

      <Box>
        <TableContainer>
          <Table sx={{ minWidth: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Type</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.Name}
                  </TableCell>
                  <TableCell align="left">{row.Email}</TableCell>
                  <TableCell align="left">{row.Type}</TableCell>
                  <TableCell align="left">
                    <Paper
                      elevation={0}
                      sx={{
                        display: "grid",
                        width: "60%",
                        gridTemplateColumns: " 1fr 1fr 1fr",
                      }}
                    >
                      <Person2 />
                      <DriveFileRenameOutline />

                      <DeleteOutline color="errorColor" />
                    </Paper>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" width="100%" justifyContent="center">
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
        <Box display="flex" width="100%" marginTop="20px">
          <Button
            variant="outlined"
            color="primary"
            sx={{ width: "200px", height: "50px" }}
          >
            <Typography fontWeight="500" color="primary" variant="h6">
              IMPORT
            </Typography>
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: "200px", height: "50px", marginLeft: "20px" }}
          >
            <Typography color="white" variant="h6" fontWeight="500">
              ADD
            </Typography>
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Users;
