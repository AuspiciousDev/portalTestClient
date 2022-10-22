import React from "react";
import {
  Box,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  Grid,
  Item,
  Typography,
  TableContainer,
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
  AutoStories,
  Diversity3,
  People,
  Badge,
  Groups,
} from "@mui/icons-material";
const Dashboard = () => {
  const fColor = "primaryGray";
  const fCountVariant = "h3";
  const fDescVariant = "h6";
  const fWeight = "800";
  const totalStudents = (
    <CardContent>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Groups color="primaryGray" sx={{ fontSize: "100px" }} />
        <Typography variant={fCountVariant} fontWeight={fWeight} margin="30px">
          537
        </Typography>
        <Typography align="center" variant={fDescVariant}>
          Total Number of Students
        </Typography>
      </Box>
    </CardContent>
  );
  const totalTeachers = (
    <CardContent>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Badge color="primaryGray" sx={{ fontSize: "100px" }} />
        <Typography variant={fCountVariant} fontWeight={fWeight} margin="30px">
          537
        </Typography>
        <Typography align="center" variant={fDescVariant}>
          Total Number of Teachers
        </Typography>
      </Box>
    </CardContent>
  );
  const totalSubjects = (
    <CardContent>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <AutoStories color="primaryGray" sx={{ fontSize: "100px" }} />
        <Typography variant={fCountVariant} fontWeight={fWeight} margin="30px">
          537
        </Typography>
        <Typography align="center" variant={fDescVariant}>
          Total Number of Subjects
        </Typography>
      </Box>
    </CardContent>
  );
  const totalSections = (
    <CardContent>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Diversity3 color="primaryGray" sx={{ fontSize: "100px" }} />
        <Typography variant={fCountVariant} fontWeight={fWeight} margin="30px">
          537
        </Typography>
        <Typography align="center" variant={fDescVariant}>
          Total Number of Sections
        </Typography>
      </Box>
    </CardContent>
  );

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData(2019115572, "Crystal Moran", "1", "Javascript", "4.0"),
    createData(2019115573, "Marcos Day", "2", "Python", "4.0"),
    createData(2019115574, "Eric Stephenson", "3", "PostGre", "4.0"),
    createData(2019115575, "Kelsie Hodge", "4", "Java", "4.0"),
    createData(2019115576, "Jessie Barry", "5", "SQL", "4.0"),
    createData(2019115577, "Reina Farmer", "6", "CSS", "4.0"),
    createData(2019115578, "Devina Bruckental", "5", "Ruby", "4.0"),
  ];

  return (
    <Container
      maxWidth="xl"
      style={{ paddingRight: "100px", paddingLeft: "100px" }}
    >
      <Box sx={{ minWidth: "100%", minHeight: "350px", marginBottom: "50px" }}>
        <Typography variant="h5" fontWeight={500}>
          Overview
        </Typography>
        <Grid
          container
          spacing={5}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={3}>
            <Card>{totalStudents}</Card>
          </Grid>
          <Grid item xs={3}>
            <Card>{totalTeachers}</Card>
          </Grid>
          <Grid item xs={3}>
            <Card>{totalSubjects}</Card>
          </Grid>
          <Grid item xs={3}>
            <Card>{totalSections}</Card>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {" "}
        <Typography variant="h5">Recent Students</Typography>
        <Typography>Showing 10 entries</Typography>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{row.calories}</TableCell>
                  <TableCell align="left">{row.fat}</TableCell>
                  <TableCell align="left">{row.carbs}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Dashboard;
