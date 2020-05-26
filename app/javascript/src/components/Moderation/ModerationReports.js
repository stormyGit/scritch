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
  CardMedia,
  DialogContent,
  DialogTitle,
  DialogActions
} from "@material-ui/core";
import {
  FETCH_REPORTS,
  FETCH_MEDIUM_REPORTS,
  FETCH_COMMENT_REPORTS
} from "../../queries/moderationQueries";
import { Query, Mutation } from "react-apollo";
import ScritchSpinner from "../CustomComponents/ScritchSpinner";
import ModerationChatDialog from "./ModerationChatDialog";
import { Link } from "react-router-dom";
import {
  ACCEPT_SERIOUS_VIOLATION,
  ACCEPT_MINOR_VIOLATION,
  REJECT_NOT_WORTH_REPORTING,
  REMOVE_USER_BIO,
  REMOVE_USER_AVATAR,
  REMOVE_USER_WEBSITE
} from "../../queries/moderationMutations";
import ResponsiveDialog from "../Global/ResponsiveDialog";

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

const CommentReport = ({ report, classes }) => {
  const [chatDialog, setChatDialog] = useState(false);

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader title={`Media Report #${report.id.split("-")[0]}`} />
        <CardContent>
          <Typography variant="h6">Suspect Comment</Typography>
          <Typography variant="subtitle2">{report.comment.body}</Typography>
          <div style={{ padding: 8 }} />
          <hr style={{ textAlign: "center", width: "50%" }} />
          <div style={{ padding: 8 }} />
          <Typography variant="h6">Posted by</Typography>
          <Typography variant="subtitle1">
            {report.medium.user.name}&nbsp;&nbsp;
            <Link className={classes.link} to={`/${report.comment.user.slug}`} target="_blank">
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
                      variables: { input: { id: report.id, kind: "comment" } }
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
                      variables: { input: { id: report.id, kind: "comment" } }
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
                      variables: { input: { id: report.id, kind: "comment" } }
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
        caseType={"comment_report"}
      />
    </React.Fragment>
  );
};

const MediumReport = ({ report, classes }) => {
  const [chatDialog, setChatDialog] = useState(false);
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
        caseType={"medium_report"}
      />
    </React.Fragment>
  );
};

const ProfileDialog = ({ classes, user, open, onClose }) => {
  return (
    <ResponsiveDialog open={open} onClose={onClose} size={500}>
      <DialogTitle>{`Moderating Profile of User ${user.name}`}</DialogTitle>
      <DialogContent>
        {user.avatar && (
          <div style={{ textAlign: "center" }}>
            <img src={user.avatar} />
            <br />
            <Mutation mutation={REMOVE_USER_AVATAR}>
              {(removeUserAvatar, { data }) => {
                return (
                  <Button
                    variant="outlined"
                    onClick={() =>
                      removeUserAvatar({
                        variables: { input: { id: user.id } }
                      }).then(() => location.reload())
                    }
                  >
                    Remove Avatar
                  </Button>
                );
              }}
            </Mutation>
          </div>
        )}
        <div style={{ padding: 16 }} />
        {user.bio && (
          <React.Fragment>
            <Typography variant="h6">User Bio</Typography>
            <Typography variant="subtitle1">{user.bio}</Typography>
            <div style={{ textAlign: "center" }}>
              <Mutation mutation={REMOVE_USER_BIO}>
                {(removeUserBio, { data }) => {
                  return (
                    <Button
                      variant="outlined"
                      onClick={() =>
                        removeUserBio({
                          variables: { input: { id: user.id } }
                        }).then(() => location.reload())
                      }
                    >
                      Remove Bio
                    </Button>
                  );
                }}
              </Mutation>
            </div>
          </React.Fragment>
        )}
        <div style={{ padding: 16 }} />
        {user.website && (
          <React.Fragment>
            <Typography variant="h6">User Website</Typography>
            <Typography variant="subtitle1">
              <a className={classes.link} href={user.web} target="_blank">
                {user.website}
              </a>
            </Typography>
            <div style={{ textAlign: "center" }}>
              <Mutation mutation={REMOVE_USER_WEBSITE}>
                {(removeUserWebsite, { data }) => {
                  return (
                    <Button
                      variant="outlined"
                      onClick={() =>
                        removeUserWebsite({
                          variables: { input: { id: user.id } }
                        }).then(() => location.reload())
                      }
                    >
                      Remove Website
                    </Button>
                  );
                }}
              </Mutation>
            </div>
          </React.Fragment>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </ResponsiveDialog>
  );
};

const Report = ({ report, classes }) => {
  const [chatDialog, setChatDialog] = useState(false);
  const [profileDialog, setProfileDialog] = useState(false);

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
          <Button onClick={() => setProfileDialog(true)}>Moderate Profile</Button>
          <Button onClick={() => setChatDialog(true)}>Contact Reporter</Button>
        </CardActions>
      </Card>
      {chatDialog && (
        <ModerationChatDialog
          user={report.reporter}
          open={chatDialog}
          onClose={() => setChatDialog(false)}
          caseId={report.id}
          caseType={"user_report"}
        />
      )}
      {profileDialog && (
        <ProfileDialog
          classes={classes}
          user={report.user}
          open={profileDialog}
          onClose={() => setProfileDialog(false)}
        />
      )}
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
        {false && <Tab value="tags" icon={"Tags"} />}
        <Tab value="media" icon={"Media"} />
        <Tab value="users" icon={"Users"} />
        <Tab value="comments" icon={"Comments"} />
      </Tabs>
      <div style={{ padding: 16 }} />
      {tab === "users" && (
        <Query query={FETCH_REPORTS}>
          {({ loading, error, data }) => {
            if (loading) return <ScritchSpinner size={64} />; //TODO progress
            if (error) {
              return null;
            } //TODO error
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
            if (loading) return <ScritchSpinner size={64} />; //TODO progress
            if (error) {
              return null;
            } //TODO error
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
      {tab === "comments" && (
        <Query query={FETCH_COMMENT_REPORTS}>
          {({ loading, error, data }) => {
            if (loading) return <ScritchSpinner size={64} />; //TODO progress
            if (error) {
              return null;
            } //TODO error
            if (
              !data ||
              !data.moderationCommentReports ||
              data.moderationCommentReports.length === 0
            ) {
              return (
                <Typography variant="h4" gutterBottom className={classes.centeredText}>
                  No Comment Reports Found
                </Typography>
              );
            }

            return (
              <React.Fragment>
                <Grid container spacing={3}>
                  {data.moderationCommentReports.map(report => (
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
