import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Zoom
} from "@mui/material";
import { Component, Fragment, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context";

interface Props {
  targetValue: string;
  currentValue: string;
  icon: ReactElement;
  label: ReactNode;
  disabled?: boolean;
  tooltip?: string;
}

export class ListTab extends Component<Props> {
  render(): ReactNode {
    return (
      <Fragment>
        <ThemeContext.Consumer>
          {({ theme }) => (
            <Tooltip
              title={this.props.tooltip || ""}
              placement={"right"}
              TransitionComponent={Zoom}
              arrow
            >
              <div>
                <ListItem
                  button
                  disabled={Boolean(this.props.disabled)}
                  component={Link}
                  to={this.props.targetValue}
                  selected={this.props.targetValue === this.props.currentValue}
                  sx={{
                    borderRight:
                      this.props.targetValue === this.props.currentValue
                        ? `2px solid ${
                            theme.palette.mode === "light"
                              ? theme.palette.primary.light
                              : theme.palette.primary.dark
                          }`
                        : undefined,
                  }}
                >
                  <ListItemIcon>{this.props.icon}</ListItemIcon>
                  <ListItemText primary={this.props.label} />
                </ListItem>
              </div>
            </Tooltip>
          )}
        </ThemeContext.Consumer>
      </Fragment>
    );
  }
}
