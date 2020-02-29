import React, { useState } from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Button
} from "@material-ui/core";
import { Query, Mutation } from "react-apollo";
import { FETCH_CLAIMS, FETCH_MAKER_CLAIMS } from "../../queries/moderationQueries";
import ModerationChatDialog from "../Moderation/ModerationChatDialog";
import {
  ACCEPT_MAKER_CLAIM,
  ACCEPT_CLAIM,
  REJECT_CLAIM,
  REJECT_MAKER_CLAIM
} from "../../queries/moderationMutations";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    paddingRight: 0
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  flexActionArea: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  padderTitle: { paddingTop: 8, paddingLeft: 30, paddingRight: 8 },
  pixelImage: {
    width: "128px",
    height: "128px"
  },
  tabsCenterer: {
    width: "100%",
    textAlign: "center"
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  },
  card: {
    width: "100%"
  },
  centeredText: {
    textAlign: "center"
  },
  dangerText: {
    color: theme.palette.danger.main
  }
});

const Claim = ({ classes, claim }) => {
  const [chatDialog, setChatDialog] = useState(false);

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader title={`Claim #${claim.id.split("-")[0]}`} />
        <CardContent>
          <Typography variant="h6">Claimed Fursuit</Typography>
          <Typography variant="subtitle1">
            {claim.fursuit.name}&nbsp;&nbsp;
            <Link className={classes.link} to={`/fursuits/${claim.fursuit.slug}`} target="_blank">
              View on Scritch
            </Link>
          </Typography>
          <div style={{ padding: 8 }} />
          <hr style={{ textAlign: "center", width: "50%" }} />
          <div style={{ padding: 8 }} />
          <Typography variant="h6">Claimed By</Typography>
          <Typography variant="subtitle1">
            {claim.user.name}&nbsp;&nbsp;
            <Link className={classes.link} to={`/${claim.user.slug}`} target="_blank">
              View on Scritch
            </Link>
          </Typography>
          {claim.conflictual && (
            <React.Fragment>
              <div style={{ padding: 8 }} />
              <hr style={{ textAlign: "center", width: "50%" }} />
              <div style={{ padding: 8 }} />
              <Typography variant="h6" className={classes.dangerText}>
                This Fursuit already has an Owner!
              </Typography>
              <Typography variant="subtitle1">
                {claim.fursuit.users[0].name}&nbsp;&nbsp;
                <Link
                  className={classes.link}
                  to={`/${claim.fursuit.users[0].slug}`}
                  target="_blank"
                >
                  View on Scritch
                </Link>
              </Typography>
            </React.Fragment>
          )}
        </CardContent>
        <CardActions className={classes.flexActionArea}>
          <Mutation mutation={ACCEPT_CLAIM}>
            {(acceptClaim, { data }) => {
              return (
                <Button
                  onClick={() =>
                    acceptClaim({
                      variables: { input: { id: claim.id } }
                    }).then(() => location.reload())
                  }
                >
                  Accept Claim
                </Button>
              );
            }}
          </Mutation>
          <Mutation mutation={REJECT_CLAIM}>
            {(rejectMakerClaim, { data }) => {
              return (
                <Button
                  onClick={() =>
                    rejectMakerClaim({
                      variables: { input: { id: claim.id } }
                    }).then(() => location.reload())
                  }
                >
                  Reject Claim
                </Button>
              );
            }}
          </Mutation>
          <Button onClick={() => setChatDialog(true)}>Contact Claimer</Button>
        </CardActions>
      </Card>
      <ModerationChatDialog
        user={claim.user}
        open={chatDialog}
        onClose={() => setChatDialog(false)}
        caseId={claim.id}
        caseType={"claim"}
      />
    </React.Fragment>
  );
};

