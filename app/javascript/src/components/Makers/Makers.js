import React from "react";

import {Query} from "react-apollo";
import {LOAD_MAKERS} from "../../queries/makerQueries";
import withWidth from "@material-ui/core/withWidth";

import {withStyles} from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import PageTitle from "../Global/PageTitle";

import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import AssetRequestDialog from "../AppDialogs/AssetRequestDialog";
import MakerCard from "./MakerCard";

import MakerFilters from "./MakerFilters";
import MakerFiltersMobile from "./MakerFiltersMobile";
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
    top: 0,
    textAlign: "center"
  }
});

class Makers extends React.Component {
  state = {
    hasMore: true,
    assetRequestDialog: false,
    snack: false,
    criteria: {
      name: "",
      country: "",
      commissionStatus: null,
      region: ""
    }
  };

  clearFilters() {
    this.setState({
      name: "",
      country: "",
      commissionStatus: null,
      region: ""
    });
  }

  renderResults({ data, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (data.makers.length === 0) {
      return <EmptyList label={`No results`} />;
    }

    return (
      <React.Fragment>
        {data.makers.map(maker => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={maker.id}>
            <MakerCard maker={maker} />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const { classes, location, width, searching } = this.props;
    let limit = this.props.search ? 12 : parseInt(process.env.MEDIA_PAGE_SIZE);

    return (
      <React.Fragment>
        {!searching && <PageTitle>Makers</PageTitle>}
        <Query
          query={LOAD_MAKERS}
          variables={{
            name: searching ? this.props.search : this.state.name,
            country: this.state.country,
            region: this.state.region,
            commissionStatus: this.state.commissionStatus,
            limit,
            offset: 0
          }}
        >
          {({ data, loading, error, fetchMore }) => {
            if (loading) return <ScritchSpinner size={this.props.search ? 64 : 128} />;
            if (error || !data || !data.makers) return null;
            return (
              <React.Fragment>
                {!searching && (
                  <Grid spacing={1} container className={classes.filters} alignItems="center">
                    {(width === "xl" || width === "lg") && (
                      <Grid item lg={2}>
                        <img
                          style={{ width: "80%" }}
                          src={require("images/pixel/Header - Search Maker Browse.png")}
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} lg={8}>
                      {width === "xs" || width === "sm" ? (
                        <MakerFiltersMobile
                          onChange={value => {
                            this.setState({ [value.label]: value.value });
                          }}
                          clearFilters={() => this.clearFilters()}
                        />
                      ) : (
                        <MakerFilters
                          onChange={value => {
                            this.setState({ [value.label]: value.value });
                          }}
                          clearFilters={() => this.clearFilters()}
                        />
                      )}
                    </Grid>
                    <Grid item xs={12} lg={2}>
                      <Button
                        variant="outlined"
                        size="large"
                        className={classes.requestButton}
                        onClick={() => this.setState({ assetRequestDialog: true })}
                      >
                        Request a new Maker
                      </Button>
                    </Grid>
                  </Grid>
                )}
                <Grid
                  container
                  className={classes.root}
                  spacing={3}
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
                                makers: [...prev.makers, ...fetchMoreResult.makers]
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
          message={<span id="message-id">Maker Request Submitted!</span>}
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
          open={this.state.assetRequestDialog}
          keepAssetType="Maker"
          onClose={() => this.setState({ assetRequestDialog: false })}
          assetType="Maker"
          submitSnack={() => this.setState({ snack: true })}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withWidth()(Makers));
