import React, {useState} from "react";
import MediaSubs from "./Media/MediaSubs";
import PageTitle from "./Global/PageTitle";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Fursuits from "./Fursuits/Fursuits";
import {withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import withCurrentSession from "./withCurrentSession";

const styles = () => ({
  root: {
    flexGrow: 1
  }
});

const ProfileSubs = ({classes}) => {
  return null;
};

function Subscriptions(props) {
  const [tab, setTab] = useState("media");
  const [newProfilesOnly, setNewProfilesOnly] = useState(true);
  const [newFursuitsOnly, setNewFursuitsOnly] = useState(true);
  const {classes, width} = props;

  function renderMedia() {
    return (
      <MediaSubs
        switchNewOnlyStatus={() => {
          setNewProfilesOnly(!newProfilesOnly);
        }}
        filter={newProfilesOnly ? "subscriptions_users" : "subscriptions_users_all"}
        {...props}
      />
    );
  }

  function renderFursuits() {
    return (
      <MediaSubs
        switchNewOnlyStatus={() => setNewFursuitsOnly(!newFursuitsOnly)}
        filter={
          newFursuitsOnly ? "subscriptions_fursuits" : "subscriptions_fursuits_all"
        }
        {...props}
      />
    );
  }

  function renderMakers() {
    return <Fursuits filter="subscriptions_fursuits" withSubsClear={true} {...props} />;
  }

  return (
    <React.Fragment>
      <PageTitle>Subscriptions</PageTitle>
      <Tabs
        value={tab}
        onChange={(e, value) => setTab(value)}
        centered
        textColor="secondary"
        variant={width === "xl" || width === "lg" ? "" : "fullWidth"}
      >
        <Tab value="media" label={"Profiles"}/>
        <Tab value="fursuits" label={"Fursuits"}/>
        <Tab value="makers" label={"Makers"}/>
      </Tabs>
      <Grid container className={classes.root} spacing={1} justify="center">
        <Grid item xs={12}>
          {tab === "media" && renderMedia()}
          {tab === "fursuits" && renderFursuits()}
          {tab === "makers" && renderMakers()}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default withStyles(styles)(withRouter(withCurrentSession(withWidth()(Subscriptions))));
