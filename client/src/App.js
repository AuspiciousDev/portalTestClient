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
// Admin
import MainPage from "./pages/main/Mainpage";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Grades from "./pages/admin/Grades";
import Employees from "./pages/admin/Employees";
import Students from "./pages/admin/Students";
import Maintenance from "./pages/admin/Maintenance";
import Subjects from "./pages/admin/Subjects";

// Students
import StudentMain from "./pages/Student/StudentMain";
import StudentDashboard from "./pages/Student/StudentDashboard";
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
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}> */}
            <Route path="/admin" element={<MainPage />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="grades" element={<Grades />} />
              <Route path="users" element={<Users />} />
              <Route path="employees" element={<Employees />} />
              <Route path="subjects" element={<Subjects />} />
              <Route path="students" element={<Students />} />
              <Route path="maintenance" element={<Maintenance />} />
            </Route>
            {/* </Route> */}
            <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
              <Route path="/" element={<StudentMain />}>
                <Route path="dashboard" element={<StudentDashboard />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
