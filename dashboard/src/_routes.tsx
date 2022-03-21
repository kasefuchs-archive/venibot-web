import * as Pages from "./pages";

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
    Component: <Pages.MarkdownRenderer file={"tos"} />,
  },
  {
    path: "/commands",
    Component: <Pages.Commands />,
  },
  {
    path: "/privacy",
    Component: <Pages.MarkdownRenderer file={"privacy"} />,
  },
  {
    path: "/cookies",
    Component: <Pages.MarkdownRenderer file={"cookies"} />,
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
