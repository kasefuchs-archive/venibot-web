import { Home } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import React, { Component, ErrorInfo, ReactNode } from "react";
import {
  TransProps,
  withTranslation,
  WithTranslationProps,
} from "react-i18next";
import { Link } from "react-router-dom";
import { Layout } from "../layout";

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorHandlerBase extends Component<TransProps<any>, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      const t = this.props.t!;
      return (
        <Layout>
          <Box
            sx={{
              zIndex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Stack
              spacing={1.5}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography variant="h2">{t("title")}</Typography>
              <Box>
                <Button
                  startIcon={<Home />}
                  component={Link}
                  to={"/"}
                  variant="contained"
                >
                  {t("go_home")}
                </Button>
              </Box>
            </Stack>
          </Box>
          <Box
            sx={{
              backgroundImage: "",
              backgroundSize: "cover",
              filter: "blur(12px)",
              width: "100%",
              position: "absolute",
              backgroundPosition: "center",
              zIndex: 0,
              height: "100%",
            }}
          />
        </Layout>
      );
    }
    return this.props.children;
  }
}

export const ErrorHandler = withTranslation("pages/error")(ErrorHandlerBase);
