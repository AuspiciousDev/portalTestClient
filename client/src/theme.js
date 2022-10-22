import { createTheme } from "@mui/material";
import "@fontsource/poppins";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#002CBB",
      light: "#05BCFF",
    },
    secondary: {
      main: "#10009E",
      light: "#0085EB",
    },
    primaryGray: {
      main: "#424242",
    },
    secondayGray: {
      main: "#999999",
    },
  },
  typography: {
    fontFamily: "Poppins",
    allVariants: {
      color: "#424242",
    },
  },
});
