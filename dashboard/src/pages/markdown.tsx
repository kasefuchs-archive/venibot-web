import {Component, ReactNode} from "react";
import {Layout, Loading} from "../components";
import axios, {AxiosError} from "axios";
import {Box, Container, Link, Typography} from "@mui/material";
import ReactMarkdown from "markdown-to-jsx";
import {TransProps, withTranslation} from "react-i18next";

interface State {
  file?: string;
}

interface PropsBase {
  file: string;
}

type Props = PropsBase & TransProps<any>;

function MarkdownListItem(props: any) {
  return (
    <Box
      component="li"
      sx={{mt: 0.5, typography: "body1", listStyleType: null}}
      {...props}
    />
  );
}

class MarkdownRenderer extends Component<Props, State> {
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
        props: {gutterBottom: true, variant: "h5", component: "h2"},
      },
      h3: {
        component: Typography,
        props: {gutterBottom: true, variant: "h6", component: "h3"},
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
    const locale = this.props.i18n?.language!;
    axios
      .get(`/locales/${locale}/markdown/${this.props.file}.md`)
      .then(({data}) => this.setState({file: data})).catch((e: AxiosError) => {
        if (e.response?.status === 404) this.props.i18n?.changeLanguage('en-US');
      }
    );
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any) {
    if (this.props.t !== prevProps.t) this.componentDidMount();
  }

  render(): ReactNode {
    return (
      <Layout>
        <Loading value={this.state.file}>
          <Container sx={{py: 2}}>
            <ReactMarkdown options={this.style} children={this.state.file!}/>
          </Container>
        </Loading>
      </Layout>
    );
  }
}

export default withTranslation()(MarkdownRenderer);