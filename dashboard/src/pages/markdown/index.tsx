import tos from "./tos.md";
import cookies from "./cookies.md";
import privacy from "./privacy.md";
import { Component, ReactNode } from "react";
import { Layout, Loading } from "../../components";
import axios from "axios";
import { Box, Container, Link, Typography } from "@mui/material";
import ReactMarkdown from "markdown-to-jsx";

export { tos, cookies, privacy };

interface State {
  file?: string;
}

interface Props {
  path: string;
}

function MarkdownListItem(props: any) {
  return (
    <Box
      component="li"
      sx={{ mt: 0.5, typography: "body1", listStyleType: null }}
      {...props}
    />
  );
}

export default class MarkdownRenderer extends Component<Props, State> {
  public style = {
    overrides: {
      h1: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: "h4",
          component: "h1",
        },
      },
      h2: {
        component: Typography,
        props: { gutterBottom: true, variant: "h5", component: "h2" },
      },
      h3: {
        component: Typography,
        props: { gutterBottom: true, variant: "h6", component: "h3" },
      },
      h4: {
        component: Typography,
        props: {
          gutterBottom: true,
          variant: "caption",
          paragraph: true,
        },
      },
      p: {
        component: Typography,
        props: {
          paragraph: true,
        },
      },
      a: {
        component: Link,
        props: {
          underline: "none",
        },
      },
      ul: {
        component: Box,
        props: {
          sx: {
            m: "4px",
            pl: 4,
          },
        },
      },
      li: {
        component: MarkdownListItem,
      },
      code: {
        component: Typography,
        props: {
          sx: {
            color: "rgba(255, 255, 255, 0.8)",
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "3px",
            padding: "2px 6px",
          },
          paragraph: false,
          component: "code",
        },
      },
    },
  };

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(this.props.path)
      .then(({ data }) => this.setState({ file: data }));
  }

  render(): ReactNode {
    return (
      <Layout>
        <Loading value={this.state.file}>
          <Container sx={{ py: 2 }}>
            <ReactMarkdown options={this.style} children={this.state.file!} />
          </Container>
        </Loading>
      </Layout>
    );
  }
}
