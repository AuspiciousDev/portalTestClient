import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";
import { createContext, useState, useMemo } from "react";

export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        primary: {
          100: "#e0f7fa",
          200: "#b3e5fc",
          300: "#81d4fa",
          400: "#4fc3f7",
          500: "#29b6f6",
          600: "#03a9f4",
          700: "#039be5",
          800: "#0288d1",
          900: "#0277BD",
          950: "#01579b",
        },

        secondary: {
          100: "#ffe066",
          200: "#ffdb4d",
          300: "#ffd633",
          400: "#ffd11a",
          500: "#ffcc00",
          600: "#e6b800",
          700: "#cca300",
          800: "#b38f00",
          900: "#997a00",
        },
        black: {
          50: "#ffffff",
          100: "#FBFBFB",
          200: "#cccccc",
          300: "#b2b2b2",
          400: "#999999",
          500: "#7f7f7f",
          600: "#666666",
          700: "#4c4c4c",
          800: "#333333",
          900: "#101010",
          950: "#000000",
        },
        error: {
          100: "#b71c1c",
        },
        Sidebar: {
          100: "#0a0f14",
        },

        whiteOnly: {
          100: "#fafafa",
        },
        blackOnly: {
          100: "#000000",
        },
        DarkPrimaryOnly: {
          100: "#0a0f14",
        },
      }
    : {
        primary: {
          100: "#01579b",
          200: "#0277BD",
          300: "#0288d1",
          400: "#039be5",
          500: "#03a9f4",
          600: "#29b6f6",
          700: "#4fc3f7",
          800: "#81d4fa",
          900: "#01579b",
          // 900: "#b3e5fc",
          950: "#01579b",
          // 950: "#e0f7fa",
        },

        secondary: {
          100: "#997a00",
          200: "#b38f00",
          300: "#cca300",
          400: "#e6b800",
          500: "#ffcc00",
          600: "#ffd11a",
          700: "#ffd633",
          800: "#ffdb4d",
          900: "#ffe066",
        },
        black: {
          50: "#000000",
          100: "#191919",
          200: "#333333",
          300: "#4c4c4c",
          400: "#666666",
          500: "#7f7f7f",
          600: "#999999",
          700: "#b2b2b2",
          800: "#cccccc",
          900: "#F9F9F9",
          950: "#ffffff",
        },
        error: {
          100: "#b71c1c",
        },
        Sidebar: {
          100: "#F9F9F9",
        },
        whiteOnly: {
          100: "#fafafa",
        },
        blackOnly: {
          100: "#000000",
        },
        DarkPrimaryOnly: {
          100: "#0a0f14",
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
              main: colors.primary[900],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.primary[100],
              main: colors.primary[100],
              light: colors.primary[100],
            },
            background: {
              default: colors.black[900],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.primary[100],
              main: colors.primary[100],
              light: colors.primary[100],
            },
            background: {
              default: colors.black[950],
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins", "sans-serif"].join(","),
      fontSize: 13,
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
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  };
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  // const [mode, setMode] = useState("light");
  const [mode, setMode] = useState("light");

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
