import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainPage from "./pages/main/Mainpage";
import PrivateRoutes from "./routes/PrivateRoutes";
import Users from "./pages/home/Users";
import Grades from "./pages/home/Grades";
import Dashboard from "./pages/home/Dashboard";
import Home from "./pages/home/Home";
import Loading from "./pages/global/Loading";
import Employees from "./pages/home/Employees";
function App() {
  const user = true;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<MainPage />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="grades" element={<Grades />} />
          <Route path="users" element={<Users />} />
          <Route path="employees" element={<Employees />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
