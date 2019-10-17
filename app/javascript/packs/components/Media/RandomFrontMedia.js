import React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withRouter, Link } from "react-router-dom";
import uuidv4 from "uuid/v4";

import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";

import { GET_FRONT_MEDIA } from "../../queries/mediaQueries";

import MediumCard from "./MediumCard";
import EmptyList from "../Global/EmptyList";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  root: {
    width: "100%"
  },
  filters: {
    padding: theme.spacing.unit * 1,
    textAlign: "center",
    alignItems: "center"
  },
  gridItem: {
    textAlign: "center",
    alignItems: "center"
  },
  font: {
    fontWeight: 200,
    cursor: "pointer"
  },
  link: {
    textDecoration: "none",
    textAlign: "center"
  }
});

const Padder = () => <div style={{ padding: 8 }} />;

class FrontMedia extends React.Component {
  state = {
    uuid: null
  };

  renderResults({ media }) {
    if (media.length === 0) {
      const { location } = this.props;
      const query = location.search ? queryString.parse(location.search) : null;

      if (query && query.q) {
        return (
          <EmptyList
            label={`No results were found for your search term: ${query.q}`}
          />
        );
      } else {
        return <EmptyList label={`No results`} />;
      }
    }

    return (
      <React.Fragment>
        {media.map(medium => (
          <Grid item xs={6} md={4} lg={2} key={medium.id}>
            <MediumCard medium={medium} />
          </Grid>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { filter, classes, width } = this.props;

    let limit = 12;
    let typoSize = width === "xs" || width === "sm" ? "h5" : "h4";

    return (
      <React.Fragment>
        <Query
          query={GET_FRONT_MEDIA}
          fetchPolicy="network-only"
          variables={{
            filter,
            limit,
            uuid: this.state.uuid
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <CircularProgress />;
            if (error || !data)
              return <Typography>Something went wrong :/</Typography>;

            const media = data.frontMedia;
            if (!media) return null;

            return (
              <React.Fragment>
                <Grid container className={classes.root} spacing={8}>
                  {this.renderResults({
                    media
                  })}
                </Grid>
              </React.Fragment>
            );
          }}
        </Query>
        <Padder />
        <Padder />
        <div style={{ width: "100%", textAlign: "center" }}>
          <Button
            variant="outlined"
            onClick={() => this.setState({ uuid: uuidv4() })}
          >
            Refresh Random Media
          </Button>
        </div>
        <Padder />
        <Padder />
        <Link to="/pictures" className={classes.link}>
          <Typography
            variant={typoSize}
            color="primary"
            className={classes.font}
          >
            Browse more Media...
          </Typography>
        </Link>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(withRouter(FrontMedia)));
