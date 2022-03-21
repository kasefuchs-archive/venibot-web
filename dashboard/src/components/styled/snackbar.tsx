import {
  Snackbar as MuiSnackbar,
  SnackbarProps,
  ThemeProvider
} from "@mui/material";
import { Component, ReactNode } from "react";
import { ThemeContext } from "../../context";
import { dark, light } from "../layout/theme";

type Props = SnackbarProps;

export class Snackbar extends Component<Props> {
  render(): ReactNode {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <ThemeProvider theme={theme.palette.mode === "dark" ? light : dark}>
            <MuiSnackbar
              open={this.props.open}
              message={this.props.message}
              anchorOrigin={this.props.anchorOrigin}
              sx={this.props.sx}
              action={
                <ThemeProvider theme={theme}>
                  {this.props.children}
                </ThemeProvider>
              }
            />
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    );
  }
}
