import { createTheme, Theme } from "@mui/material";

const base = {
  typography: {
    fontFamily: ["Montserrat", "Roboto", "sans-serif"].join(","),
  },
};

const palette = {
  primary: {
    main: "#539129",
    light: "#84c258",
    dark: "#216300",
    contrastText: "#fff",
  },
  secondary: {
    light: "#6efcff",
    main: "#21c9e2",
    dark: "#0098b0",
    contrastText: "#000",
  },
};

export const dark: Theme = createTheme({
  ...base,
  palette: { mode: "dark", ...palette },
});
export const light: Theme = createTheme({ ...base, palette });
