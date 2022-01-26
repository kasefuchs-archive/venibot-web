import {Avatar, Box, Button, Card, Container, Divider, Grid, Paper, Stack, Typography,} from "@mui/material";
import React, {Component, ReactNode} from "react";
import {Layout, Loading} from "../components";
import {Build, Queue} from "@mui/icons-material";
import {Server} from "../interfaces";
import {AuthContext} from "../context";
import axios from "axios";
import {Link} from "react-router-dom";
import {TransProps, withTranslation} from "react-i18next";

interface State {
  servers: Array<Server> | null;
}

class ServersBase extends Component<TransProps<any>, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      servers: null,
    };
  }

  componentDidMount() {
    let repeats: number = 0;
    const authWaiter = setInterval(() => {
      if (++repeats === 15) clearInterval(authWaiter);
      if (!this.state.servers && this.context.token) {
        clearInterval(authWaiter);
        axios
          .get(new URL("/servers", process.env.REACT_APP_API_URL).href, {
            headers: {
              Authorization: this.context.token?.raw as string,
            },
          })
          .then(({data}: { data: Array<Server> }) =>
            this.setState({servers: data})
          );
      }
    }, 1000);
  }

  render(): ReactNode {
    const t = this.props.t!;
    return (
      <Layout>
        <Loading value={this.state.servers}>
          <Container sx={{p: "12px", mt: 1}}>
            <Grid container spacing={1}>
              {this.state.servers
                ?.sort((server: Server) => +!server.active)
                .map((server: Server) => (
                  <Grid item xs={12} sm={6} md={4} key={server.id}>
                    <Card>
                      <Paper elevation={4}>
                        <Box sx={{p: 2, display: "flex"}}>
                          <Avatar
                            variant="rounded"
                            src={
                              server.icon
                                ? `https://cdn.discordapp.com/icons/${
                                  server.id
                                }/${server.icon}.${
                                  server.icon?.startsWith("a_")
                                    ? "gif"
                                    : "png"
                                }?size=40`
                                : undefined
                            }
                          >
                            {server.name.split(" ").length === 1
                              ? server.name.split(" ")[0][0]
                              : server.name.split(" ")[0][0] +
                              server.name.split(" ")[1][0]}
                          </Avatar>
                          <Stack
                            spacing={0.5}
                            alignItems="flex-start"
                            sx={{
                              mx: 2,
                              flexGrow: 1,
                              "& svg": {
                                fontSize: 20,
                                verticalAlign: "bottom",
                                mr: 0.5,
                              },
                            }}
                          >
                            <Typography
                              noWrap
                              textOverflow={"ellipsis"}
                              overflow={"hidden"}
                              variant={"body1"}
                            >
                              {server.name}
                            </Typography>
                          </Stack>
                        </Box>
                        <Divider/>
                        <Stack direction="row" sx={{px: 1, py: 1}}>
                          {server.active ? (
                            <Button
                              sx={{ml: "auto"}}
                              component={Link}
                              to={`/dashboard/${server.id}`}
                              color={"inherit"}
                              endIcon={<Build/>}
                            >
                              {t('buttons.settings')}
                            </Button>
                          ) : (
                            <Button
                              sx={{ml: "auto"}}
                              color={"inherit"}
                              href={`${new URL(
                                `/auth/add`,
                                process.env.REACT_APP_API_URL
                              ).toString()}?guild=${server.id}`}
                              endIcon={<Queue/>}
                            >
                              {t('buttons.invite')}
                            </Button>
                          )}
                        </Stack>
                      </Paper>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Loading>
      </Layout>
    );
  }
}

export const Servers = withTranslation("pages/servers")(ServersBase);