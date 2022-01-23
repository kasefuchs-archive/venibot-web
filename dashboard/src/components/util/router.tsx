import { Component, ReactNode } from "react";
import { Route, Switch } from "react-router-dom";
import { Route as RouteData } from "../../_routes";

interface Props {
  routes: Array<RouteData>;
}

export class Router extends Component<Props> {
  render(): ReactNode {
    return (
      <Switch>
        {this.props.routes.map(({ path, Component }) => (
          <Route key={path} path={path}>
            {() => Component}
          </Route>
        ))}
      </Switch>
    );
  }
}
