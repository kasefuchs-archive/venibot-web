import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  Link as RouterLink,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { Component, ReactNode } from "react";

class FooterBase extends Component<RouteComponentProps> {
  render(): ReactNode {
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
                      Условия использования
                    </Link>
                    <Link
                      underline={"none"}
                      component={RouterLink}
                      sx={{ "&:hover": { opacity: 0.7 } }}
                      to={"/privacy"}
                      variant="body2"
                      color={"inherit"}
                    >
                      Политика конфиденциальности
                    </Link>
                    <Link
                      underline={"none"}
                      component={RouterLink}
                      sx={{ "&:hover": { opacity: 0.7 } }}
                      to={"/cookies"}
                      variant="body2"
                      color={"inherit"}
                    >
                      Использование куки фаилов
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
                      Сервер поддержки
                    </Link>
                    <Link
                      underline={"none"}
                      sx={{ "&:hover": { opacity: 0.7 } }}
                      href={process.env.REACT_APP_DOCS_URL}
                      variant="body2"
                      color={"inherit"}
                    >
                      Документация
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
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", pt: 0.5 }}>
            <Typography variant={"caption"}>
              © 2020-{new Date().getFullYear()} — dmemsm & Kasefuchs | Все права
              защищены
            </Typography>
          </Box>
        </Container>
      </AppBar>
    );
  }
}

export const Footer = withRouter(FooterBase);
