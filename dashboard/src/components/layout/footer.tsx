import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  ListItemButton,
  ListSubheader,
  Menu,
  Stack,
  Typography,
} from "@mui/material";
import {
  Link as RouterLink,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { compose } from "redux";
import { Component, ComponentClass, Fragment, ReactNode } from "react";
import { TransProps, withTranslation } from "react-i18next";
import { DarkMode, LightMode, Translate } from "@mui/icons-material";
import { ThemeContext } from "../../context";

type Props = RouteComponentProps & TransProps<any>;

interface State {
  localeMenuAnchor: null | HTMLElement;
}

class FooterBase extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      localeMenuAnchor: null,
    };
  }

  render(): ReactNode {
    const t = this.props.t!;
    const i18n = this.props.i18n!;

    return (
      <AppBar position="relative" component="footer" sx={{ mt: "auto" }}>
        <Container sx={{ p: 2 }} maxWidth={"lg"}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              sx={{
                textAlign: "center",
                m: "auto",
                pb: 1,
              }}
            >
              <Button color={"inherit"} component={RouterLink} to={"/"}>
                <Avatar sx={{ mr: ".5rem" }} src={"/logo192.png"} />
                <Typography
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ textTransform: "none" }}
                >
                  VeniBot
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <Grid container spacing={0.5}>
                <Grid item xs>
                  <Stack>
                    <Link
                      underline={"none"}
                      component={RouterLink}
                      sx={{ "&:hover": { opacity: 0.7 } }}
                      to={"/tos"}
                      variant="body2"
                      color={"inherit"}
                    >
                      {t("tos")}
                    </Link>
                    <Link
                      underline={"none"}
                      component={RouterLink}
                      sx={{ "&:hover": { opacity: 0.7 } }}
                      to={"/privacy"}
                      variant="body2"
                      color={"inherit"}
                    >
                      {t("privacy")}
                    </Link>
                    <Link
                      underline={"none"}
                      component={RouterLink}
                      sx={{ "&:hover": { opacity: 0.7 } }}
                      to={"/cookies"}
                      variant="body2"
                      color={"inherit"}
                    >
                      {t("cookies")}
                    </Link>
                  </Stack>
                </Grid>
                <Grid item xs>
                  <Stack>
                    <Link
                      underline={"none"}
                      sx={{ "&:hover": { opacity: 0.7 } }}
                      href={
                        new URL("/auth/support", process.env.REACT_APP_API_URL)
                          .href
                      }
                      variant="body2"
                      color={"inherit"}
                    >
                      {t("supportServer")}
                    </Link>
                    <Link
                      underline={"none"}
                      sx={{ "&:hover": { opacity: 0.7 } }}
                      href={process.env.REACT_APP_DOCS_URL}
                      variant="body2"
                      color={"inherit"}
                    >
                      {t("docs")}
                    </Link>
                    <Link
                      underline={"none"}
                      sx={{ "&:hover": { opacity: 0.7 } }}
                      href={process.env.REACT_APP_KARASIQ_URL}
                      variant="body2"
                      color={"inherit"}
                    >
                      Powered By KARASIQ.space
                    </Link>
                  </Stack>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Box
                    sx={{
                      margin: "auto",
                    }}
                  >
                    <ThemeContext.Consumer>
                      {({ theme, switchTheme }) => (
                        <Stack>
                          <IconButton
                            onClick={({ currentTarget }) =>
                              this.setState({ localeMenuAnchor: currentTarget })
                            }
                          >
                            <Translate />
                          </IconButton>

                          <Menu
                            anchorEl={this.state.localeMenuAnchor}
                            keepMounted
                            open={Boolean(this.state.localeMenuAnchor)}
                            onClose={() =>
                              this.setState({ localeMenuAnchor: null })
                            }
                            onClick={() =>
                              this.setState({ localeMenuAnchor: null })
                            }
                            transformOrigin={{
                              horizontal: "right",
                              vertical: "top",
                            }}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "bottom",
                            }}
                            MenuListProps={{ sx: { py: 0 } }}
                          >
                            <ListSubheader>{t("editLocale")}</ListSubheader>
                            {["en-US", "ru"].map((lang) => (
                              <ListItemButton
                                selected={i18n.language === lang}
                                key={lang}
                                onClick={() => i18n.changeLanguage(lang)}
                              >
                                {t(`meta:languages.${lang}`)}
                              </ListItemButton>
                            ))}
                          </Menu>
                          <Fragment>
                            <IconButton onClick={() => switchTheme()} disabled>
                              {theme.palette.mode === "dark" ? (
                                <DarkMode />
                              ) : (
                                <LightMode />
                              )}
                            </IconButton>
                          </Fragment>
                        </Stack>
                      )}
                    </ThemeContext.Consumer>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", pt: 0.5 }}>
            <Typography variant={"caption"}>
              {t("copyright", { year: new Date().getFullYear() })}
            </Typography>
          </Box>
        </Container>
      </AppBar>
    );
  }
}

export const Footer = compose(
  withRouter,
  withTranslation(["components/footer", "meta"])
)(FooterBase) as ComponentClass;
