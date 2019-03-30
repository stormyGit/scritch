import React from "react";
import ReactMarkdown from "react-markdown";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import PageTitle from "../Global/PageTitle";

import terms from "../../terms";

const styles = theme => ({
  card: {
    width: "100%",
    borderRadius: 0,
    paddingBottom: theme.spacing.unit * 8
  },
  content: {
    padding: theme.spacing.unit * 4
  },
  text: {
    fontWeight: 200,
    color: theme.palette.text.primary,
    fontFamily: "Roboto"
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main
  },
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0,
    paddingBottom: theme.spacing.unit * 8
  },
  gridPadder: {
    width: "100%",
    paddingLeft: theme.spacing.unit * 16,
    paddingRight: theme.spacing.unit * 16
  }
});

class Terms extends React.Component {
  state = {};

  renderContent() {
    const { classes, announcement, horizontal } = this.props;

    return (
      <CardContent className={classes.content} className={classes.text}>
        <ReactMarkdown
          renderers={{
            link: props => <a className={classes.link} {...props} />
          }}
          source={terms}
        />
      </CardContent>
    );
  }

  renderVertical() {
    const { classes, announcement, width } = this.props;

    return (
      <Grid
        container
        className={
          width !== "lg" && width !== "xl" ? classes.root : classes.gridPadder
        }
        spacing={8}
        style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
      >
        <Grid item xs={12}>
          <Card className={classes.card} elevation={0}>
            {this.renderContent()}
          </Card>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { horizontal } = this.props;

    return (
      <React.Fragment>
        <PageTitle>Terms of Use</PageTitle>
        {this.renderVertical()}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Terms));
