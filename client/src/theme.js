import { createTheme } from "@mui/material";
import "@fontsource/poppins";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#002B5B",
      light: "#05BCFF",
    },
    secondary: {
      main: "#ffffff",
      light: "#0085EB",
    },
    gray: {
      main: "#424242",
      light: "#999999",
    },
    whiteText: {
      main: "#ffffff",
      light: "#999999",
    },
    red: {
      main: "#9E0000",
    },
    errorColor: {
      main: "#C0392B",
    },
  },
  typography: {
    fontFamily: "Poppins",
    allVariants: {
      color: "#000",
    },
  },
});
