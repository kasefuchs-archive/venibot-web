import React, { useEffect, useState } from "react";
import { ThemeContext, AuthContext } from "./context";
import {
  Button,
  CssBaseline,
  Stack,
  Theme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import { dark, light } from "./components/layout/theme";
import "./styles";
import { Token, User } from "./interfaces";
import { Buffer } from "buffer";
import { BrowserRouter, Link } from "react-router-dom";
import Routes from "./_routes";
import { Router, Snackbar } from "./components";
import { useTranslation } from "react-i18next";

function App() {
  const [theme, setTheme] = useState<Theme>(dark);
  const [user, setUser] = useState<null | User>(null);
  const [token, setToken] = useState<null | Token>(null);
  const [cookiesAccepted, setCookiesAccept] = useState<boolean>(true);
  const { t } = useTranslation("meta");

  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  async function login() {
    const token = localStorage.getItem("auth.token");
    if (!token) return false;
    try {
      const tokenData: Token = JSON.parse(
        Buffer.from(token.split(".")[1], "base64").toString()
      );
      tokenData.raw = token;
      if (tokenData.exp < Math.floor(Date.now() / 1000)) return false;
      const response = await axios.get(`https://discord.com/api/v9/users/@me`, {
        headers: {
          Authorization: `Bearer ${tokenData.accessToken}`,
        },
      });
      setToken(tokenData);
      setUser(response.data);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  useEffect((): void => {
    setCookiesAccept(localStorage.getItem("cookies_accepted") === "true");
    login();
    // if (!localStorage.getItem("theme"))
    //   setTheme(prefersDarkMode ? dark : light);
    // else setTheme(localStorage.getItem("theme") === "dark" ? dark : light);
    window.postMessage(
      {
        devtoolsEnabled: false,
        vueDetected: true,
        nuxtDetected: true,
      },
      "*"
    );
  }, []);

  return (
    <BrowserRouter>
      <ThemeContext.Provider
        value={{
          theme: theme,
          switchTheme: () => {
            localStorage.setItem(
              "theme",
              theme.palette.mode === "dark" ? "light" : "dark"
            );
            setTheme(theme.palette.mode === "dark" ? light : dark);
          },
        }}
      >
        <AuthContext.Provider
          value={{
            user: user,
            token: token,
            login: login,
            logout: () => {
              setUser(null);
              setToken(null);
              localStorage.removeItem("auth.token");
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router routes={Routes} />
            <Snackbar message={t("cookies.text")} open={!cookiesAccepted} sx={{ maxWidth: "sm" }}>
              <Stack direction={"row"} spacing={0.5}>
                <Button color={"secondary"} component={Link} to={"/cookies"}>
                  {t("cookies.info")}
                </Button>
                <Button
                  variant={"contained"}
                  onClick={() => {
                    localStorage.setItem("cookies_accepted", "true");
                    setCookiesAccept(true);
                  }}
                >
                  {t("cookies.accept")}
                </Button>
              </Stack>
            </Snackbar>
          </ThemeProvider>
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
