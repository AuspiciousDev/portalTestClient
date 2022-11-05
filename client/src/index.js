import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import "@fontsource/poppins";
import { UsersContextProvider } from "./context/UserContext";
import { EmployeesContextProvider } from "./context/EmployeeContext";
import { SubjectsContextProvider } from "./context/SubjectContext";
import { StudentsContextProvider } from "./context/StudentContext";
import { AuthProvider } from "./context/AuthProvider";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <UsersContextProvider>
        <EmployeesContextProvider>
          <StudentsContextProvider>
            <SubjectsContextProvider>
                <App />
            </SubjectsContextProvider>
          </StudentsContextProvider>
        </EmployeesContextProvider>
      </UsersContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
