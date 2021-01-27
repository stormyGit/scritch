import React from "react";
import PageTitle from "../Global/PageTitle";
import queryString from "query-string";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";
import { Query, Mutation } from "react-apollo";
import { FETCH_ADVERTS } from "../../queries/moderationQueries";
import {
  UPDATE_ADVERT,
  DELETE_ADVERT,
  ACCEPT_ADVERT,
  REJECT_ADVERT
} from "../../queries/moderationMutations";
import ScritchSpinner from "../CustomComponents/ScritchSpinner";

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
  },
  dangerButton: {
    color: theme.palette.danger.main
  },
  pending: {
    color: "#FFFF00"
  },
  rejected: {
    color: "#DD0000"
  },
  ready: {
    color: "#00DDDD"
  },
  live: {
    color: "#00DD00"
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
        <Typography variant="h5" className={classes[advert.status]}>
          Status: {advert.status}
        </Typography>
        <Typography variant="h5">Impressions: {advert.impressions}</Typography>
        <hr />
        <Typography variant="h5">Redirects to:</Typography>
        <a href={advert.url} target="_blank" className={classes.link}>
          <Typography variant="h5" className={classes.link}>
            {advert.url}
          </Typography>
        </a>
      </CardContent>
      <CardActions>
        {advert.status === "pending" && (
          <React.Fragment>
            <Mutation mutation={ACCEPT_ADVERT}>
              {(acceptAdvert, { data }) => {
                return (
                  <Button
                    onClick={() =>
                      acceptAdvert({
                        variables: { input: { id: advert.id } }
                      }).then(() => location.reload())
                    }
                  >
                    Approve
                  </Button>
                );
              }}
            </Mutation>
            <Mutation mutation={REJECT_ADVERT}>
              {(rejectAdvert, { data }) => {
                return (
                  <Button
                    onClick={() =>
                      rejectAdvert({
                        variables: { input: { id: advert.id } }
                        }).then(() => location.reload())
                    }
                  >
                    Reject
                  </Button>
                );
              }}
            </Mutation>
          </React.Fragment>
        )}
        {advert.status !== "pending" && (
          <Mutation mutation={DELETE_ADVERT}>
            {(advertAdvert, { data }) => {
              return (
                <Button
                  className={classes.dangerButton}
                  onClick={() => {
                    if (confirm("Are you sure"))
                      advertAdvert({
                        variables: { input: { id: advert.id } }
                      }).then(() => location.reload());
                  }}
                >
                  Delete
                </Button>
              );
            }}
          </Mutation>
        )}
      </CardActions>
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
            if (loading) return <ScritchSpinner size={128} />;
            if (error) return null; //TODO error
            if (
              !data ||
              !data.moderationAdverts ||
              data.moderationAdverts.length === 0
            ) {
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
