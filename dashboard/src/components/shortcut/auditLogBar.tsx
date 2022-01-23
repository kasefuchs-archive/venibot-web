import React, { ChangeEvent, Component, ReactNode } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Fab,
  Fade,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Switch,
  Typography,
  Zoom,
} from "@mui/material";
import { Edit, Save, Settings, Tune } from "@mui/icons-material";
import { Loading } from "../styled";
import { isEqual } from "lodash";

interface State {
  [key: string]: {};
}

interface Props {
  guild_id: string;
  editOpen: (open: boolean) => void;
  open: boolean;
}

export class AuditLogBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render(): ReactNode {
    return (
      <Accordion disableGutters expanded={this.props.open}>
        <AccordionSummary
          expandIcon={
            <Zoom in={!isEqual(this.state, {}) && this.props.open}>
              <IconButton>
                <Settings />
              </IconButton>
            </Zoom>
          }
        >
          <Typography>
            <Switch
              checked={this.props.open}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                this.props.editOpen(event.target.checked)
              }
            />{" "}
            Аудит
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Loading
            value={!isEqual(this.state, {})}
            indicator={
              <Box textAlign={"center"}>
                <CircularProgress />
              </Box>
            }
          >
            <Divider>
              <Chip label="Сообщения" />
            </Divider>

            <ListItem>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    backgroundColor: "#FFA000",
                    color: "white",
                  }}
                >
                  <Edit />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={"Сообщение было изменено"} />
              <Stack direction="row">
                <IconButton>
                  <Tune />
                </IconButton>
                <Switch />
              </Stack>
            </ListItem>
            <Typography mt={"48px"} />
            <Fade in={this.props.open}>
              <Fab
                variant="extended"
                color="primary"
                size={"small"}
                sx={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  p: ".75rem",
                }}
              >
                Сохранить
                <Save sx={{ ml: 1 }} />
              </Fab>
            </Fade>
          </Loading>
        </AccordionDetails>
      </Accordion>
    );
  }
}