const MakerClaim = ({ classes, claim }) => {
  const [chatDialog, setChatDialog] = useState(false);

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader title={`Maker Claim #${claim.id.split("-")[0]}`} />
        <CardContent>
          <Typography variant="h6">Claimed Maker</Typography>
          <Typography variant="subtitle1">
            {claim.maker.name}&nbsp;&nbsp;
            <Link className={classes.link} to={`/makers/${claim.maker.slug}`} target="_blank">
              View on Scritch
            </Link>
          </Typography>
          <div style={{ padding: 8 }} />
          <hr style={{ textAlign: "center", width: "50%" }} />
          <div style={{ padding: 8 }} />
          <Typography variant="h6">Claimed By</Typography>
          <Typography variant="subtitle1">
            {claim.user.name}&nbsp;&nbsp;
            <Link className={classes.link} to={`/${claim.user.slug}`} target="_blank">
              View on Scritch
            </Link>
          </Typography>
          {claim.conflictual && (
            <React.Fragment>
              <div style={{ padding: 8 }} />
              <hr style={{ textAlign: "center", width: "50%" }} />
              <div style={{ padding: 8 }} />
              <Typography variant="h6" className={classes.dangerText}>
                This Maker already has an Owner!
              </Typography>
              <Typography variant="subtitle1">
                {claim.maker.user.name}&nbsp;&nbsp;
                <Link className={classes.link} to={`/${claim.maker.user.slug}`} target="_blank">
                  View on Scritch
                </Link>
              </Typography>
            </React.Fragment>
          )}
        </CardContent>
        <CardActions className={classes.flexActionArea}>
          <Mutation mutation={ACCEPT_MAKER_CLAIM}>
            {(acceptMakerClaim, { data }) => {
              return (
                <Button
                  onClick={() =>
                    acceptMakerClaim({
                      variables: { input: { id: claim.id } }
                    }).then(() => location.reload())
                  }
                >
                  Accept Claim
                </Button>
              );
            }}
          </Mutation>
          <Mutation mutation={REJECT_MAKER_CLAIM}>
            {(rejectMakerClaim, { data }) => {
              return (
                <Button
                  onClick={() =>
                    rejectMakerClaim({
                      variables: { input: { id: claim.id } }
                    }).then(() => location.reload())
                  }
                >
                  Reject Claim
                </Button>
              );
            }}
          </Mutation>
          <Button onClick={() => setChatDialog(true)}>Contact Claimer</Button>
        </CardActions>
      </Card>
      <ModerationChatDialog
        user={claim.user}
        open={chatDialog}
        onClose={() => setChatDialog(false)}
        caseId={claim.id}
        caseType={"maker_claim"}
      />
    </React.Fragment>
  );
};

const ModerationClaims = ({ classes, width }) => {
  const [tab, setTab] = useState("fursuits");
  return (
    <React.Fragment>
      <PageTitle>{`Scritch Moderation - Claims`}</PageTitle>
      <Tabs
        variant="fullWidth"
        className={classes.tabsCenterer}
        value={tab}
        onChange={(e, value) => setTab(value)}
        textColor="secondary"
      >
        <Tab value="fursuits" icon={"Fursuits"} />
        <Tab value="makers" icon={"Makers"} />
      </Tabs>
      <div style={{ padding: 16 }} />
      {tab === "fursuits" && (
        <Query query={FETCH_CLAIMS}>
          {({ loading, error, data }) => {
            if (loading) return null; //TODO progress
            if (error) {
              return null;
            } //TODO error
            if (!data || !data.moderationClaims) {
              return (
                <Typography variant="h4" gutterBottom className={classes.centeredText}>
                  No Claims Found
                </Typography>
              );
            }

            return (
              <React.Fragment>
                <Grid container spacing={3}>
                  {data.moderationClaims.map(claim => (
                    <Grid item xs={12} md={6} lg={4} key={claim.id}>
                      <Claim claim={claim} classes={classes} />
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            );
          }}
        </Query>
      )}
      {tab === "makers" && (
        <Query query={FETCH_MAKER_CLAIMS}>
          {({ loading, error, data }) => {
            if (loading) return null; //TODO progress
            if (error) return null; //TODO error
            if (!data || !data.moderationMakerClaims) {
              return (
                <Typography variant="h4" gutterBottom className={classes.centeredText}>
                  No Maker Claims Found
                </Typography>
              );
            }

            return (
              <React.Fragment>
                <Grid container spacing={3}>
                  {data.moderationMakerClaims.map(claim => (
                    <Grid item xs={12} md={6} lg={4} key={claim.id}>
                      <MakerClaim claim={claim} classes={classes} />
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            );
          }}
        </Query>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(withWidth()(ModerationClaims));
