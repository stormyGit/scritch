import React from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { Query } from "react-apollo";
import CustomProgress from "../Global/CustomProgress";
import { FETCH_SPONSORS } from "../../queries/moderationQueries";

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
  card: {
    width: "100%"
  },
  centeredText: {
    textAlign: "center"
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none"
  }
});

const SponsorCard = ({ classes, width, sponsor }) => {
  return (
    <Card className={classes.card}>
      <CardHeader title={`Sponsor #${sponsor.id.split("-")[0]}`} />
      <CardContent>
        <Typography variant="h5">Plan: {sponsor.plan}</Typography>
        <Typography variant="h5">Limit: {sponsor.limit}</Typography>
        <Typography variant="h5">Status: {sponsor.status}</Typography>
        <hr />
        <Typography variant="h5">
          Stripe Customer ID: {sponsor.customerId}
        </Typography>
        <hr />
        <Typography variant="h5">User: </Typography>
        <Link
          to={`/${sponsor.user.slug}`}
          target="_blank"
          className={classes.link}
        >
          <Typography variant="h5" className={classes.link}>
            {sponsor.user.name}
          </Typography>
        </Link>
      </CardContent>
    </Card>
  );
};

const ModerationSponsors = ({ classes, width }) => {
  return (
    <React.Fragment>
      <PageTitle>{`Scritch Moderation - Sponsors`}</PageTitle>
      <Query query={FETCH_SPONSORS}>
        {({ loading, error, data }) => {
          if (loading) return <CustomProgress size={128} />;
          if (error) return null; //TODO error
          if (
            !data ||
            !data.moderationSponsors ||
            data.moderationSponsors.length === 0
          ) {
            return (
              <Typography
                variant="h4"
                gutterBottom
                className={classes.centeredText}
              >
                No Sponsors Found
              </Typography>
            );
          }

          return (
            <React.Fragment>
              <Grid container spacing={3}>
                {data.moderationSponsors.map(sponsor => (
                  <Grid item xs={12} md={6} lg={4} key={sponsor.id}>
                    <SponsorCard sponsor={sponsor} classes={classes} />
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

export default withStyles(styles)(withWidth()(ModerationSponsors));
