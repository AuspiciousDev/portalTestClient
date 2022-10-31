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
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersContextProvider>
      <EmployeesContextProvider>
        <StudentsContextProvider>
          <SubjectsContextProvider>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </SubjectsContextProvider>
        </StudentsContextProvider>
      </EmployeesContextProvider>
    </UsersContextProvider>
  </React.StrictMode>
);
