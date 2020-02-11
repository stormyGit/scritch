import React from "react";
import MediaSubs from "./Media/MediaSubs";
import PageTitle from "./Global/PageTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
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

const ProfileSubs = ({ classes }) => {
  return null;
};

class Subscriptions extends React.Component {
  state = {
    tab: "media",
    newProfilesOnly: true,
    newFursuitsOnly: true
  };

  renderMedia() {
    return (
      <MediaSubs
        switchNewOnlyStatus={() => {
          this.setState({ newProfilesOnly: !this.state.newProfilesOnly });
        }}
        filter={
          this.state.newProfilesOnly
            ? "subscriptions_users"
            : "subscriptions_users_all"
        }
        {...this.props}
      />
    );
  }

  renderFursuits() {
    return (
      <MediaSubs
        switchNewOnlyStatus={() =>
          this.setState({ newFursuitsOnly: !this.state.newFursuitsOnly })
        }
        filter={
          this.state.newFursuitsOnly
            ? "subscriptions_fursuits"
            : "subscriptions_fursuits_all"
        }
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
        <Tabs
          value={this.state.tab}
          onChange={(e, value) => this.setState({ tab: value })}
          centered
          textColor="textPrimary"
          variant={width === "xl" || width === "lg" ? "" : "fullWidth"}
        >
          <Tab value="media" label={"Profiles"} />
          <Tab value="fursuits" label={"Fursuits"} />
          <Tab value="makers" label={"Makers"} />
        </Tabs>
        <Grid container className={classes.root} spacing={1} justify="center">
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
