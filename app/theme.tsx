"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#ffb300",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#ffb300",
        },
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default theme;
