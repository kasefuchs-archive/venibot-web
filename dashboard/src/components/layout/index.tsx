import { Box, Toolbar } from "@mui/material";
import React, { Component, ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";
import * as Themes from "./theme";

export class LayoutBase extends Component {
  render(): ReactNode {
    return (
      <>
        <Header />
        <Box sx={{ display: "flex" }}>{this.props.children}</Box>
      </>
    );
  }
}

export class Layout extends Component {
  render(): ReactNode {
    return (
      <LayoutBase>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Toolbar />
          {this.props.children}
          <Footer />
        </Box>
      </LayoutBase>
    );
  }
}

export { Themes, Footer };

