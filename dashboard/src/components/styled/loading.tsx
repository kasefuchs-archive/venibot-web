import { LinearProgress } from "@mui/material";
import { Component, ReactNode } from "react";

export class Loading extends Component<{
  value: any;
  indicator?: ReactNode;
}> {
  render(): ReactNode {
    return Boolean(this.props.value)
      ? this.props.children
      : this.props.indicator ?? <LinearProgress />;
  }
}
