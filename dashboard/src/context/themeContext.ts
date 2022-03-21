import { Theme } from "@mui/material";
import { createContext } from "react";
import { Themes } from "../components/layout";

export interface ThemeContextOptions {
  theme: Theme;
  switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextOptions>({
  theme: Themes.dark,
  switchTheme: (): void => {},
});
