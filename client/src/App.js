import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  redirect,
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
import FacultyProfile from "./pages/admin/components/Employee/FacultyProfile";
import FacultyProfileEdit from "./pages/admin/components/Employee/FacultyProfileEdit";
import Students from "./pages/admin/Students";
import StudentProfile from "./pages/admin/components/Student/StudentProfile";
import StudentProfileEdit from "./pages/admin/components/Student/StudentProfileEdit";
import StudentRecord from "./pages/admin/components/Student/StudentRecord";
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
import ResetPassword from "./pages/ResetPassword";
const ROLES = {
  Admin: 2001,
  Teacher: 2002,
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
            <Route path="reset" element={<ResetPassword />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            {/* ADMIN ROUTES*/}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                <Route path="/" element={<MainPage />}>
                  <Route index element={<Dashboard />} />
                  <Route path="grade" element={<Grades />} />
                  <Route path="user" element={<Users />} />
                  <Route path="student" element={<Students />} />
                  <Route path="student/:id" element={<StudentProfile />} />
                  <Route
                    path="student/edit/:id"
                    element={<StudentProfileEdit />}
                  />
                  <Route
                    path="student/record/:id/:year"
                    element={<StudentRecord />}
                  />
                  <Route path="subject" element={<Subjects />} />
                  <Route path="faculty" element={<Employees />} />
                  <Route path="faculty/:id" element={<FacultyProfile />} />
                  <Route
                    path="faculty/edit/:id"
                    element={<FacultyProfileEdit />}
                  />
                  <Route path="level" element={<Level />} />
                  <Route path="section" element={<Section />} />
                  <Route path="department" element={<Department />} />
                  <Route path="schoolyear" element={<SchoolYear />} />
                  <Route path="active" element={<ActiveStudents />} />
                  <Route path="record" element={<RecordTable />} />
                  <Route
                    path="generatepdf/:id"
                    element={<GenerateActiveYearGrades />}
                  />
                  <Route
                    path="generatepdf/:id"
                    element={<GenerateActiveYearGrades />}
                  />
                  <Route path="maintenance" element={<Maintenance />} />
                </Route>
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
                <Route path="/" element={<StudentMain />}>
                  <Route path="dashboard" element={<StudentDashboard />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
