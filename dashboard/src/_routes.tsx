import * as Pages from "./pages";
import MarkdownRenderer from "./pages/markdown";

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
    Component: <MarkdownRenderer file={'tos'} />,
  },
  {
    path: "/privacy",
    Component: <MarkdownRenderer file={'privacy'} />,
  },
  {
    path: "/cookies",
    Component: <MarkdownRenderer file={'cookies'} />,
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
