import React, {
  Component,
  createRef,
  Fragment,
  MutableRefObject,
  ReactNode,
} from "react";
import { Layout, Loading } from "../components";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { AuthContext } from "../context";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Group,
  Layers,
  Security,
  Settings,
  Speaker,
  Widgets,
} from "@mui/icons-material";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import plural from "plural-ru";

interface State {
  stats?: {
    guildCount: number;
    userCount: number;
  };
}

const featuresCard: Array<{
  name: string;
  description: string;
  Icon: any;
}> = [
  {
    name: "Музыка",
    description:
      "Удобная в использовании музыка точно не даст вам заскучать и станет отличной заменой другим музыкальным ботам",
    Icon: Speaker,
  },
  {
    name: "Утилиты",
    description:
      "Используйте утилиты, встроенные в бота, чтобы быстро и удобно выполнять различные задачи и получать необходимую информацию",
    Icon: Widgets,
  },
  {
    name: "Автомодерация",
    description:
      "Настройте автомодерацию один раз и отдыхайте. Она накажет всех нарушителей, если вы будете заняты!",
    Icon: Security,
  },
  {
    name: "Настройки",
    description:
      "Настраивайте всё, что только захотите, начиная от префикса и заканчивая приветствиями и прощаниями участников",
    Icon: Settings,
  },
];

export class Start extends Component<any, State> {
  private featuresRef: MutableRefObject<HTMLDivElement> =
    createRef() as MutableRefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(new URL("/stats", process.env.REACT_APP_API_URL).href)
      .then(({ data }) =>
        this.setState({
          stats: data,
        })
      );
  }

  render(): ReactNode {
    return (
      <Layout>
        <Loading value={this.state.stats}>
          <Fragment>
            <Box
              sx={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))",
                pt: 8,
                pb: 6,
              }}
            >
              <Container
                maxWidth="sm"
                sx={{
                  height: "50vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                >
                  VeniBot
                </Typography>
                <Divider sx={{ mb: 1.5 }} />
                <Typography
                  variant="h6"
                  align="center"
                  color="text.secondary"
                  paragraph
                >
                  Многофункциональный Discord-бот для вашего сервера
                </Typography>
                <Grid
                  spacing={2}
                  display={"flex"}
                  justifyContent="center"
                  container
                >
                  <Grid item>
                    <Button
                      variant="contained"
                      href={`${process.env.REACT_APP_API_URL}/auth/add`}
                      startIcon={<FontAwesomeIcon icon={faDiscord} />}
                    >
                      Добавить в Discord
                    </Button>
                  </Grid>
                  <Grid item>
                    <AuthContext.Consumer>
                      {({ user }) =>
                        user ? (
                          <Button
                            variant="outlined"
                            component={Link}
                            to={"/servers/"}
                            color="secondary"
                            startIcon={<Layers />}
                          >
                            Мои серверы
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              this.featuresRef.current.scrollIntoView({
                                behavior: "smooth",
                              })
                            }
                          >
                            Подробнее
                          </Button>
                        )
                      }
                    </AuthContext.Consumer>
                  </Grid>
                </Grid>
              </Container>
            </Box>
            <Box
              sx={{
                height: "198px",
              }}
            >
              <svg
                fill={"rgba(255, 255, 255, 0.09)"}
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86 82.39-16.72 168.19-17.73 250.45-.39C823.78 31 906.67 72 985.66 92.83c70.05 18.48 146.53 26.09 214.34 3V0H0v27.35a600.21 600.21 0 00321.39 29.09z" />
              </svg>
            </Box>
            <Container
              sx={{ zIndex: 1, pb: 4 }}
              maxWidth="md"
              ref={this.featuresRef}
            >
              <Typography
                component="h4"
                variant="h4"
                align="center"
                color="text.secondary"
                sx={{
                  pb: 2,
                }}
              >
                Что-же умеет VeniBot?
              </Typography>
              <Box>
                <Grid container>
                  {featuresCard.map(({ name, description, Icon }, key) => (
                    <Grid item sx={{ py: 1 }} xs={12} key={key}>
                      <Paper elevation={4}>
                        <Grid
                          container
                          sx={{
                            display: "flex",
                            flexDirection: !(key % 2) ? "row-reverse" : "row",
                          }}
                          spacing={0}
                        >
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={9}
                            sx={{ my: 2, px: 2 }}
                          >
                            <Typography>
                              <b>{name}</b>
                            </Typography>
                            <Typography>{description}</Typography>
                          </Grid>
                          <Grid
                            item
                            xs={3}
                            sx={{ display: { xs: "none", md: "block" } }}
                          >
                            <Icon
                              sx={{
                                width: "100%",
                                height: "100%",
                                opacity: 0.85,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Typography
                component="h4"
                variant="h4"
                align="center"
                color="text.secondary"
                sx={{
                  py: 2,
                }}
              >
                Мы растём!
              </Typography>
              <Box>
                <Grid container>
                  <Grid item xs={6}>
                    <Stack
                      sx={{
                        display: "block",
                        textAlign: "center",
                        lineHeight: "0px",
                      }}
                    >
                      <Layers
                        sx={{
                          fontSize: "5rem",
                        }}
                      />
                      <Typography variant={"h5"}>
                        {this.state.stats?.guildCount}
                      </Typography>
                      <Typography variant={"h6"}>
                        {plural(
                          this.state.stats?.guildCount!,
                          "сервер",
                          "сервера",
                          "серверов"
                        )}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={6}>
                    <Stack
                      sx={{
                        display: "block",
                        textAlign: "center",
                        lineHeight: "0px",
                      }}
                    >
                      <Group
                        sx={{
                          fontSize: "5rem",
                        }}
                      />
                      <Typography variant={"h5"}>
                        {this.state.stats?.userCount}
                      </Typography>
                      <Typography variant={"h6"}>
                        {plural(
                          this.state.stats?.userCount!,
                          "пользователь",
                          "пользователя",
                          "пользователей"
                        )}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>

              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                sx={{
                  py: 3,
                }}
              >
                ...и вы можете помочь нам!
              </Typography>
              <Box
                sx={{
                  textAlign: "center",
                }}
              >
                <Button
                  variant="contained"
                  href={`${process.env.REACT_APP_API_URL}/auth/add`}
                  startIcon={<FontAwesomeIcon icon={faDiscord} />}
                >
                  Добавить в Discord
                </Button>
              </Box>
            </Container>
          </Fragment>
        </Loading>
      </Layout>
    );
  }
}
