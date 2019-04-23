import React from "react";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import Input from "@material-ui/core/Input";
import Select from "react-select";
import VirtualizedSelect from "react-virtualized-select";
import CheckIcon from "@material-ui/icons/Check";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import SearchBar from "material-ui-search-bar";
import TextField from "@material-ui/core/TextField";
import ScrollArea from "react-scrollbar";
import "react-virtualized-select/styles.css";
import "react-virtualized/styles.css";
import createFilterOptions from "react-select-fast-filter-options";
import { Mutation, Query } from "react-apollo";
import TelegramLoginButton from "react-telegram-login";
import { withRouter } from "react-router-dom";
import OutlinedFlag from "@material-ui/icons/OutlinedFlag";

import themeSelector from "../../themeSelector";

import ResponsiveDialog from "../Global/ResponsiveDialog";
import EmptyList from "../Global/EmptyList";
import LoadMoreButton from "../Global/LoadMoreButton";
import Logo from "../Global/Logo";

import ReportDialog from "../AppDialogs/ReportDialog";
import DeleteMediumDialog from "../AppDialogs/DeleteMediumDialog";
import TagReportDialog from "../AppDialogs/TagReportDialog";
import FursuitMiniCard from "../Fursuits/FursuitMiniCard";
import { GET_MEDIUM } from "../../queries/mediaQueries";
import { UPDATE_MEDIUM } from "../../queries/mediaMutations";
import { LOAD_CATEGORIES } from "../../queries/categoryQueries";
import {
  LOAD_EVENTS,
  LOAD_EDITIONS,
  LOAD_SUB_EVENTS
} from "../../queries/eventQueries";
import { LOAD_FURSUITS } from "../../queries/fursuitQueries";

const Option = props => {
  const handleClick = event => {
    setTimeout(() => props.onSelect(props.option, event), 90);
  };

  const { children, isFocused, isSelected, onFocus, style } = props;

  const { height, ...rest } = style;

  return (
    <MenuItem
      key={props.key}
      onFocus={onFocus}
      selected={isFocused}
      onClick={handleClick}
      style={rest}
    >
      {props.option.name}
    </MenuItem>
  );
};

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
  mediaH: {},
  mediaV: {
    transform: "rotate(90deg)"
  },
  tagReportButton: {
    paddingBottom: theme.spacing.unit
  },
  deleteButton: {
    color: theme.palette.danger.main
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
      query: ""
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
      fursuitsCount: medium.fursuitsCount
    });
  }

  isFormOk() {
    if (this.state.fursuits.length > this.state.fursuitsCount) return false;
    else if (this.state.fursuitsCount > 30) return false;
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
    const { classes, open, onClose, loading, width, mediumId } = this.props;
    let limit = parseInt(process.env.MEDIA_PAGE_SIZE);
    if (!mediumId || open == false) return null;

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
                    <ResponsiveDialog open={open} onClose={onClose} size={900}>
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
                                const categoryList = [
                                  { value: null, label: "Not applicable" }
                                ];
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
                              query={LOAD_EVENTS}
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

                                const eventList = [
                                  { value: null, label: "Not applicable" }
                                ];
                                data.events.map(e =>
                                  eventList.push({ value: e.id, label: e.name })
                                );
                                return (
                                  <Select
                                    fullWidth
                                    clearable={true}
                                    placeholder="Event"
                                    isSearchable
                                    defaultValue={
                                      medium.edition
                                        ? {
                                            value: medium.edition.event.id,
                                            label: medium.edition.event.name
                                          }
                                        : null
                                    }
                                    onChange={mediaEvent => {
                                      this.setState({ mediaEvent: mediaEvent });
                                      if (mediaEvent.value == null)
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
                              Object.keys(this.state.mediaEvent).length != 0 &&
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
                                        defaultValue={
                                          medium.edition
                                            ? {
                                                value: medium.edition.id,
                                                label: medium.edition.name
                                              }
                                            : null
                                        }
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
                                  size="large"
                                  disabled={!this.isFormOk()}
                                  onClick={() => {
                                    updateMedium({
                                      variables: {
                                        input: {
                                          id: medium.id,
                                          title: medium.title,
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
