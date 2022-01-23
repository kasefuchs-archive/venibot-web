import { Component, ReactNode } from "react";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";

class CallbackBase extends Component<RouteComponentProps> {
  componentDidMount() {
    const { token } = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );
    if (token) localStorage.setItem("auth.token", token);
    this.props.history.push("/");
  }
  render(): ReactNode {
    return <></>;
  }
}

export const Callback = withRouter(CallbackBase);
