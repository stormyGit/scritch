import React from "react";
import uuidv4 from "uuid/v4";

import { Query, Mutation } from "react-apollo";
import { LOAD_FURSUITS } from "../../queries/fursuitQueries";
import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";
import Tooltip from "@material-ui/core/Tooltip";
import RequestFursuitDialog from "./RequestFursuitDialog";

import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import PageTitle from "../Global/PageTitle";

import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import FursuitCard from "./FursuitCard";

import { READ_MAKER_NOTIFICATIONS } from "../../queries/subscriptionMutations";
import Background from "../../photo.jpg";

import { Link, withRouter } from "react-router-dom";

import FursuitFilters from "./FursuitFilters";
import FursuitFiltersMobile from "./FursuitFiltersMobile";
import FursuitModal from "./FursuitModal";
import FursuitModalMobile from "./FursuitModalMobile";

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
    textAlign: "center",
    alignItems: "center",
    top: 0
  }
});

class Fursuits extends React.Component {
  state = {
    assetRequestDialog: false,
    uuid: null,
    hasMore: true,
    name: "",
    speciesIds: [],
    fursuitLegType: "",
    fursuitStyle: "",
    fursuitBuild: "",
    fursuitPadding: "",
    fursuitGender: "",
    fursuitFingers: "",
    fursuitColor: "",
    fursuitEyes: "",
    maker: "",
    hybridSearch: false,
    request: 0,
    fursuit: null,
    openFursuit: false
  };

  clearFilters() {
    this.setState({
      name: "",
      speciesIds: [],
      fursuitLegType: "",
      fursuitStyle: "",
      fursuitBuild: "",
      fursuitPadding: "",
      fursuitGender: "",
      fursuitFingers: "",
      hybridSearch: false,
      fursuitColor: "",
      fursuitEyes: "",
      maker: ""
    });
  }

