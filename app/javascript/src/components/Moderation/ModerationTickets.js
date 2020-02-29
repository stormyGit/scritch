import React, { useState } from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { FETCH_TICKETS } from "../../queries/moderationQueries";
import { Card, CardHeader, CardContent, CardActions, Button } from "@material-ui/core";
import { Mutation, Query } from "react-apollo";
import ModerationChatDialog from "./ModerationChatDialog";
import { Link } from "react-router-dom";
import CustomProgress from "../Global/CustomProgress";
import { DELETE_TICKET } from "../../queries/moderationMutations";

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
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  },
  centeredText: {
    textAlign: "center"
  }
});

const Ticket = ({ ticket, classes }) => {
  const [chatDialog, setChatDialog] = useState(false);

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardHeader title={`${ticket.kind} Ticket #${ticket.id.split("-")[0]}`} />
        <CardContent>
          <Typography variant="h6">Submitted by</Typography>
          <Typography variant="subtitle1">
            {ticket.user
              ? ticket.user.name
              : ticket.kind === "exception"
              ? "AUTO-SUBMITTED"
              : "Non-Logged User"}
            &nbsp;&nbsp;
            {ticket.user && (
              <Link className={classes.link} to={`/${ticket.user.slug}`} target="_blank">
                View on Scritch
              </Link>
            )}
          </Typography>
          <div style={{ padding: 8 }} />
          <hr style={{ textAlign: "center", width: "50%" }} />
          <div style={{ padding: 8 }} />
          <Typography variant="h6">Ticket Description</Typography>
          <Typography variant="subtitle1">{ticket.description}</Typography>
          {ticket.page && (
            <React.Fragment>
              <div style={{ padding: 8 }} />
              <hr style={{ textAlign: "center", width: "50%" }} />
              <div style={{ padding: 8 }} />
              <Typography variant="h6">Submitted while on page</Typography>
              <Typography variant="subtitle1">
                <Link className={classes.link} to={`/${ticket.page}`} target="_blank">
                  {ticket.page}
                </Link>
              </Typography>
            </React.Fragment>
          )}
        </CardContent>
        <CardActions className={classes.flexActionArea}>
          <Mutation mutation={DELETE_TICKET}>
            {(deleteTicket, { data }) => {
              return (
                <Button
                  onClick={() =>
                    deleteTicket({
                      variables: { input: { id: ticket.id } }
                    }).then(() => location.reload())
                  }
                >
                  Delete
                </Button>
              );
            }}
          </Mutation>
          {ticket.user && <Button onClick={() => setChatDialog(true)}>Contact User</Button>}
        </CardActions>
      </Card>
      <ModerationChatDialog
        user={ticket.reporter}
        open={chatDialog}
        onClose={() => setChatDialog(false)}
        caseId={ticket.id}
        caseType={"tech_report"}
      />
    </React.Fragment>
  );
};

const ModerationTickets = ({ classes, width }) => {
  return (
    <React.Fragment>
      <PageTitle>{`Scritch Moderation - Tickets`}</PageTitle>
      <Query query={FETCH_TICKETS}>
        {({ loading, error, data }) => {
          if (loading) return <CustomProgress size={64} />; //TODO progress
          if (error) {
            return null;
          } //TODO error
          if (!data || !data.moderationTechReports || data.moderationTechReports.length === 0) {
            return (
              <Typography variant="h4" gutterBottom className={classes.centeredText}>
                No Tickets Found
              </Typography>
            );
          }

          return (
            <React.Fragment>
              <Grid container spacing={3}>
                {data.moderationTechReports.map(ticket => (
                  <Grid item xs={12} md={6} lg={4} key={ticket.id}>
                    <Ticket ticket={ticket} classes={classes} />
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          );
        }}
      </Query>
    </React.Fragment>
  );
};

export default withStyles(styles)(withWidth()(ModerationTickets));
