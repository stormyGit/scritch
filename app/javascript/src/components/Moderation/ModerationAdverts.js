import React from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { Query, Mutation } from "react-apollo";
import { FETCH_ADVERTS } from "../../queries/moderationQueries";

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

const Padder = <div style={{ padding: 8 }} />;

const AdvertCard = ({ classes, advert }) => {
  return (
    <Card className={classes.card}>
      <CardMedia component="img" image={advert.file} title={`#${advert.id}`} />
      <CardContent>
        <Typography variant="h5">Width: {advert.width}px</Typography>
        <Typography variant="h5">Height: {advert.height}px</Typography>
        <hr />
        <Typography variant="h5">Status: {advert.status}</Typography>
        <Typography variant="h5">Impressions: {advert.impressions}</Typography>
        <hr />
        <Typography variant="h5">Redirects to:</Typography>
        <a href={advert.url} target="_blank" className={classes.link}>
          <Typography variant="h5" className={classes.link}>
            {advert.url}
          </Typography>
        </a>
      </CardContent>
    </Card>
  );
};

class ModerationAdverts extends React.Component {
  state = {
    filter: ""
  };

  render() {
    const { width, classes } = this.props;

    return (
      <React.Fragment>
        <PageTitle>{`Scritch Moderation - Adverts`}</PageTitle>
        <Query
          query={FETCH_ADVERTS}
          variables={{
            filter: this.state.filter
          }}
        >
          {({ loading, error, data }) => {
            if (loading) return null; //TODO progress
            if (error) return null; //TODO error
            if (!data || !data.moderationAdverts) {
              return (
                <Typography
                  variant="h4"
                  gutterBottom
                  className={classes.centeredText}
                >
                  No Adverts Found
                </Typography>
              );
            }

            return (
              <React.Fragment>
                <Grid container spacing={3}>
                  {data.moderationAdverts.map(advert => (
                    <Grid item xs={12} md={6} lg={4} key={advert.id}>
                      <AdvertCard advert={advert} classes={classes} />
                    </Grid>
                  ))}
                </Grid>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(ModerationAdverts));
