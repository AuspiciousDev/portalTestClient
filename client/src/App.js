import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PrivateRoutes from "./routes/PrivateRoutes";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

// Public
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import RequireAuth from "./pages/components/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
// Admin
import MainPage from "./pages/main/Mainpage";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Grades from "./pages/admin/Grades";
import Employees from "./pages/admin/Employees";
import Students from "./pages/admin/Students";
import Maintenance from "./pages/admin/Maintenance";
import Subjects from "./pages/admin/Subjects";
import Level from "./pages/admin/Level";
import Section from "./pages/admin/Section";
import Department from "./pages/admin/Department";
import SchoolYear from "./pages/admin/SchoolYear";
import ActiveStudents from "./pages/admin/ActiveStudents";
import NotFound404 from "./pages/NotFound404";
import GenerateActiveYearGrades from "./pages/admin/components/GeneratePDF/GenerateActiveYearGrades";

// Students
import StudentMain from "./pages/Student/StudentMain";
import StudentDashboard from "./pages/Student/StudentDashboard";
import RecordTable from "./pages/admin/components/Record/RecordTable";
const ROLES = {
  Admin: 2001,
  Employee: 2002,
  Student: 2003,
};
function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* PUBLIC ROUTES*/}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            {/* ADMIN ROUTES*/}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/" element={<MainPage />}>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="grade" element={<Grades />} />
                  <Route path="user" element={<Users />} />
                  <Route path="student" element={<Students />} />
                  <Route path="subject" element={<Subjects />} />
                  <Route path="employee" element={<Employees />} />
                  <Route path="level" element={<Level />} />
                  <Route path="section" element={<Section />} />
                  <Route path="department" element={<Department />} />
                  <Route path="schoolyear" element={<SchoolYear />} />
                  <Route path="active" element={<ActiveStudents />} />
                  <Route path="record" element={<RecordTable />} />

                  <Route path="maintenance" element={<Maintenance />} />
                </Route>
                <Route
                  path="generatepdf/:id"
                  element={<GenerateActiveYearGrades />}
                />
              </Route>
              {/* <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
                <Route path="/" element={<StudentMain />}>
                  <Route path="dashboard" element={<StudentDashboard />} />
                </Route>
              </Route> */}
            </Route>
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
