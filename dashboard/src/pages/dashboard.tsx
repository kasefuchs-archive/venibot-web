import React, { Component, ReactNode } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { Drawer, LayoutBase, Loading, Shortcut } from "../components";
import { Assignment, ExpandMore, Paid, Widgets } from "@mui/icons-material";
import { AuthContext, ThemeContext } from "../context";
import { dark, light } from "../components/layout/theme";
import { isEqual } from "lodash";
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Server } from "../interfaces";
import { LoadingButton } from "@mui/lab";

interface Config {
  command_locale: string;
  locale: string;
  timezone: string;
  audit_enabled: boolean;
}

interface State {
  config: {
    new_data?: Config;
    old_data?: Config;
  };
  savingNow: boolean;
  timezones?: Array<{
    name: string;
    value: string;
    offset: number;
  }>;
  guild?: Server;
}

type Path = {
  guild: string;
};

class DashboardBase extends Component<RouteComponentProps<Path>, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: RouteComponentProps<Path>) {
    super(props);
    this.state = {
      savingNow: false,
      config: {
        new_data: undefined,
        old_data: undefined,
      },
      timezones: undefined,
    };
  }

  componentDidMount() {
    axios
      .get(new URL(`/timezones.json`, process.env.REACT_APP_API_URL).href)
      .then(({ data }) => this.setState({ timezones: data }));
    let repeats: number = 0;
    const authWaiter = setInterval(() => {
      if (++repeats === 15) clearInterval(authWaiter);
      if (!this.state.config.new_data && this.context.token) {
        clearInterval(authWaiter);
        axios
          .get(
            new URL(
              `/servers/${this.props.match.params.guild}/config`,
              process.env.REACT_APP_API_URL
            ).href,
            { headers: { Authorization: this.context.token?.raw as string } }
          )
          .then(({ data }) =>
            this.setState({ config: { new_data: data, old_data: data } })
          );
        axios
          .get(
            new URL(
              `/servers/${this.props.match.params.guild}`,
              process.env.REACT_APP_API_URL
            ).href,
            { headers: { Authorization: this.context.token?.raw as string } }
          )
          .then(({ data }) => this.setState({ guild: data }));
      }
    }, 1000);
  }

  render(): ReactNode {
    const loadingComplete: boolean = Boolean(
      this.state.config.new_data && this.state.timezones && this.state.guild
    );
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <LayoutBase>
            <Drawer variant="permanent">
              <Toolbar
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  px: [1],
                }}
              />
              <List>
                <Collapse in={loadingComplete}>
                  <ListItem
                    button
                    sx={{ pl: "12px", pt: "6px" }}
                    component={Link}
                    to={"/servers"}
                  >
                    <ListItemIcon>
                      <Avatar
                        sx={{ width: 32, height: 32 }}
                        src={
                          this.state.guild?.icon
                            ? `https://cdn.discordapp.com/icons/${
                                this.state.guild?.id
                              }/${this.state.guild?.icon}.${
                                this.state.guild?.icon.startsWith("a_")
                                  ? "gif"
                                  : "png"
                              }?size=32`
                            : undefined
                        }
                        variant="rounded"
                      >
                        {this.state.guild
                          ? this.state.guild.name.split(" ").length === 1
                            ? this.state.guild.name.split(" ")[0][0]
                            : this.state.guild.name.split(" ")[0][0] +
                              this.state.guild.name.split(" ")[1][0]
                          : undefined}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={this.state.guild?.name} />
                  </ListItem>
                  <Divider sx={{ my: 0.5 }} />
                </Collapse>
                <Shortcut.ListTab
                  targetValue={`${this.props.match.url}/common`}
                  currentValue={this.props.location.pathname}
                  icon={<Widgets />}
                  disabled={!loadingComplete}
                  label={"Общее"}
                />
                <Shortcut.ListTab
                  targetValue={`${this.props.match.url}/audit`}
                  tooltip={"Будет в ближайшем обновлении!"}
                  currentValue={this.props.location.pathname}
                  disabled
                  icon={<Assignment />}
                  label={"Аудит"}
                />
                <Shortcut.ListTab
                  targetValue={`${this.props.match.url}/economy`}
                  currentValue={this.props.location.pathname}
                  tooltip={"Будет в ближайшем обновлении!"}
                  icon={<Paid />}
                  label={"Экономика"}
                  disabled
                />
              </List>
            </Drawer>
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
                margin: "none",
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Toolbar />
              <Loading value={loadingComplete}>
                <Container maxWidth={"xl"} sx={{ px: 0 }}>
                  <Box sx={{ p: "12px", mt: 1 }}>
                    <Switch>
                      <Redirect
                        from={`/dashboard/:guild/`}
                        exact
                        to={`/dashboard/:guild/common`}
                      />
                      <Route path={`${this.props.match.url}/common`}>
                        <Accordion defaultExpanded>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>Основное</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                  <InputLabel id="interface-language-select-label">
                                    Язык интерфейса бота
                                  </InputLabel>
                                  <Select
                                    labelId="interface-language-select-label"
                                    label="Язык интерфейса бота"
                                    value={this.state.config.new_data?.locale}
                                    onChange={(event: SelectChangeEvent) =>
                                      this.updateConfig({
                                        locale: event.target.value,
                                      })
                                    }
                                  >
                                    <MenuItem value={"ru"}>Русский</MenuItem>
                                    <MenuItem value={"en"}>Английский</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                  <InputLabel id="commands-language-select-label">
                                    Язык команд бота
                                  </InputLabel>
                                  <Select
                                    labelId="commands-language-select-label"
                                    label="Язык команд бота"
                                    onChange={(event: SelectChangeEvent) =>
                                      this.updateConfig({
                                        command_locale: event.target.value,
                                      })
                                    }
                                    value={
                                      this.state.config.new_data?.command_locale
                                    }
                                  >
                                    <MenuItem value={"ru"}>Русский</MenuItem>
                                    <MenuItem value={"en"}>Английский</MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth sx={{ maxHeight: 120 }}>
                                  <InputLabel id="commands-language-select-label">
                                    Часовой пояс сервера
                                  </InputLabel>
                                  <Select
                                    labelId="commands-language-select-label"
                                    label="Часовой пояс сервера"
                                    value={this.state.config.new_data?.timezone}
                                    onChange={(event: SelectChangeEvent) =>
                                      this.updateConfig({
                                        timezone: event.target.value,
                                      })
                                    }
                                    MenuProps={{
                                      PaperProps: {
                                        sx: { maxHeight: "200px" },
                                      },
                                    }}
                                  >
                                    {this.state.timezones
                                      ?.sort((a, b) =>
                                        Number(a.offset > b.offset)
                                      )
                                      .map(({ name, value }) => (
                                        <MenuItem key={value} value={value}>
                                          {name}
                                        </MenuItem>
                                      ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Grid>
                          </AccordionDetails>
                        </Accordion>
                      </Route>
                    </Switch>
                  </Box>
                  <ThemeProvider
                    theme={theme.palette.mode === "dark" ? light : dark}
                  >
                    <Snackbar
                      open={
                        !isEqual(
                          this.state.config.old_data,
                          this.state.config.new_data
                        )
                      }
                      message={"Аккуратнее, вы не сохранили изменения!"}
                      anchorOrigin={{
                        horizontal: "center",
                        vertical: "bottom",
                      }}
                      action={
                        <ThemeProvider theme={theme}>
                          <Stack direction={"row"} spacing={0.5}>
                            <Button
                              color={"inherit"}
                              size="small"
                              onClick={() =>
                                this.updateConfig(this.state.config.old_data)
                              }
                              disabled={this.state.savingNow}
                            >
                              Сброс
                            </Button>
                            <LoadingButton
                              loading={this.state.savingNow}
                              variant={"contained"}
                              size="small"
                              onClick={() => this.saveConfig()}
                            >
                              Сохранить
                            </LoadingButton>
                          </Stack>
                        </ThemeProvider>
                      }
                    />
                  </ThemeProvider>
                </Container>
              </Loading>
            </Box>
          </LayoutBase>
        )}
      </ThemeContext.Consumer>
    );
  }

  private updateConfig(data: any) {
    this.setState({
      config: {
        new_data: Object.assign({}, this.state.config.new_data, data),
        old_data: this.state.config.old_data,
      },
    });
  }

  private saveConfig() {
    this.setState({ savingNow: true });
    axios
      .patch(
        new URL(
          `/servers/${this.props.match.params.guild}/config`,
          process.env.REACT_APP_API_URL
        ).href,
        this.state.config,
        { headers: { Authorization: this.context.token?.raw as string } }
      )
      .then(() => {
        this.setState({
          config: {
            old_data: this.state.config.new_data,
            new_data: this.state.config.new_data,
          },
          savingNow: false,
        });
      })
      .catch(() => this.setState({ savingNow: false }));
  }
}

export const Dashboard = withRouter(DashboardBase);
