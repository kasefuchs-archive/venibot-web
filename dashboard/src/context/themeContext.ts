import { Theme } from "@mui/material";
import { Themes } from "../components/layout";
import { createContext } from "react";

export interface ThemeContextOptions {
  theme: Theme;
  switchTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextOptions>({
  theme: Themes.dark,
  switchTheme: (): void => {},
});
