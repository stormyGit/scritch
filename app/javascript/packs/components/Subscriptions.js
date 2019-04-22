import React from "react";
import Media from "./Media/Media";
import PageTitle from "./Global/PageTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Fursuits from "./Fursuits/Fursuits";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "./withCurrentSession";

const styles = theme => ({
  root: {
    flexGrow: 1
  }
});

class Subscriptions extends React.Component {
  state = {
    tab: "media"
  };

  renderMedia() {
    return (
      <Media
        filter="subscriptions_users"
        withSubsClear={true}
        {...this.props}
      />
    );
  }

  renderFursuits() {
    return (
      <Media
        filter="subscriptions_fursuits"
        withSubsClear={true}
        {...this.props}
      />
    );
  }

  renderMakers() {
    return (
      <Fursuits
        filter="subscriptions_fursuits"
        withSubsClear={true}
        {...this.props}
      />
    );
  }

  render() {
    const { classes, width } = this.props;

    return (
      <React.Fragment>
        <PageTitle>Subscriptions</PageTitle>
        <Paper className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs lg />
            <Grid item xs={12} lg={8}>
              <Tabs
                value={this.state.tab}
                onChange={(e, value) => this.setState({ tab: value })}
                indicatorColor="secondary"
                textColor="secondary"
                fullWidth
              >
                <Tab
                  value="media"
                  label={
                    width === "xl" || width === "lg"
                      ? "Photographer Uploads"
                      : "Photographers"
                  }
                />
                <Tab
                  value="fursuits"
                  label={
                    width === "xl" || width === "lg"
                      ? "Featuring Followed Fursuits"
                      : "Fursuits"
                  }
                />
                <Tab
                  value="makers"
                  label={
                    width === "xl" || width === "lg"
                      ? "New Fursuits by Followed Makers"
                      : "Maker Suits"
                  }
                />
              </Tabs>
            </Grid>
            <Grid item xs lg />
          </Grid>
        </Paper>
        <Grid container className={classes.root} spacing={8} justify="center">
          <Grid item xs={12}>
            {this.state.tab === "media" && this.renderMedia()}
            {this.state.tab === "fursuits" && this.renderFursuits()}
            {this.state.tab === "makers" && this.renderMakers()}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(withCurrentSession(withWidth()(Subscriptions)))
);
