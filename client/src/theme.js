import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";
import { createContext, useState, useMemo } from "react";

// Colors Design Tokens
// Primary Color
// yellow: {
//     100: "#f5f6f7",
//     200: "#ebedef",
//     300: "#e0e4e8",
//     400: "#d6dbe0",
//     500: "#ccd2d8",
//     600: "#a3a8ad",
//     700: "#7a7e82",
//     800: "#525456",
//     900: "#292a2b"
// },
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#ccd2d8",
          200: "#99a5b1",
          300: "#66778b",
          400: "#334a64",
          500: "#001d3d",
          600: "#001731",
          700: "#001125",
          800: "#000c18",
          900: "#00060c",
        },

        // Secondary Color
        black: {
          100: "#ccced0",
          200: "#999ca1",
          300: "#666b72",
          400: "#333943",
          500: "#000814",
          600: "#000610",
          700: "#00050c",
          800: "#000308",
          900: "#000204",
        },

        // Gray
        gray: {
          100: "#fafafa",
          200: "#b3b3b3",
          300: "#8e8e8e",
          400: "#686868",
          500: "#424242",
          600: "#353535",
          700: "#8e8e8e",
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
        // Light
        primary: {
          100: "#00060c",
          200: "#000c18",
          300: "#001125",
          400: "#001731",
          500: "#001d3d",
          600: "#334a64",
          700: "#66778b",
          800: "#000c18",
          900: "#e0e4e8",
        },
        // Light
        black: {
          100: "#000204",
          200: "#000308",
          300: "#00050c",
          400: "#000610",
          500: "#000814",
          600: "#333943",
          700: "#666b72",
          800: "#999ca1",
          900: "#ccced0",
        },

        // Light
        gray: {
          // 100: "#0d0d0d",
          100: "#fafafa",
          200: "#1a1a1a",
          300: "#282828",
          400: "#353535",
          500: "#424242",
          600: "#686868",
          700: "#8e8e8e",
          800: "#b3b3b3",
          900: "#fafafa",
        },

        // Light
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
        // Light
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
