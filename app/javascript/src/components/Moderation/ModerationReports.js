import React, { useState } from "react";
import PageTitle from "../Global/PageTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import {
  Tabs,
  Tab,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  CardMedia
} from "@material-ui/core";
import { FETCH_REPORTS, FETCH_MEDIUM_REPORTS } from "../../queries/moderationQueries";
import { Query, Mutation } from "react-apollo";
import CustomProgress from "../Global/CustomProgress";
import ModerationChatDialog from "./ModerationChatDialog";
import { Link } from "react-router-dom";
import {
  ACCEPT_SERIOUS_VIOLATION,
  ACCEPT_MINOR_VIOLATION,
  REJECT_NOT_WORTH_REPORTING
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
  padderTitle: { paddingTop: 8, paddingLeft: 30, paddingRight: 8 },
  pixelImage: {
    width: "128px",
    height: "128px"
  },
  centeredText: {
    textAlign: "center"
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  },
  card: {},
  cardMedia: {
    width: "100%",
    minHeight: "300px",
    objectFit: "cover",
    cursor: "zoom-in"
  }
});

const MediumReport = ({ report, classes }) => {
  const [chatDialog, setChatDialog] = useState(false);
  console.log(report.medium.picture);
  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader title={`Media Report #${report.id.split("-")[0]}`} />
        <a className={classes.link} href={report.medium.picture} target="_blank">
          <CardMedia
            image={report.medium.picture}
            className={classes.cardMedia}
            title={report.medium.id}
          />
        </a>
        <CardContent>
          <Typography variant="h6">Posted by</Typography>
          <Typography variant="subtitle1">
            {report.medium.user.name}&nbsp;&nbsp;
            <Link className={classes.link} to={`/${report.medium.user.slug}`} target="_blank">
              View on Scritch
            </Link>
          </Typography>
          <div style={{ padding: 8 }} />
          <hr style={{ textAlign: "center", width: "50%" }} />
          <div style={{ padding: 8 }} />
          <Typography variant="h6">Reported By</Typography>
          <Typography variant="subtitle1">
            {report.reporter.name}&nbsp;&nbsp;
            <Link className={classes.link} to={`/${report.reporter.slug}`} target="_blank">
              View on Scritch
            </Link>
          </Typography>
          <React.Fragment>
            <div style={{ padding: 8 }} />
            <hr style={{ textAlign: "center", width: "50%" }} />
            <div style={{ padding: 8 }} />
            <Typography variant="h6">Report Description</Typography>
            <Typography variant="subtitle1">{report.description}</Typography>
          </React.Fragment>
        </CardContent>
        <CardActions className={classes.flexActionArea}>
          <Mutation mutation={ACCEPT_SERIOUS_VIOLATION}>
            {(acceptSeriousViolation, { data }) => {
              return (
                <Button
                  onClick={() =>
                    acceptSeriousViolation({
                      variables: { input: { id: report.id, kind: "media" } }
                    }).then(() => location.reload())
                  }
                >
                  Serious Violation
                </Button>
              );
            }}
          </Mutation>
          <Mutation mutation={ACCEPT_MINOR_VIOLATION}>
            {(acceptMinorViolation, { data }) => {
              return (
                <Button
                  onClick={() =>
                    acceptMinorViolation({
                      variables: { input: { id: report.id, kind: "media" } }
                    }).then(() => location.reload())
                  }
                >
                  Minor Violation
                </Button>
              );
            }}
          </Mutation>
          <Mutation mutation={REJECT_NOT_WORTH_REPORTING}>
            {(rejectNotWorthReporting, { data }) => {
              return (
                <Button
                  onClick={() =>
                    rejectNotWorthReporting({
                      variables: { input: { id: report.id, kind: "media" } }
                    }).then(() => location.reload())
                  }
                >
                  Not Worth Reporting
                </Button>
              );
            }}
          </Mutation>
          <Button onClick={() => setChatDialog(true)}>Contact Reporter</Button>
        </CardActions>
      </Card>
      <ModerationChatDialog
        user={report.reporter}
        open={chatDialog}
        onClose={() => setChatDialog(false)}
        caseId={report.id}
        caseType={"report"}
      />
    </React.Fragment>
  );
};

