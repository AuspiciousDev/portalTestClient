import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import "@fontsource/poppins";
import { UsersContextProvider } from "./context/UserContext";
import { EmployeesContextProvider } from "./context/EmployeeContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UsersContextProvider>
      <EmployeesContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </EmployeesContextProvider>
    </UsersContextProvider>
  </React.StrictMode>
);
