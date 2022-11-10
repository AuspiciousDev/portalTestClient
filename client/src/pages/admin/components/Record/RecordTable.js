import React from "react";
import Popup from "reactjs-popup";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
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
  NativeSelect,
  FormControl,
  TextField,
  InputLabel,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { tokens } from "../../../../theme";
import Loading from "../../../../global/Loading";
const RecordTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [search, setSearch] = useState();
  const [isloading, setIsLoading] = useState(false);

  const TableTitles = () => {
    return (
      <TableRow sx={{ backgroundColor: `${colors.tableHead[100]}` }}>
        <TableCell>SECTION ID</TableCell>
        <TableCell>SECTION</TableCell>
        <TableCell>LEVEL</TableCell>
        <TableCell align="left">ACTIVE</TableCell>
        <TableCell align="left">ACTION</TableCell>
      </TableRow>
    );
  };
  return (
    <div className="contents-container">
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
            Records
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
              placeholder="Search Section"
              onChange={(e) => {
                setSearch(e.target.value.toLowerCase());
              }}
              value={search}
            />
            <Divider sx={{ height: 30, m: 1 }} orientation="vertical" />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <Search />
            </IconButton>
          </Paper>

          <Button
            type="button"
            // onClick={() => setOpen((o) => !o)}
            variant="contained"
            sx={{ width: "200px", height: "50px", marginLeft: "20px" }}
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
            height: "800px",
          }}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableTitles />
            </TableHead>
            <TableBody>
              {/* {search
                ? sections &&
                  sections
                    .filter((val) => {
                      return (
                        val.sectionID.includes(search) ||
                        val.levelID.includes(search)
                      );
                    })
                    .map((val) => {
                      return tableDetails({ val });
                    })
                : sections &&
                  sections.map((val) => {
                    return tableDetails({ val });
                  })} */}
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
        </Box>
      </Box>
    </div>
  );
};

export default RecordTable;