const Report = ({ report, classes }) => {
  const [chatDialog, setChatDialog] = useState(false);

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader title={`Report #${report.id.split("-")[0]}`} />
        <CardContent>
          <Typography variant="h6">Reported User</Typography>
          <Typography variant="subtitle1">
            {report.user.name}&nbsp;&nbsp;
            <Link className={classes.link} to={`/${report.user.slug}`} target="_blank">
              View on Scritch
            </Link>
          </Typography>
          <div style={{ padding: 8 }} />
          <hr style={{ textAlign: "center", width: "50%" }} />
          <div style={{ padding: 8 }} />
          <Typography variant="h6">Reported By</Typography>
          <Typography variant="subtitle1">
            {report.reporter.name}&nbsp;&nbsp;
            <Link className={classes.link} to={`/${report.reporter.slug}`} target="_blank">
              View on Scritch
            </Link>
          </Typography>
          <React.Fragment>
            <div style={{ padding: 8 }} />
            <hr style={{ textAlign: "center", width: "50%" }} />
            <div style={{ padding: 8 }} />
            <Typography variant="h6">Report Description</Typography>
            <Typography variant="subtitle1">{report.description}</Typography>
          </React.Fragment>
        </CardContent>
        <CardActions className={classes.flexActionArea}>
          <Mutation mutation={ACCEPT_SERIOUS_VIOLATION}>
            {(acceptSeriousViolation, { data }) => {
              return (
                <Button
                  onClick={() =>
                    acceptSeriousViolation({
                      variables: { input: { id: report.id, kind: "user" } }
                    }).then(() => location.reload())
                  }
                >
                  Serious Violation
                </Button>
              );
            }}
          </Mutation>
          <Mutation mutation={ACCEPT_MINOR_VIOLATION}>
            {(acceptMinorViolation, { data }) => {
              return (
                <Button
                  onClick={() =>
                    acceptMinorViolation({
                      variables: { input: { id: report.id, kind: "user" } }
                    }).then(() => location.reload())
                  }
                >
                  Minor Violation
                </Button>
              );
            }}
          </Mutation>
          <Mutation mutation={REJECT_NOT_WORTH_REPORTING}>
            {(rejectNotWorthReporting, { data }) => {
              return (
                <Button
                  onClick={() =>
                    rejectNotWorthReporting({
                      variables: { input: { id: report.id, kind: "user" } }
                    }).then(() => location.reload())
                  }
                >
                  Not Worth Reporting
                </Button>
              );
            }}
          </Mutation>
          <Button onClick={() => setChatDialog(true)}>Contact Reporter</Button>
        </CardActions>
      </Card>
      <ModerationChatDialog
        user={report.reporter}
        open={chatDialog}
        onClose={() => setChatDialog(false)}
        caseId={report.id}
        caseType={"report"}
      />
    </React.Fragment>
  );
};

const ModerationReports = ({ width, classes }) => {
  const [tab, setTab] = useState("media");

  return (
    <React.Fragment>
      <PageTitle>{`Scritch Moderation - Reports`}</PageTitle>
      <Tabs
        variant="fullWidth"
        className={classes.tabsCenterer}
        value={tab}
        onChange={(e, value) => setTab(value)}
        textColor="secondary"
      >
        <Tab value="tags" icon={"Tags"} />
        <Tab value="media" icon={"Media"} />
        <Tab value="users" icon={"Users"} />
        <Tab value="comments" icon={"Comments"} />
      </Tabs>
      <div style={{ padding: 16 }} />
      {tab === "users" && (
        <Query query={FETCH_REPORTS}>
          {({ loading, error, data }) => {
            if (loading) return <CustomProgress size={64} />; //TODO progress
            if (error) {
              console.log(error);
              return null;
            } //TODO error
            console.log(data);
            if (!data || !data.moderationReports || data.moderationReports.length === 0) {
              return (
                <Typography variant="h4" gutterBottom className={classes.centeredText}>
                  No User Reports Found
                </Typography>
              );
            }

            return (
              <React.Fragment>
                <Grid container spacing={3}>
                  {data.moderationReports.map(report => (
                    <Grid item xs={12} md={6} lg={6} key={report.id}>
                      <Report report={report} classes={classes} />
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            );
          }}
        </Query>
      )}
      {tab === "media" && (
        <Query query={FETCH_MEDIUM_REPORTS}>
          {({ loading, error, data }) => {
            if (loading) return <CustomProgress size={64} />; //TODO progress
            if (error) {
              console.log(error);
              return null;
            } //TODO error
            console.log(data);
            if (
              !data ||
              !data.moderationMediumReports ||
              data.moderationMediumReports.length === 0
            ) {
              return (
                <Typography variant="h4" gutterBottom className={classes.centeredText}>
                  No Medium Reports Found
                </Typography>
              );
            }

            return (
              <React.Fragment>
                <Grid container spacing={3}>
                  {data.moderationMediumReports.map(report => (
                    <Grid item xs={12} md={6} lg={6} key={report.id}>
                      <MediumReport report={report} classes={classes} />
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

export default withStyles(styles)(withWidth()(ModerationReports));
