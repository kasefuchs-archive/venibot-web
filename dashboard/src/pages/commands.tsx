import {
  Apps,
  Build,
  Celebration,
  ExpandMore,
  Help
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Container, Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import axios from "axios";
import { Component, ReactNode } from "react";
import { TransProps, withTranslation } from "react-i18next";
import { Layout, Loading } from "../components";

const groupIcons = {
  all: <Apps />,
  utility: <Build />,
  fun: <Celebration />,
};

interface State {
  commands?: Array<{
    name: { [key: string]: string };
    description: { [key: string]: string };
    fullDescription: { [key: string]: string };
    type: number;
    key: string;
    group: string;
    usage?: { [key: string]: string };
    examples?: Array<{ [key: string]: string }>;
    options?: Array<{
      type: number;
      name: { [key: string]: string };
      description: { [key: string]: string };
      required?: boolean;
    }>;
  }>;
  group: string;
}

export class CommandsBase extends Component<TransProps<any>, State> {
  state: State = {
    commands: undefined,
    group: "all",
  };
  componentDidMount() {
    axios
      .get(new URL("/assets/commands.json", process.env.REACT_APP_API_URL).href)
      .then(({ data }) => this.setState({ commands: data }));
  }

  render(): ReactNode {
    const t = this.props.t!;

    const groups: Array<string> = [
      "all",
      ...new Set<string>(this.state.commands?.map(({ group }) => group)),
    ];
    return (
      <Layout>
        <Loading value={this.state.commands}>
          <Container sx={{pb: 2}}>
            <Typography mt={3} mb={1} pl={1} variant={"h5"}>
              {t("title")}
            </Typography>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} lg={3}>
                  <Stack spacing={2}>
                    <Paper>
                      <List
                        sx={{
                          "& > div": { borderRadius: "4px", m: 0.5 },
                          p: 0,
                        }}
                      >
                        {groups.map((group) => (
                          <ListItemButton
                            selected={this.state.group === group}
                            key={group}
                            onClick={() => this.setState({ group })}
                          >
                            <ListItemIcon>
                              {groupIcons[group as keyof typeof groupIcons]}
                            </ListItemIcon>
                            <ListItemText primary={t(`groups.${group}`)} />
                            <Chip
                              label={
                                this.state.commands?.filter(
                                  (command) =>
                                    command.group === group || group === "all"
                                ).length
                              }
                              sx={{
                                height: "24px",
                              }}
                            />
                          </ListItemButton>
                        ))}
                      </List>
                    </Paper>
                    <Box>
                      <Accordion defaultExpanded>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Box display={"inline-flex"}>
                            <Help />
                            <Typography pl={1}>{t("help.title")}</Typography>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box display={"inline-flex"}>
                            <Chip
                              label={"."}
                              sx={{
                                height: "24px",
                                width: "38px",
                                fontFamily: "monospace",
                                "& .MuiChip-label": { padding: 0 },
                              }}
                            />
                            <Typography
                              paddingLeft={0.5}
                              variant={"body2"}
                            >
                              — {t("help.defaultPrefix")}
                            </Typography>
                          </Box>
                          <Divider sx={{my: 1}}/>
                          <Typography variant={"subtitle2"}>
                            {t("help.syntax")}
                          </Typography>
                          <List dense disablePadding>
                            <ListItem disablePadding>
                              <ListItemText
                                primary={
                                  <Box display={"inline-flex"}>
                                    <Chip
                                      label={"[]"}
                                      sx={{
                                        height: "24px",
                                        width: "38px",
                                        fontFamily: "monospace",
                                        "& .MuiChip-label": { padding: 0 },
                                      }}
                                    />
                                    <Typography
                                      paddingLeft={0.5}
                                      variant={"body2"}
                                    >
                                      — {t("help.optional")}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                            <ListItem disablePadding>
                              <ListItemText
                                primary={
                                  <Box display={"inline-flex"}>
                                    <Chip
                                      label={"<>"}
                                      sx={{
                                        height: "24px",
                                        width: "38px",
                                        fontFamily: "monospace",
                                        "& .MuiChip-label": { padding: 0 },
                                      }}
                                    />
                                    <Typography
                                      paddingLeft={0.5}
                                      variant={"body2"}
                                    >
                                      — {t("help.required")}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={8} lg={9}>
                  <Paper>
                    {this.state.commands
                      ?.filter(
                        (command) =>
                          this.state.group === "all" ||
                          command.group === this.state.group
                      )
                      .map((command) => (
                        <Accordion disableGutters key={command.key}>
                          <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography>
                              <Chip
                                label={
                                  command.name[
                                    this.props.i18n?.language || "en"
                                  ]
                                }
                                sx={{
                                  height: "24px",
                                }}
                              />{" "}
                              —{" "}
                              {
                                command.description[
                                  this.props.i18n?.language || "en"
                                ]
                              }
                            </Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            <Typography variant={"body2"}>
                              {
                                (command.fullDescription ||
                                  command.description)[
                                  this.props.i18n?.language || "en"
                                ]
                              }
                            </Typography>

                            {command.usage ? (
                              <Box mt={1}>
                                <Typography variant={"h6"} fontSize={"16px"}>
                                  {t("commands.usage")}
                                </Typography>
                                <Chip
                                  label={
                                    command.usage[
                                      this.props.i18n?.language || "en"
                                    ]
                                  }
                                  sx={{
                                    fontFamily: "monospace",
                                    height: "24px",
                                    ml: 0.5,
                                  }}
                                />
                              </Box>
                            ) : undefined}
                            {command.examples ? (
                              <Box mt={1}>
                                <Typography variant={"h6"} fontSize={"16px"}>
                                  {t("commands.examples")}
                                </Typography>
                                <Stack spacing={0.5}>
                                  {command.examples.map((example) => (
                                    <Box>
                                      <Chip
                                        label={
                                          example[
                                            this.props.i18n?.language || "en"
                                          ]
                                        }
                                        sx={{
                                          fontFamily: "monospace",
                                          height: "24px",
                                          ml: 0.5,
                                        }}
                                      />
                                    </Box>
                                  ))}
                                </Stack>
                              </Box>
                            ) : undefined}
                          </AccordionDetails>
                        </Accordion>
                      ))}
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Loading>
      </Layout>
    );
  }
}

export const Commands = withTranslation("pages/commands")(CommandsBase);
