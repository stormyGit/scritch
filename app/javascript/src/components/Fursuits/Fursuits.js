import React from "react";
import uuidv4 from "uuid/v4";

import { Query, Mutation } from "react-apollo";
import { LOAD_FURSUITS } from "../../queries/fursuitQueries";
import queryString from "query-string";
import withWidth from "@material-ui/core/withWidth";
import Tooltip from "@material-ui/core/Tooltip";
import AssetRequestDialog from "../AppDialogs/AssetRequestDialog";

import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import PageTitle from "../Global/PageTitle";

import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import FursuitCard from "./FursuitCard";

import { READ_MAKER_NOTIFICATIONS } from "../../queries/subscriptionMutations";

import { Link } from "react-router-dom";

import FursuitFilters from "./FursuitFilters";
import ScritchSpinner from "../CustomComponents/ScritchSpinner";

const styles = theme => ({
  root: {
    width: "100%",
    padding: theme.spacing(1),
    paddingRight: 0
  },
  filters: {
    padding: theme.spacing(1),
    textAlign: "center"
  },
  requestButton: {
    textAlign: "center",
    alignItems: "center",
    top: 0
  },
  link: {
    textDecoration: "none"
  }
});

class Fursuits extends React.Component {
  state = {
    snack: false,
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
    fursuitFinger: "",
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
      fursuitFinger: "",
      hybridSearch: false,
      fursuitColor: "",
      fursuitEyes: "",
      maker: ""
    });
  }

  renderResults({ data, onLoadMore, hasMore, withMaker }) {
    const { classes } = this.props;

    if (data.fursuits.length === 0) {
      return <EmptyList label={`No results`} />;
    }
    return (
      <React.Fragment>
        {data.fursuits.map(fursuit => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={fursuit.id}>
            <Link to={`/fursuits/${fursuit.slug}`} className={classes.link}>
              <FursuitCard
                withMaker={true}
                fursuit={fursuit}
                openFursuit={fursuit => {
                  this.setState({ openFursuit: true, fursuit: fursuit });
                }}
              />
            </Link>
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  renderFiltersWithSubsClear() {
    const { classes, location, width } = this.props;
    return (
      <Grid spacing={1} container className={classes.filters} alignItems="center">
        {(width === "xl" || width === "lg") && (
          <Grid item lg={2}>
            <img
              style={{ width: "80%" }}
              src={require("images/pixel/Header - Search Fursuit Browse.png")}
            />
          </Grid>
        )}
        <Grid item xs={12} lg={8}>
          <FursuitFilters
            onChange={value => {
              this.setState({
                [value.label]: value.value,
                request: this.state.request + 1
              });
            }}
            clearFilters={() => this.clearFilters()}
          />
        </Grid>
        <Grid item xs={12} lg={2}>
          <Mutation
            mutation={READ_MAKER_NOTIFICATIONS}
            onCompleted={() => this.setState({ uuid: uuidv4() })}
          >
            {(readSubs, { data }) => (
              <Button
                size="large"
                variant="outlined"
                className={classes.clearSubsButton}
                onClick={() => {
                  readSubs({ variables: { input: {} } });
                }}
              >
                Clear New Fursuits
              </Button>
            )}
          </Mutation>
        </Grid>
      </Grid>
    );
  }

  renderFilters() {
    const { classes, location, width } = this.props;
    return (
      <Grid spacing={1} container className={classes.filters} alignItems="center">
        {(width === "xl" || width === "lg") && (
          <Grid item lg={2}>
            <img
              style={{ width: "80%" }}
              src={require("images/pixel/Header - Search Fursuit Browse.png")}
            />
          </Grid>
        )}
        <Grid item xs={12} lg={8}>
          <FursuitFilters
            onChange={value => {
              this.setState({
                [value.label]: value.value,
                request: this.state.request + 1
              });
            }}
            clearFilters={() => this.clearFilters()}
          />
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
    let limit = this.props.search ? 12 : parseInt(process.env.MEDIA_PAGE_SIZE);

    return (
      <React.Fragment>
        {!searching && !withSubsClear && <PageTitle>Fursuits</PageTitle>}
        {!searching && !withSubsClear && this.renderFilters()}
        {!searching && withSubsClear && this.renderFiltersWithSubsClear()}
        <Query
          query={LOAD_FURSUITS}
          variables={{
            name: searching ? this.props.search : this.state.name,
            fursuitLegType: this.state.fursuitLegType,
            fursuitStyle: this.state.fursuitStyle,
            filter: this.props.filter,
            uuid: this.state.uuid,
            speciesIds: this.state.speciesIds && this.state.speciesIds.map(e => e.value),
            fursuitBuild: this.state.fursuitBuild,
            fursuitPadding: this.state.fursuitPadding,
            fursuitGender: this.state.fursuitGender,
            fursuitFinger: this.state.fursuitFinger,
            fursuitColor: this.state.fursuitColor,
            fursuitEyes: this.state.fursuitEyes,
            hybridSearch: this.state.hybridSearch,
            maker: this.state.maker,
            isModerator: false,
            limit,
            offset: 0
          }}
        >
          {({ data, loading, error, fetchMore }) => {
            if (loading) return <ScritchSpinner size={this.props.search ? 64 : 128} />;
            if (error || !data || !data.fursuits) return null;
            return (
              <React.Fragment>
                <Grid
                  container
                  className={classes.root}
                  spacing={3}
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
                              fursuits: [...prev.fursuits, ...fetchMoreResult.fursuits]
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
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.snack}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Fursuit Request Submitted!</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={() => this.setState({ snack: false })}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
        <AssetRequestDialog
          assetType="Fursuit"
          open={this.state.assetRequestDialog}
          keepAssetType="Fursuit"
          onClose={() => this.setState({ assetRequestDialog: false })}
          submitSnack={() => this.setState({ snack: true })}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Fursuits));
