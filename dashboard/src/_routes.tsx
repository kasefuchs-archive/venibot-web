import * as Pages from "./pages";
import MarkdownRenderer, { cookies, privacy, tos } from "./pages/markdown";

export interface Route {
  path: string;
  Component: any;
}

const routes: Array<Route> = [
  {
    path: "/servers",
    Component: <Pages.Servers />,
  },
  {
    path: "/dashboard/:guild",
    Component: <Pages.Dashboard />,
  },
  {
    path: "/tos",
    Component: <MarkdownRenderer path={tos} />,
  },
  {
    path: "/privacy",
    Component: <MarkdownRenderer path={privacy} />,
  },
  {
    path: "/cookies",
    Component: <MarkdownRenderer path={cookies} />,
  },
  {
    path: "/callback",
    Component: <Pages.Callback />,
  },
  {
    path: "/",
    Component: <Pages.Start />,
  },
];
export default routes;
