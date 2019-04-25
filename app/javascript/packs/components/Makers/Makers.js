import React from "react";

import { Query } from "react-apollo";
import { LOAD_MAKERS } from "../../queries/makerQueries";
import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import PageTitle from "../Global/PageTitle";

import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import AssetRequestDialog from "../AppDialogs/AssetRequestDialog";
import MakerCard from "./MakerCard";

import { Link, withRouter } from "react-router-dom";

import MakerFilters from "./MakerFilters";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  filters: {
    padding: theme.spacing.unit * 1,
    textAlign: "center"
  },
  requestButton: {
    top: 0,
    textAlign: "center"
  }
});

class Makers extends React.Component {
  state = {
    hasMore: true,
    assetRequestDialog: false,
    criteria: {
      name: "",
      country: "",
      region: ""
    }
  };

  clearFilters() {
    this.setState({
      name: "",
      country: "",
      region: ""
    });
  }

  renderResults({ data, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (data.makers.length === 0) {
      const { location } = this.props;
      const query = queryString.parse(location.search);

      if (query.q) {
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
        {data.makers.map(maker => (
          <Grid item xs={4} md={3} lg={2} key={maker.id}>
            <MakerCard maker={maker} />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const { classes, location, width, searching } = this.props;
    const query = searching ? queryString.parse(location.search) : null;
    let limit = query ? 12 : parseInt(process.env.MEDIA_PAGE_SIZE);

    return (
      <React.Fragment>
        {!searching && <PageTitle>Makers</PageTitle>}
        <Query
          query={LOAD_MAKERS}
          variables={{
            name: searching ? query.q : this.state.name,
            country: this.state.country,
            region: this.state.region,
            limit,
            offset: 0
          }}
        >
          {({ data, loading, error, fetchMore }) => (
            <React.Fragment>
              {!searching && (
                <Grid spacing={8} container className={classes.filters}>
                  <Grid item xs={2} />
                  <Grid item xs={8}>
                    <MakerFilters
                      onChange={value => {
                        this.setState({ [value.label]: value.value });
                      }}
                      clearFilters={() => this.clearFilters()}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="outlined"
                      size="large"
                      className={classes.requestButton}
                      onClick={() =>
                        this.setState({ assetRequestDialog: true })
                      }
                    >
                      Request a new Maker
                    </Button>
                  </Grid>
                </Grid>
              )}
              <Grid
                container
                className={classes.root}
                spacing={8}
                style={{ marginTop: width === "lg" || width === "xl" ? 4 : -4 }}
              >
                {!loading &&
                  !error &&
                  this.renderResults({
                    data,
                    hasMore:
                      data.makers.length % limit === 0 &&
                      this.state.hasMore &&
                      data.makers.length > 0,
                    onLoadMore: () => {
                      fetchMore({
                        variables: {
                          offset: data.makers.length,
                          limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

                          if (fetchMoreResult.makers.length === 0) {
                            this.setState({ hasMore: false });
                          } else {
                            return Object.assign({}, prev, {
                              makers: [
                                ...prev.makers,
                                ...fetchMoreResult.makers
                              ]
                            });
                          }
                        }
                      });
                    }
                  })}
              </Grid>
            </React.Fragment>
          )}
        </Query>
        <AssetRequestDialog
          open={this.state.assetRequestDialog}
          onClose={() => this.setState({ assetRequestDialog: false })}
          assetType="Maker"
          assetRequestBlurb="Provide as much info such as country"
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Makers));
