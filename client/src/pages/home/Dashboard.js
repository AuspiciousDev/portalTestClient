import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";
import {
  AutoStories,
  Diversity3,
  Badge,
  Groups,
  AccountCircle,
} from "@mui/icons-material";
const Dashboard = () => {
  const fCountVariant = "h3";
  const fDescVariant = "subtitle1";
  const fWeight = "800";

  const totalStudents = (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        padding: "10px",
      }}
    >
      <Groups
        color="primaryGray"
        sx={{ fontSize: "80px", alignSelf: "center" }}
      />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        537
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Sections
      </Typography>
    </Paper>
  );
  const totalInstructors = (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        padding: "10px",
      }}
    >
      <Badge
        color="primaryGray"
        sx={{ fontSize: "80px", alignSelf: "center" }}
      />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        15
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Instructors
      </Typography>
    </Paper>
  );
  const totalSubjects = (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        padding: "10px",
      }}
    >
      <AutoStories
        color="primaryGray"
        sx={{ fontSize: "80px", alignSelf: "center" }}
      />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        20
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Subjects
      </Typography>
    </Paper>
  );
  const totalSections = (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        padding: "10px",
      }}
    >
      <Diversity3
        color="primaryGray"
        sx={{ fontSize: "80px", alignSelf: "center" }}
      />
      <Typography
        variant={fCountVariant}
        fontWeight={fWeight}
        margin="20px"
        align="center"
      >
        12
      </Typography>
      <Typography align="center" variant={fDescVariant}>
        Total Number of Sections
      </Typography>
    </Paper>
  );

  function createData(StudentID, Name, Level, Section) {
    return { StudentID, Name, Level, Section };
  }

  const rows = [
    createData(2019115572, "Crystal Moran", "1", "Javascript"),
    createData(2019115573, "Marcos Day", "2", "Python"),
    createData(2019115574, "Eric Stephenson", "3", "PostGre"),
    createData(2019115575, "Kelsie Hodge", "4", "Java"),
    createData(2019115575, "Kelsie Hodge", "4", "Java"),
    createData(2019115574, "Eric Stephenson", "3", "PostGre"),
    createData(2019115575, "Kelsie Hodge", "4", "Java"),
  ];

  return (
    <div className="contents-container">
      <Box marginBottom={5}>
        <Typography variant="h4" fontWeight={600} marginBottom="30px">
          Overview
        </Typography>
        <Grid
          container
          spacing={5}
          direction="row"
          alignItems="center"
          justify="center"
          color="red"
        >
          <Grid item xs={3}>
            {totalStudents}
          </Grid>
          <Grid item xs={3}>
            {totalInstructors}
          </Grid>
          <Grid item xs={3}>
            {totalSubjects}
          </Grid>
          <Grid item xs={3}>
            {totalSections}
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography variant="h5">Recent Students</Typography>
        <Typography>Showing 10 entries</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: "5fr 1fr" }}>
          <TableContainer>
            <Table sx={{ minWidth: "100%" }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Level</TableCell>
                  <TableCell align="left">Section</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.StudentID}
                    </TableCell>
                    <TableCell align="left">{row.Name}</TableCell>
                    <TableCell align="left">{row.Level}</TableCell>
                    <TableCell align="left">{row.Section}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box padding="0 0 0 25px">
            {/* <Typography variant="h5" marginBottom={2}>
              Recent Students
            </Typography> */}
            <Grid
              container
              sx={{ width: "400px" }}
              spacing={3}
              direction="column"
              alignItems="center"
              justify="center"
              color="red"
            >
              {rows.slice(0, 5).map((row) => (
                <Grid item xs={3} sx={{ width: "100%", padding: "0 25px" }}>
                  <Paper
                    elevation={1}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      borderRadius: 5,
                      padding: "10px",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <AccountCircle
                      sx={{ fontSize: "40px", margin: "0 15px 0 10px" }}
                    />
                    <Paper elevation={0}>
                      <Typography color="primaryGray">{row.Name}</Typography>
                      <Typography color="primaryGray">
                        Grade {row.Level} - {row.Section}
                      </Typography>
                    </Paper>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
