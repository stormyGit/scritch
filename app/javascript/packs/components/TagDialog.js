import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "react-select";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField";
import { Mutation, Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import withCurrentSession from "./withCurrentSession";

import ResponsiveDialog from "./Global/ResponsiveDialog";
import EmptyList from "./Global/EmptyList";
import LoadMoreButton from "./Global/LoadMoreButton";

import ReportDialog from "./AppDialogs/ReportDialog";
import TagReportDialog from "./AppDialogs/TagReportDialog";
import FursuitMiniCard from "./Fursuits/FursuitMiniCard";
import { UPDATE_MEDIUM } from "../queries/mediaMutations";
import { GET_MEDIUM } from "../queries/mediaQueries";
import { LOAD_CATEGORIES } from "../queries/categoryQueries";

import { LOAD_FURSUITS } from "../queries/fursuitQueries";

const styles = theme => ({
  brand: {
    textAlign: "center"
  },
  titleBarContainer: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 3
  },
  link: {
    color: theme.palette.text.primary
  },
  loginButtonContainer: {
    textAlign: "center",
    marginTop: theme.spacing.unit * 2,
    position: "relative"
  },
  loginButton: {
    position: "relative",
    minHeight: 48
  },
  telegramLoader: {
    position: "absolute",
    left: "50%",
    top: 0,
    marginLeft: -16
  },
  troubleLink: {
    textAlign: "center",
    textDecoration: "underline",
    marginTop: theme.spacing.unit * 2,
    cursor: "pointer"
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
  },
  fursuitsCountField: {
    width: "30%"
  },
  searchBar: {
    width: "65%"
  },
  inputFields: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  mediaH: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  mediaHflip: {
    transform: "rotate(180deg)",
    height: "100%",
    width: "100%"
  },
  mediaVleft: {
    transform: "rotate(90deg)",
    height: "100%",
    width: "100%"
  },
  mediaVright: {
    transform: "rotate(-90deg)",
    height: "100%",
    width: "100%"
  },
  tagReportButton: {
    paddingBottom: theme.spacing.unit
  }
});

class TagDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submiting: false,
      tagReportDialog: false,
      reportDialog: false,
      mediaCategory: null,
      fursuits: null,
      fursuitsCount: 0,
      query: ""
    };
  }

  setInitialValues(medium) {
    this.setState({
      mediaCategory: medium.category,
      fursuits: medium.fursuits ? medium.fursuits : [],
      fursuitsCount: medium.fursuitsCount
    });
  }

  isFormOk() {
    if (this.state.fursuits.length > this.state.fursuitsCount) return false;
    return true;
  }

  handleSearch(val) {
    if (this.state.query.length >= 1 && val.length < 1) {
      this.reset = true;
    }

    if (this.loadEventTimer) {
      clearTimeout(this.loadEventTimer);
    }

    if (val.length >= 1) {
      this.loadEventTimer = setTimeout(() => {
        this.setState({ query: val });
      }, 500);
    } else if (this.reset) {
      clearTimeout(this.loadEventTimer);
      this.setState({ query: val });
      this.reset = false;
    }
  }

  renderResults({ data, onLoadMore, hasMore }) {
    const { classes } = this.props;

    if (data.length === 0) {
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
          <Grid item xs={3} key={fursuit.id}>
            <FursuitMiniCard
              fursuit={fursuit}
              onClick={payload => {
                this.setState(prevState => ({
                  query: "",
                  fursuits: [...prevState.fursuits, payload]
                }));
              }}
            />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  render() {
    const {
      classes,
      open,
      onClose,
      loading,
      width,
      mediumId,
      currentSession
    } = this.props;
    let limit = parseInt(process.env.MEDIA_PAGE_SIZE);
    if (!mediumId || open == false) return null;

    return (
      <Query
        query={GET_MEDIUM}
        variables={{
          id: mediumId,
          tagging: true
        }}
      >
        {({ data, error, loading }) => {
          if (error) {
            return (
              <ResponsiveDialog open={open} onClose={onClose}>
                {((width !== "lg" && width !== "xl") || true) && (
                  <DialogTitle className={classes.titleBarContainer}>
                    <Grid
                      container
                      spacing={0}
                      alignItems="center"
                      justify="space-between"
                    >
                      <Grid item>
                        <Typography variant="h6" noWrap color={"inherit"}>
                          {`Picture #${mediumId.split("-")[0]}`}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          color="inherit"
                          onClick={onClose}
                          aria-label="Close"
                        >
                          <CloseIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </DialogTitle>
                )}
                <DialogContent>
                  <Typography variant="h6" noWrap>
                    This Media is currently being tagged by another User.
                  </Typography>
                </DialogContent>
              </ResponsiveDialog>
            );
          }
          if (loading || !data) return null;

          const medium = data.medium;
          if (this.state.fursuits == null) {
            this.setInitialValues(medium);
            return null;
          }

          var orientation;
          if (medium) {
            if (medium.exif && JSON.parse(medium.exif).Orientation === "6")
              orientation = classes.mediaVleft;
            else if (medium.exif && JSON.parse(medium.exif).Orientation === "8")
              orientation = classes.mediaVright;
            else if (medium.exif && JSON.parse(medium.exif).Orientation === "3")
              orientation = classes.mediaHflip;
            else orientation = classes.mediaH;
          } else orientation = classes.mediaH;

          return (
            <Mutation
              mutation={UPDATE_MEDIUM}
              update={(cache, { data: { medium } }) => {
                cache.writeQuery({
                  query: GET_MEDIUM,
                  variables: { id: mediumId },
                  data: {
                    medium: {
                      ...medium
                    }
                  }
                });
              }}
            >
              {(updateMedium, { called }) => {
                return (
                  <React.Fragment>
                    <ResponsiveDialog open={open} onClose={onClose} size={1200}>
                      {((width !== "lg" && width !== "xl") || true) && (
                        <DialogTitle className={classes.titleBarContainer}>
                          <Grid
                            container
                            spacing={0}
                            alignItems="center"
                            justify="space-between"
                          >
                            <Grid item>
                              <Typography variant="h6" noWrap color={"inherit"}>
                                {`Picture #${medium.id.split("-")[0]}`}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <IconButton
                                color="inherit"
                                onClick={onClose}
                                aria-label="Close"
                              >
                                <CloseIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </DialogTitle>
                      )}
                      <DialogContent>
                        <Grid container spacing={8}>
                          <Grid
                            item
                            xs={this.state.fursuits.length > 0 ? 9 : 12}
                          >
                            <DialogContent style={{ textAlign: "center" }}>
                              <img
                                src={`${medium.resized}`}
                                title={medium.title}
                                className={orientation}
                              />
                            </DialogContent>
                            {
                              <Typography variant="subtitle1">
                                The Category makes up 20% of Completion.
                                Entering No. of Fursuits in this media
                                constitutes 10% Completion, with the remaining
                                70% equally split by the number of Fursuits
                                declared when tagged.
                              </Typography>
                            }

                            <div style={{ padding: 8 }} />
                            {!medium.category && (
                              <React.Fragment>
                                <Query
                                  query={LOAD_CATEGORIES}
                                  variables={{
                                    sort: "latest",
                                    offset: 0,
                                    limit: 150
                                  }}
                                >
                                  {({ data, loading, error, fetchMore }) => {
                                    if (loading || error) {
                                      return null;
                                    }
                                    const categoryList = [];
                                    data.categories.map(e =>
                                      categoryList.push({
                                        value: e.id,
                                        label: e.name
                                      })
                                    );
                                    return (
                                      <Select
                                        clearable={true}
                                        placeholder="Category"
                                        isSearchable
                                        onChange={mediaCategory => {
                                          this.setState({
                                            mediaCategory: mediaCategory
                                          });
                                        }}
                                        options={categoryList}
                                        className={classes.selectInput}
                                      />
                                    );
                                  }}
                                </Query>
                                <div style={{ padding: 5 }} />
                              </React.Fragment>
                            )}
                            <div className={classes.inputFields}>
                              <TextField
                                label="No. of Fursuits"
                                name="fursuitsCount"
                                variant="outlined"
                                className={classes.fursuitsCountField}
                                style={{ zIndex: 0 }}
                                value={this.state.fursuitsCount || ""}
                                onChange={e => {
                                  this.setState({
                                    fursuitsCount: e.target.value
                                  });
                                }}
                                margin="dense"
                              />

                              <SearchBar
                                className={classes.searchBar}
                                placeholder="Fursuit Search..."
                                disabled={
                                  this.state.fursuitsCount
                                    ? this.state.fursuits.length >=
                                      this.state.fursuitsCount
                                    : true
                                }
                                onChange={value => this.handleSearch(value)}
                                value={this.state.query}
                                onCancelSearch={() => this.handleSearch("")}
                              />
                            </div>
                            <div style={{ padding: 8 }} />
                            {this.state.query.length >= 1 && (
                              <Query
                                query={LOAD_FURSUITS}
                                variables={{
                                  name: this.state.query,
                                  limit,
                                  offset: 0,
                                  exclude: this.state.fursuits.map(a => a.id)
                                }}
                              >
                                {({ data, loading, error, fetchMore }) => (
                                  <React.Fragment>
                                    <Grid
                                      container
                                      className={classes.root}
                                      spacing={8}
                                      style={{
                                        marginTop:
                                          width === "lg" || width === "xl"
                                            ? 4
                                            : -4
                                      }}
                                    >
                                      {!loading &&
                                        !error &&
                                        this.renderResults({
                                          data,
                                          hasMore:
                                            data.fursuits.length % limit ===
                                              0 &&
                                            this.state.hasMore &&
                                            data.fursuits.length > 0,
                                          onLoadMore: () => {
                                            fetchMore({
                                              variables: {
                                                offset: data.fursuits.length,
                                                limit
                                              },
                                              updateQuery: (
                                                prev,
                                                { fetchMoreResult }
                                              ) => {
                                                if (!fetchMoreResult)
                                                  return prev;

                                                if (
                                                  fetchMoreResult.fursuits
                                                    .length === 0
                                                ) {
                                                  this.setState({
                                                    hasMore: false
                                                  });
                                                } else {
                                                  return Object.assign(
                                                    {},
                                                    prev,
                                                    {
                                                      fursuits: [
                                                        ...prev.fursuits,
                                                        ...fetchMoreResult.fursuits
                                                      ]
                                                    }
                                                  );
                                                }
                                              }
                                            });
                                          }
                                        })}
                                    </Grid>
                                  </React.Fragment>
                                )}
                              </Query>
                            )}
                          </Grid>
                          {this.state.fursuits.length > 0 && (
                            <React.Fragment>
                              <Grid item lg={3} xs={3}>
                                <div style={{ padding: 8 }} />
                                {medium.fursuits.length > 0 && (
                                  <div className={classes.tagReportButton}>
                                    <Button
                                      variant="outlined"
                                      fullWidth
                                      onClick={() =>
                                        this.setState({
                                          tagReportDialog: true
                                        })
                                      }
                                    >
                                      Report Wrong Tags
                                    </Button>
                                  </div>
                                )}
                                <div style={{ padding: 8 }} />
                                {this.state.fursuits.length -
                                  medium.fursuits.length >
                                  0 && (
                                  <div className={classes.tagReportButton}>
                                    <Typography variant="subtitle1">
                                      Click on Fursuit icon to remove selection
                                    </Typography>
                                  </div>
                                )}
                                <Grid container spacing={8}>
                                  {this.state.fursuits.map(fursuit => (
                                    <Grid item xs={12} lg={6} key={fursuit.id}>
                                      <FursuitMiniCard
                                        fursuit={fursuit}
                                        onClick={payload => {
                                          if (
                                            medium.fursuits
                                              .map(e => e.id)
                                              .includes(payload.id)
                                          )
                                            return null;
                                          let index = this.state.fursuits.indexOf(
                                            payload
                                          );
                                          this.setState({
                                            fursuits: this.state.fursuits.filter(
                                              (_, i) => i !== index
                                            )
                                          });
                                        }}
                                      />
                                    </Grid>
                                  ))}
                                </Grid>
                              </Grid>
                            </React.Fragment>
                          )}
                        </Grid>
                        {
                          <div className={classes.loginButtonContainer}>
                            <div className={classes.loginButton}>
                              {
                                <Button
                                  disabled={!this.isFormOk()}
                                  onClick={() => {
                                    updateMedium({
                                      variables: {
                                        input: {
                                          id: medium.id,
                                          title: medium.title,
                                          categoryId:
                                            this.state.mediaCategory &&
                                            this.state.mediaCategory.value,
                                          fursuitsCount: parseInt(
                                            this.state.fursuitsCount
                                          ),
                                          fursuits: this.state.fursuits.map(
                                            a => a.id
                                          )
                                        }
                                      }
                                    }).then(() => {
                                      onClose();
                                      //!this.props.noReload && location.reload();
                                    });
                                  }}
                                >
                                  Submit
                                </Button>
                              }
                            </div>
                          </div>
                        }
                        {true && (
                          <Typography
                            variant="caption"
                            className={classes.troubleLink}
                            onClick={() =>
                              this.setState({ reportDialog: true })
                            }
                          >
                            Report Picture
                          </Typography>
                        )}
                      </DialogContent>
                    </ResponsiveDialog>
                    <ReportDialog
                      open={this.state.reportDialog}
                      onClose={() => this.setState({ reportDialog: false })}
                      resource="medium"
                      resourceId={medium.id}
                    />
                    <TagReportDialog
                      open={this.state.tagReportDialog}
                      onClose={() => this.setState({ tagReportDialog: false })}
                      medium={medium}
                    />
                  </React.Fragment>
                );
              }}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(
  withRouter(withWidth()(withCurrentSession(TagDialog)))
);