  renderResults({ data, onLoadMore, hasMore, withMaker }) {
    const { classes } = this.props;

    if (data.fursuits.length === 0) {
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
        {data.fursuits.map(fursuit => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={fursuit.id}>
            <FursuitCard
              withMaker={true}
              fursuit={fursuit}
              openFursuit={fursuit => {
                this.setState({ openFursuit: true, fursuit: fursuit });
              }}
            />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  renderFiltersWithSubsClear() {
    const { classes, location, width } = this.props;
    return (
      <Grid
        spacing={8}
        container
        className={classes.filters}
        alignItems="center"
      >
        {(width === "xl" || width === "lg") && (
          <Grid item lg={2}>
            <img
              style={{ width: "80%" }}
              src={require("images/pixel/Header - Search Fursuit Browse.png")}
            />
          </Grid>
        )}
        <Grid item xs={12} lg={8}>
          {width === "xs" || width === "sm" ? (
            <FursuitFiltersMobile
              onChange={value => {
                this.setState({
                  [value.label]: value.value,
                  request: this.state.request + 1
                });
              }}
              clearFilters={() => this.clearFilters()}
            />
          ) : (
            <FursuitFilters
              onChange={value => {
                this.setState({
                  [value.label]: value.value,
                  request: this.state.request + 1
                });
              }}
              clearFilters={() => this.clearFilters()}
            />
          )}
        </Grid>
        <Grid item xs={12} lg={2}>
          <Mutation
            mutation={READ_MAKER_NOTIFICATIONS}
            onCompleted={() => this.setState({ uuid: uuidv4() })}
          >
            {(readSubs, { data }) => (
              <Tooltip title="Clears Subs">
                <Button
                  size="large"
                  variant="outlined"
                  className={classes.clearSubsButton}
                  onClick={() => {
                    readSubs({ variables: { input: {} } });
                  }}
                >
                  Clear
                </Button>
              </Tooltip>
            )}
          </Mutation>
        </Grid>
      </Grid>
    );
  }

  renderFilters() {
    const { classes, location, width } = this.props;
    return (
      <Grid
        spacing={8}
        container
        className={classes.filters}
        alignItems="center"
      >
        {(width === "xl" || width === "lg") && (
          <Grid item lg={2}>
            <img
              style={{ width: "80%" }}
              src={require("images/pixel/Header - Search Fursuit Browse.png")}
            />
          </Grid>
        )}
        <Grid item xs={12} lg={8}>
          {width === "xs" || width === "sm" ? (
            <FursuitFiltersMobile
              onChange={value => {
                this.setState({
                  [value.label]: value.value,
                  request: this.state.request + 1
                });
              }}
              clearFilters={() => this.clearFilters()}
            />
          ) : (
            <FursuitFilters
              onChange={value => {
                this.setState({
                  [value.label]: value.value,
                  request: this.state.request + 1
                });
              }}
              clearFilters={() => this.clearFilters()}
            />
          )}
        </Grid>
        <Grid item xs={12} lg={2}>
          <Button
            size="large"
            variant="outlined"
            className={classes.requestButton}
            onClick={() => this.setState({ assetRequestDialog: true })}
          >
            Request a new Fursuit
          </Button>
        </Grid>
      </Grid>
    );
  }

  render() {
    const { classes, location, width, searching, withSubsClear } = this.props;
    const query = searching ? queryString.parse(location.search) : null;
    let limit = query ? 12 : parseInt(process.env.MEDIA_PAGE_SIZE);

    return (
      <React.Fragment>
        {!searching && !withSubsClear && <PageTitle>Fursuits</PageTitle>}
        {!searching && !withSubsClear && this.renderFilters()}
        {!searching && withSubsClear && this.renderFiltersWithSubsClear()}
        {this.state.openFursuit &&
          this.state.fursuit &&
          (width === "xs" || width === "sm") && (
            <FursuitModalMobile
              open={this.state.openFursuit}
              onClose={() =>
                this.setState({ openFursuit: false, fursuit: null })
              }
              fursuit={this.state.fursuit}
            />
          )}
        {this.state.openFursuit &&
          this.state.fursuit &&
          width !== "xs" &&
          width !== "sm" && (
            <FursuitModal
              open={this.state.openFursuit}
              onClose={() =>
                this.setState({ openFursuit: false, fursuit: null })
              }
              fursuit={this.state.fursuit}
            />
          )}
        <Query
          query={LOAD_FURSUITS}
          variables={{
            name: searching ? query.q : this.state.name,
            fursuitLegType: this.state.fursuitLegType,
            fursuitStyle: this.state.fursuitStyle,
            filter: this.props.filter,
            uuid: this.state.uuid,
            speciesIds:
              this.state.speciesIds && this.state.speciesIds.map(e => e.value),
            fursuitBuild: this.state.fursuitBuild,
            fursuitPadding: this.state.fursuitPadding,
            fursuitGender: this.state.fursuitGender,
            fursuitFingers: this.state.fursuitFingers,
            fursuitColor: this.state.fursuitColor,
            fursuitEyes: this.state.fursuitEyes,
            hybridSearch: this.state.hybridSearch,
            maker: this.state.maker,
            limit,
            offset: 0
          }}
        >
          {({ data, loading, error, fetchMore }) => {
            if (loading || error || !data || !data.fursuits) return null;
            return (
              <React.Fragment>
                <Grid
                  container
                  className={classes.root}
                  spacing={8}
                  style={{
                    marginTop: width === "lg" || width === "xl" ? 4 : -4
                  }}
                >
                  {this.renderResults({
                    data,
                    horizontal: false,
                    hasMore:
                      data.fursuits.length % limit === 0 &&
                      this.state.hasMore &&
                      data.fursuits.length > 0,
                    onLoadMore: () => {
                      fetchMore({
                        variables: {
                          offset: data.fursuits.length,
                          limit
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;

                          if (fetchMoreResult.fursuits.length === 0) {
                            this.setState({ hasMore: false });
                          } else {
                            return Object.assign({}, prev, {
                              fursuits: [
                                ...prev.fursuits,
                                ...fetchMoreResult.fursuits
                              ]
                            });
                          }
                        }
                      });
                    }
                  })}
                </Grid>
              </React.Fragment>
            );
          }}
        </Query>
        <RequestFursuitDialog
          open={this.state.assetRequestDialog}
          onClose={() => this.setState({ assetRequestDialog: false })}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Fursuits));
