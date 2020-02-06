import React, { useState } from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Card, CardHeader, CardContent, CardActions, Button } from "@material-ui/core";
import { FETCH_FURSUIT_REQUESTS } from "../../queries/moderationQueries";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import FursuitRequestDialog from "./FursuitRequestDialog";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
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
  text: {
    fontWeight: 200
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    color: theme.palette.primary.main
  }
});

const FursuitRequests = ({ classes, width }) => {
  const [activeRequest, setActiveRequest] = useState(null);
  return (
    <React.Fragment>
      <div style={{ padding: 16 }} />
      <Query query={FETCH_FURSUIT_REQUESTS}>
        {({ data, loading, error, fetchMore }) => {
          console.log(data);
          if (loading || error || !data || !data.moderationFursuitRequests) return null;
          return (
            <React.Fragment>
              <Grid container className={classes.root} spacing={24}>
                {data.moderationFursuitRequests.map(request => {
                  console.log(request);
                  return (
                    <React.Fragment>
                      <Grid xs={12} md={6} lg={4} key={request.id}>
                        <Card>
                          <CardHeader title={`Fursuit Request #${request.id.split("-")[0]}`} />
                          <CardContent>
                            <Typography variant="h6" className={classes.text}>
                              Requested by
                            </Typography>
                            <Link
                              className={classes.link}
                              target="_blank"
                              to={`/${request.user.slug}`}
                            >
                              <Typography variant="h6" className={classes.link}>
                                {request.user.name}
                              </Typography>
                            </Link>
                            <div style={{ padding: 16 }} />
                            <Typography variant="h6" className={classes.text}>
                              Fursuit Name
                            </Typography>
                            <Typography variant="h6">{request.name}</Typography>
                            <div style={{ padding: 16 }} />
                            <Typography variant="h6" className={classes.text}>
                              Requester Comments
                            </Typography>
                            <Typography variant="h6">{request.notes}</Typography>
                          </CardContent>
                          <CardActions style={{ textAlign: "center" }}>
                            <Button size="large" onClick={() => setActiveRequest(request)}>
                              View Request
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                      {activeRequest !== null && (
                        <FursuitRequestDialog
                          open={activeRequest !== null}
                          onClose={() => setActiveRequest(null)}
                          request={request}
                          classes={classes}
                          width={width}
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

const ModerationRequests = ({ width, classes }) => {
  const [tab, setTab] = useState("fursuits");

  return (
    <React.Fragment>
      <PageTitle>{`Scritch Moderation - Requests`}</PageTitle>
      <Tabs
        variant="fullWidth"
        className={classes.tabsCenterer}
        value={tab}
        onChange={(e, value) => setTab(value)}
        textColor="textPrimary"
      >
        <Tab value="fursuits" icon={"Fursuits"} />
        <Tab value="makers" icon={"Makers"} />
        <Tab value="events" icon={"Events"} />
      </Tabs>
      {tab === "fursuits" && <FursuitRequests classes={classes} width={width} />}
      {tab === "makers" && <MakersRequests classes={classes} width={width} />}
      {tab === "events" && <EventsRequests classes={classes} width={width} />}
    </React.Fragment>
  );
};

export default withStyles(styles)(withWidth()(ModerationRequests));
