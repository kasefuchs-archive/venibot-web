import React, { Component, ComponentClass, ReactNode } from "react";
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
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { Drawer, LayoutBase, Loading, Shortcut, Snackbar } from "../components";
import { Assignment, ExpandMore, Paid, Widgets } from "@mui/icons-material";
import { AuthContext, ThemeContext } from "../context";
import { dark, light } from "../components/layout/theme";
import { isEqual } from "lodash";
import { Link, Redirect, Route, Switch, withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import { Server } from "../interfaces";
import { LoadingButton } from "@mui/lab";
import { compose } from "redux";
import { TransProps, withTranslation } from "react-i18next";

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
type Props = RouteComponentProps<Path> & TransProps<any>;

class DashboardBase extends Component<Props, State> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;

  constructor(props: Props) {
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
      .get(
        new URL(`/assets/timezones.json`, process.env.REACT_APP_API_URL).href
      )
      .then(({ data }) => this.setState({ timezones: data }));
    if (localStorage.getItem("auth.token")) {
      let repeats: number = 0;
      const authWaiter = setInterval(() => {
        if (++repeats === 5) clearInterval(authWaiter);
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
    } else throw new Error("Forbidden");
  }

  render(): ReactNode {
    const t = this.props.t!;
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
                  label={t("tabs.common")}
                />
                <Shortcut.ListTab
                  targetValue={`${this.props.match.url}/audit`}
                  currentValue={this.props.location.pathname}
                  disabled
                  tooltip={t("tabs.comingSoon")}
                  icon={<Assignment />}
                  label={t("tabs.audit")}
                />
                <Shortcut.ListTab
                  targetValue={`${this.props.match.url}/economy`}
                  currentValue={this.props.location.pathname}
                  tooltip={t("tabs.comingSoon")}
                  icon={<Paid />}
                  label={t("tabs.economy")}
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
                      <Route path={`${this.props.match.url}/common`} exact>
                        <Accordion defaultExpanded>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>{t("common.basic.title")}</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                  <InputLabel id="interface-language-select-label">
                                    {t("common.basic.interfaceLanguage")}
                                  </InputLabel>
                                  <Select
                                    labelId="interface-language-select-label"
                                    label={t("common.basic.interfaceLanguage")}
                                    value={this.state.config.new_data?.locale}
                                    onChange={(event: SelectChangeEvent) =>
                                      this.updateConfig({
                                        locale: event.target.value,
                                      })
                                    }
                                  >
                                    <MenuItem value={"ru"}>
                                      {t("meta:languages.ru")}
                                    </MenuItem>
                                    <MenuItem value={"en"}>
                                      {t("meta:languages.en-US")}
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <FormControl fullWidth>
                                  <InputLabel id="commands-language-select-label">
                                    {t("common.basic.commandLanguage")}
                                  </InputLabel>
                                  <Select
                                    labelId="commands-language-select-label"
                                    label={t("common.basic.commandLanguage")}
                                    onChange={(event: SelectChangeEvent) =>
                                      this.updateConfig({
                                        command_locale: event.target.value,
                                      })
                                    }
                                    value={
                                      this.state.config.new_data?.command_locale
                                    }
                                  >
                                    <MenuItem value={"ru"}>
                                      {t("meta:languages.ru")}
                                    </MenuItem>
                                    <MenuItem value={"en"}>
                                      {t("meta:languages.en-US")}
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                              <Grid item xs={12}>
                                <FormControl fullWidth sx={{ maxHeight: 120 }}>
                                  <InputLabel id="commands-language-select-label">
                                    {t("common.basic.timezone")}
                                  </InputLabel>
                                  <Select
                                    labelId="commands-language-select-label"
                                    label={t("common.basic.timezone")}
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
                      <Route path={`${this.props.match.url}/audit`} exact>
                        xd
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
                      message={t("snackbar.save.message")}
                      anchorOrigin={{
                        horizontal: "center",
                        vertical: "bottom",
                      }}
                    >
                      <Stack direction={"row"} spacing={0.5}>
                        <Button
                          color={"inherit"}
                          size="small"
                          onClick={() =>
                            this.updateConfig(this.state.config.old_data)
                          }
                          disabled={this.state.savingNow}
                        >
                          {t("snackbar.save.reset")}
                        </Button>
                        <LoadingButton
                          loading={this.state.savingNow}
                          variant={"contained"}
                          size="small"
                          onClick={() => this.saveConfig()}
                        >
                          {t("snackbar.save.save")}
                        </LoadingButton>
                      </Stack>
                    </Snackbar>
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
        this.state.config.new_data,
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

export const Dashboard = compose(
  withRouter,
  withTranslation(["pages/dashboard", "meta"])
)(DashboardBase) as ComponentClass;
