import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";
import { createContext, useState, useMemo } from "react";

// Colors Design Tokens
// Primary Color

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#fafafa",
          200: "#99aabd",
          300: "#66809d",
          400: "#33557c",
          500: "#002b5b",
          600: "#002249",
          700: "#001a37",
          800: "#001124",
          900: "#000912",
        },

        // Secondary Color
        black: {
          100: "#d3d3d3",
          200: "#a6a6a6",
          300: "#7a7a7a",
          400: "#4d4d4d",
          500: "#212121",
          600: "#1a1a1a",
          700: "#141414",
          800: "#0d0d0d",
          900: "#070707",
        },

        // Gray
        gray: {
          100: "#fafafa",
          200: "#b3b3b3",
          300: "#8e8e8e",
          400: "#686868",
          500: "#424242",
          600: "#353535",
          700: "#282828",
          800: "#1a1a1a",
          900: "#0d0d0d",
        },

        //  Accent
        yellowAccent: {
          100: "#feedcf",
          200: "#fedaa0",
          300: "#fdc870",
          400: "#fdb541",
          500: "#fca311",
          600: "#ca820e",
          700: "#97620a",
          800: "#654107",
          900: "#322103",
        },

        red: {
          100: "#f7cccc",
          200: "#ef9999",
          300: "#e76666",
          400: "#df3333",
          500: "#d70000",
          600: "#ac0000",
          700: "#810000",
          800: "#560000",
          900: "#2b0000",
        },
      }
    : {
        primary: {
          100: "#000912",
          200: "#001124",
          300: "#001a37",
          400: "#002249",
          500: "#002b5b",
          600: "#33557c",
          700: "#66809d",
          800: "#99aabd",
          900: "#fafafa",
        },

        // Secondary Color
        black: {
          100: "#070707",
          200: "#0d0d0d",
          300: "#141414",
          400: "#1a1a1a",
          500: "#212121",
          600: "#4d4d4d",
          700: "#7a7a7a",
          800: "#a6a6a6",
          900: "#d3d3d3",
        },

        // Gray
        gray: {
          100: "#0d0d0d",
          200: "#1a1a1a",
          300: "#282828",
          400: "#353535",
          500: "#424242",
          600: "#686868",
          700: "#8e8e8e",
          800: "#b3b3b3",
          900: "#d9d9d9",
        },

        //  Accent
        yellowAccent: {
          100: "#322103",
          200: "#654107",
          300: "#97620a",
          400: "#ca820e",
          500: "#fca311",
          600: "#fdb541",
          700: "#fdc870",
          800: "#fedaa0",
          900: "#feedcf",
        },

        red: {
          100: "#2b0000",
          200: "#560000",
          300: "#810000",
          400: "#ac0000",
          500: "#d70000",
          600: "#df3333",
          700: "#e76666",
          800: "#ef9999",
          900: "#f7cccc",
        },
      }),
});

// MUI theme Settings

export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.black[500],
            },
            neutral: {
              dark: colors.gray[700],
              main: colors.gray[500],
              light: colors.gray[100],
            },
            background: {
              default: colors.primary[900],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.black[500],
            },
            neutral: {
              dark: colors.gray[700],
              main: colors.gray[500],
              light: colors.gray[100],
            },
            background: {
              default: colors.primary[900],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
