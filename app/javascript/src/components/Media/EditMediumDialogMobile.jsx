import React from "react";
import {withStyles} from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Select from "../Global/Select";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField";
import {Mutation, Query} from "react-apollo";
import {withRouter} from "react-router-dom";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";

import ResponsiveDialog from "../Global/ResponsiveDialog";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";

import ReportDialog from "../AppDialogs/ReportDialog";
import DeleteMediumDialog from "../AppDialogs/DeleteMediumDialog";
import TagReportDialog from "../AppDialogs/TagReportDialog";
import FursuitMiniCard from "../Fursuits/FursuitMiniCard";
import {GET_MEDIUM} from "../../queries/mediaQueries";
import {UPDATE_MEDIUM} from "../../queries/mediaMutations";
import {LOAD_CATEGORIES} from "../../queries/categoryQueries";
import {LOAD_EDITIONS, LOAD_EVENTS_SELECT, LOAD_SUB_EVENTS} from "../../queries/eventQueries";
import {LOAD_FURSUITS} from "../../queries/fursuitQueries";

const styles = theme => ({
  brand: {
    textAlign: "center"
  },
  titleBarContainer: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  link: {
    color: theme.palette.text.primary
  },
  loginButtonContainer: {
    textAlign: "center",
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(2),
    cursor: "pointer"
  },
  selectInput: {
    fontFamily: theme.typography.fontFamily
  },
  fursuitsCountField: {
    width: "100%"
  },
  searchBar: {
    width: "100%"
  },
  inputFields: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  mediaH: {},
  mediaV: {
    transform: "rotate(90deg)"
  },
  tagReportButton: {
    paddingBottom: theme.spacing(1)
  },
  deleteButton: {
    color: theme.palette.danger.main
  },
  domain: {
    marginRight: 1,
    paddingBottom: 3,
    fontSize: "1rem",
    color:
      theme.palette.type === "dark"
        ? "rgba(255, 255, 255, 0.5)"
        : "rgba(0, 0, 0, 0.5)"
  },
  listPadding: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
});

class EditMediumDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submiting: false,
      tagReportDialog: false,
      deleteMediumDialog: false,
      reportDialog: false,
      mediaEvent: null,
      mediaEdition: null,
      mediaCategory: null,
      mediaSubEvent: null,
      fursuits: null,
      fursuitsCount: 0,
      query: "",
      photographerSlug: "",
      photographerString: "",
      isPhotographer: true
    };
  }

  setInitialValues(medium) {
    this.setState({
      mediaEvent: medium.edition
        ? { value: medium.edition.event.id, label: medium.edition.event.name }
        : null,
      mediaEdition: medium.edition
        ? { value: medium.edition.id, label: medium.edition.name }
        : null,
      mediaCategory: medium.category
        ? { value: medium.category.id, label: medium.category.name }
        : null,
      mediaSubEvent: medium.subEvent
        ? { value: medium.subEvent.id, label: medium.subEvent.name }
        : null,
      fursuits: medium.fursuits ? medium.fursuits : [],
      fursuitsCount: medium.fursuitsCount,
      photographerSlug: medium.photographerSlug,
      photographerString: medium.photographerStringg,
      isPhotographer: medium.isPhotographer
    });
  }

  isFormOk() {
    if (this.state.fursuits.length > this.state.fursuitsCount) return false;
    else if (this.state.fursuitsCount > 30) return false;
    else if (
      this.state.mediaEvent &&
      (!this.state.mediaEdition || !this.state.mediaSubEvent)
    )
      return false;
    else if (!this.state.mediaEvent && !this.state.mediaCategory) return false;
    else if (
      !this.state.isPhotographer &&
      !this.state.photographerSlug &&
      !this.state.photographerString
    )
      return false;
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

  renderResults({ data, medium, onLoadMore, hasMore }) {
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
          <Grid
            item
            xs={
              this.state.fursuits.length > 0 || medium.fursuits.length > 0
                ? 4
                : 3
            }
            key={fursuit.id}
          >
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
    const { classes, open, onClose, loading, width, mediumId } = this.props;
    let limit = parseInt(process.env.MEDIA_PAGE_SIZE);
    if (!mediumId || open === false) return null;

    return (
      <Query
        query={GET_MEDIUM}
        variables={{
          id: mediumId
        }}
      >
        {({ data, error, loading }) => {
          if (error || loading || !data) return null;

          const medium = data.medium;
          if (this.state.fursuits == null) {
            this.setInitialValues(medium);
            return null;
          }
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
                        <Grid container spacing={1}>
                          <Grid
                            item
                            xs={this.state.fursuits.length > 0 ? 9 : 12}
                          >
                            <DialogContent style={{ textAlign: "center" }}>
                              <img
                                src={`${medium.thumbnail}`}
                                title={medium.title}
                                className={
                                  medium.exif &&
                                  JSON.parse(medium.exif).Orientation === "6"
                                    ? classes.mediaV
                                    : classes.mediaH
                                }
                                style={{ maxWidth: "100%" }}
                              />
                            </DialogContent>
                            {
                              <Typography variant="subtitle1">
                                Entering No. of Fursuits in this media
                                constitutes 10% Completion, with the remaining
                                90% equally split by the number of Fursuits
                                declared when tagged.
                              </Typography>
                            }
                            <div style={{ padding: 8 }} />
                            <div style={{ paddingLeft: 15 }}>
                              <FormControlLabel
                                className={classes.listPadding}
                                control={
                                  <Checkbox
                                    checked={this.state.isPhotographer}
                                    onChange={e =>
                                      this.setState({
                                        isPhotographer: e.target.checked
                                      })
                                    }
                                    color="primary"
                                  />
                                }
                                label="I captured this media"
                              />
                            </div>
                            {!this.state.isPhotographer && (
                              <React.Fragment>
                                <Typography
                                  variant="body2"
                                  style={{ paddingLeft: 15, paddingBottom: 5 }}
                                >
                                  Provide at least one:
                                </Typography>
                                <div style={{ padding: 5 }} />
                                <TextField
                                  className={classes.listPadding}
                                  label="Photographer's Scritch URL"
                                  name="photographerSlug"
                                  variant="outlined"
                                  style={{ zIndex: 0 }}
                                  value={this.state.photographerSlug}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment
                                        position="start"
                                        className={classes.domain}
                                        disableTypography
                                      >
                                        {"http://scritch.es/"}
                                      </InputAdornment>
                                    )
                                  }}
                                  onChange={e => {
                                    this.setState({
                                      photographerSlug: e.target.value
                                    });
                                  }}
                                  margin="dense"
                                  fullWidth
                                />
                                <TextField
                                  className={classes.listPadding}
                                  label="Photographer's Name"
                                  name="photographerString"
                                  variant="outlined"
                                  style={{ zIndex: 0 }}
                                  value={this.state.photographerString}
                                  onChange={e => {
                                    this.setState({
                                      photographerString: e.target.value
                                    });
                                  }}
                                  margin="dense"
                                  fullWidth
                                />
                                <div style={{ padding: 8 }} />
                              </React.Fragment>
                            )}
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
                                  return <CircularProgress />;
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
                                    fullWidth
                                    clearable={true}
                                    placeholder="Category"
                                    defaultValue={
                                      medium.category
                                        ? {
                                            value: medium.category.id,
                                            label: medium.category.name
                                          }
                                        : null
                                    }
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
                            <hr />
                            <div style={{ padding: 5 }} />
                            <Query
                              query={LOAD_EVENTS_SELECT}
                              variables={{
                                sort: "latest",
                                offset: 0,
                                limit: 1000
                              }}
                            >
                              {({ data, loading, error, fetchMore }) => {
                                if (loading || error) {
                                  return <CircularProgress />;
                                }

                                const eventList = [];
                                data.events.map(e =>
                                  eventList.push({ value: e.id, label: e.name })
                                );
                                return (
                                  <Select
                                    fullWidth
                                    clearable={true}
                                    placeholder="Event"
                                    isSearchable
                                    value={this.state.mediaEvent}
                                    onChange={mediaEvent => {
                                      let editionSwitch =
                                        this.state.mediaEvent &&
                                        this.state.mediaEvent.value !==
                                          mediaEvent;

                                      this.setState({ mediaEvent: mediaEvent });
                                      if (editionSwitch)
                                        this.setState({ mediaEdition: null });
                                    }}
                                    options={eventList}
                                    className={classes.selectInput}
                                  />
                                );
                              }}
                            </Query>
                            <div style={{ padding: 5 }} />
                            {this.state.mediaEvent &&
                              Object.keys(this.state.mediaEvent).length !== 0 &&
                              this.state.mediaEvent.value != null && (
                                <Query
                                  query={LOAD_EDITIONS}
                                  variables={{
                                    sort: "latest",
                                    offset: 0,
                                    limit: 150,
                                    eventId: this.state.mediaEvent.value
                                  }}
                                >
                                  {({ data, loading, error, fetchMore }) => {
                                    if (loading || error) {
                                      return <CircularProgress />;
                                    }

                                    const editionList = [];
                                    data.editions.map(e =>
                                      editionList.push({
                                        value: e.id,
                                        label: e.name
                                      })
                                    );
                                    return (
                                      <Select
                                        fullWidth
                                        clearable={true}
                                        placeholder="Edition"
                                        isSearchable
                                        value={this.state.mediaEdition}
                                        onChange={mediaEdition => {
                                          this.setState({
                                            mediaEdition: mediaEdition
                                          });
                                        }}
                                        options={editionList}
                                        className={classes.selectInput}
                                      />
                                    );
                                  }}
                                </Query>
                              )}
                            <div style={{ padding: 5 }} />
                            <Query
                              query={LOAD_SUB_EVENTS}
                              variables={{
                                sort: "latest",
                                offset: 0,
                                limit: 150
                              }}
                            >
                              {({ data, loading, error, fetchMore }) => {
                                if (loading || error) {
                                  return <CircularProgress />;
                                }
                                const subEventList = [];
                                data.subEvents.map(e =>
                                  subEventList.push({
                                    value: e.id,
                                    label: e.name
                                  })
                                );
                                return (
                                  <Select
                                    fullWidth
                                    clearable={true}
                                    placeholder="SubEvent"
                                    defaultValue={
                                      medium.subEvent
                                        ? {
                                            value: medium.subEvent.id,
                                            label: medium.subEvent.name
                                          }
                                        : null
                                    }
                                    isSearchable
                                    onChange={mediaSubEvent => {
                                      this.setState({
                                        mediaSubEvent: mediaSubEvent
                                      });
                                    }}
                                    options={subEventList}
                                    className={classes.selectInput}
                                  />
                                );
                              }}
                            </Query>
                            <div style={{ padding: 5 }} />
                            <hr />
                            <div style={{ padding: 5 }} />

                            <div className={classes.inputFields}>
                              <TextField
                                label="No. of Fursuits"
                                name="fursuitsCount"
                                type="number"
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
                            </div>
                            <div className={classes.inputFields}>
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
                                      spacing={1}
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
                                          medium,
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
                                      size="small"
                                      onClick={() =>
                                        this.setState({ tagReportDialog: true })
                                      }
                                    >
                                      Report Wrong Tags&nbsp;&nbsp;
                                      <OutlinedFlag />
                                    </Button>
                                    <div style={{ padding: 5 }} />
                                  </div>
                                )}
                                <Grid container spacing={1}>
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
                                  size="large"
                                  disabled={!this.isFormOk()}
                                  onClick={() => {
                                    updateMedium({
                                      variables: {
                                        input: {
                                          id: medium.id,
                                          title: medium.title,
                                          isPhotographer: this.state
                                            .isPhotographer,
                                          photographerSlug: this.state
                                            .photographerSlug,
                                          photographerString: this.state
                                            .photographerString,
                                          fursuitsCount: parseInt(
                                            this.state.fursuitsCount
                                          ),
                                          editionId: this.state.mediaEdition
                                            ? this.state.mediaEdition.value
                                            : null,
                                          categoryId: this.state.mediaCategory
                                            ? this.state.mediaCategory.value
                                            : null,
                                          subEventId: this.state.mediaSubEvent
                                            ? this.state.mediaSubEvent.value
                                            : null,
                                          fursuits: this.state.fursuits.map(
                                            a => a.id
                                          )
                                        }
                                      }
                                    }).then(() => {
                                      onClose();
                                      location.reload();
                                    });
                                  }}
                                >
                                  Submit
                                </Button>
                              }
                            </div>
                          </div>
                        }
                        <div className={classes.loginButtonContainer}>
                          <div className={classes.loginButton}>
                            <Button
                              className={classes.deleteButton}
                              onClick={() =>
                                this.setState({ deleteMediumDialog: true })
                              }
                            >
                              Delete Media
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </ResponsiveDialog>
                    <ReportDialog
                      open={this.state.reportDialog}
                      onClose={() => this.setState({ reportDialog: false })}
                      resource="medium"
                      resourceId={medium.id}
                    />
                    <DeleteMediumDialog
                      open={this.state.deleteMediumDialog}
                      onClose={() =>
                        this.setState({ deleteMediumDialog: false })
                      }
                      mediumId={medium.id}
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
export default withStyles(styles)(withRouter(withWidth()(EditMediumDialog)));
