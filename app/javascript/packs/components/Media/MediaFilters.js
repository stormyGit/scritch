import React from "react";
import { withStyles } from "@material-ui/core/styles";

import gql from "graphql-tag";
import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {
  LOAD_EVENTS,
  LOAD_EDITIONS,
  LOAD_SUB_EVENTS
} from "../../queries/eventQueries";
import { LOAD_CATEGORIES } from "../../queries/categoryQueries";
import { LOAD_FURSUITS } from "../../queries/fursuitQueries";

import { Link, withRouter } from "react-router-dom";
import FursuitMiniCard from "../Fursuits/FursuitMiniCard";

import SearchBar from "material-ui-search-bar";

const styles = theme => {
  return {
    title: {
      color: theme.palette.primary.main,
      fontFamily: "Indie Flower",
      textAlign: "center",
      fontSize: "5em"
    },
    subtitle: {
      color: theme.palette.primary.main,
      fontFamily: "Indie Flower",
      fontSize: "3em",
      textDecoration: "none"
    },
    content: {
      color: theme.palette.primary.main,
      fontFamily: "Ubuntu",
      fontSize: "1em"
    },
    filtersPaper: {
      padding: theme.spacing.unit * 2,
      height: 100,
      borderRadius: 15,
      textAlign: "center",
      alignItems: "center",
      textDecoration: "none"

      // boxShadow: '0 1px 3px 3px rgba(255, 255, 255, 0.7)'
    },
    searchBar: {
      width: "100%"
    },
    filters: {
      textAlign: "center"
    },
    link: {
      textDecoration: "none"
    },
    root: {
      flexGrow: 1
    },
    grid: {
      textDecoration: "none"
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: "33.33%",
      flexShrink: 0
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary
    },
    back: {
      backgroundColor: theme.palette.secondary.main
    },
    select: {
      color: theme.palette.primary.main,
      "&:before": {
        borderColor: "white"
      }
    },
    icon: {
      fill: "white"
    },
    selectInput: {
      fontFamily: theme.typography.fontFamily
    },
    label: {
      textAlign: "right",
      fontWeight: 200
    }
  };
};

class MediaFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fursuits: [],
      user: null,
      event: null,
      edition: null,
      category: null,
      subEvent: null,
      sort: { label: "Latest", value: "latest" },
      name: "",
      expansion: false
    };
  }
  componentDidMount() {}

  clearFilters(filter) {
    var criteria = {
      fursuits: [],
      user: null,
      event: null,
      edition: null,
      category: null,
      subEvent: null,
      sort: "latest",
      name: ""
    };
    this.setState(criteria);
    this.props.clearFilters();
  }

  handleSearch(val) {
    if (this.state.name.length >= 1 && val.length < 1) {
      this.reset = true;
    }

    if (this.loadEventTimer) {
      clearTimeout(this.loadEventTimer);
    }

    if (val.length >= 1) {
      this.loadEventTimer = setTimeout(() => {
        this.setState({ name: val });
      }, 500);
    } else if (this.reset) {
      clearTimeout(this.loadEventTimer);
      this.setState({ name: val });
      this.reset = false;
    }
  }

  renderFursuitResults({ data, onLoadMore, hasMore }) {
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
          <Grid item xs={3} lg={2} key={fursuit.id}>
            <FursuitMiniCard
              fursuit={fursuit}
              onClick={payload => {
                this.setState(prevState => ({
                  name: "",
                  fursuits: [...prevState.fursuits, payload]
                }));
                this.props.onChange({
                  label: "fursuits",
                  value: [...this.state.fursuits, payload]
                });
              }}
            />
          </Grid>
        ))}
        {hasMore && <LoadMoreButton onClick={() => onLoadMore()} />}
      </React.Fragment>
    );
  }

  renderEventFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Query query={LOAD_EVENTS} variables={{ limit: 1000, offset: 0 }}>
          {({ data, loading, error }) => {
            if (error || !data) {
              return null;
            }
            if (loading) {
              return (
                <Grid item xs={4}>
                  <CircularProgress />
                </Grid>
              );
            }

            const eventsList = [];
            data.events.map(
              e => e && eventsList.push({ value: e.id, label: e.name })
            );
            if (eventsList.length == 0) {
              return null;
            }
            return (
              <Grid item xs={4}>
                <Select
                  fullWidth
                  placeholder="Event"
                  isClearable
                  isSearchable
                  value={this.state.event}
                  onChange={event => {
                    this.setState({ event: event, edition: null });
                    this.props.onChange({
                      label: "event",
                      value: event
                    });
                    this.props.onChange({
                      label: "edition",
                      value: null
                    });
                  }}
                  options={eventsList}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
        {this.state.event && this.renderEditionFilter()}
        {!this.state.event && (
          <React.Fragment>
            <Grid item xs={4} />
            <Grid item xs={4} />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }

  renderEditionFilter() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Query
          query={LOAD_EDITIONS}
          variables={{ eventId: this.state.event.value, limit: 100, offset: 0 }}
        >
          {({ data, loading, error }) => {
            if (error || !data || !data.editions || data.editions.length == 0) {
              return null;
            }
            if (loading) {
              return (
                <Grid item xs={4}>
                  <CircularProgress />
                </Grid>
              );
            }

            const editionsList = [];
            data.editions.map(
              e => e && editionsList.push({ value: e.id, label: e.name })
            );
            if (editionsList.length == 0) {
              return null;
            }
            return (
              <Grid item xs={4}>
                <Select
                  fullWidth
                  placeholder="Edition"
                  isClearable
                  isSearchable
                  value={this.state.edition}
                  onChange={edition => {
                    this.setState({ edition: edition });
                    this.props.onChange({
                      label: "edition",
                      value: edition
                    });
                  }}
                  options={editionsList}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
        {this.state.edition && this.renderSubEventFilter()}
        {!this.state.edition && <Grid item xs={4} />}
      </React.Fragment>
    );
  }

  // TODO SUBEVENTS
  renderSubEventFilter() {
    const { classes } = this.props;
    return (
      <Query
        query={LOAD_SUB_EVENTS}
        variables={{
          editionId: this.state.edition.value,
          limit: 100,
          offset: 0
        }}
      >
        {({ data, loading, error }) => {
          if (error || !data || !data.subEvents || data.subEvents.length == 0) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={4}>
                <CircularProgress />
              </Grid>
            );
          }

          const subEventsList = [];
          data.subEvents.map(
            e => e && subEventsList.push({ value: e.id, label: e.name })
          );
          if (subEventsList.length == 0) {
            return null;
          }
          return (
            <Grid item xs={4}>
              <Select
                fullWidth
                placeholder="Sub Event"
                isClearable
                isSearchable
                value={this.state.subEvent}
                onChange={subEvent => {
                  this.setState({ subEvent: subEvent });
                  this.props.onChange({
                    label: "subEvent",
                    value: subEvent
                  });
                }}
                options={subEventsList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderCategoryFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Query query={LOAD_CATEGORIES} variables={{ limit: 100, offset: 0 }}>
          {({ data, loading, error }) => {
            if (error || !data) {
              return null;
            }
            if (loading) {
              return (
                <Grid item xs={4}>
                  <CircularProgress />
                </Grid>
              );
            }

            const categoriesList = [];
            data.categories.map(
              e => e && categoriesList.push({ value: e.id, label: e.name })
            );
            if (categoriesList.length == 0) {
              return null;
            }
            return (
              <Grid item xs={4}>
                <Select
                  fullWidth
                  placeholder="Category"
                  isClearable
                  isSearchable
                  value={this.state.category}
                  onChange={category => {
                    this.setState({ category: category });
                    this.props.onChange({
                      label: "category",
                      value: category
                    });
                  }}
                  options={categoriesList}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }

  renderSortingFilter() {
    const { classes } = this.props;

    const sortingList = [
      { label: "Latest First", value: "latest" },
      { label: "Most Scritched", value: "scritches" },
      { label: "Most Viewed", value: "views" }
    ];
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <Typography variant="h5" className={classes.label}>
            Sort by
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Select
            fullWidth
            isClearable
            isSearchable
            value={this.state.sort}
            onChange={sort => {
              this.setState({ sort: sort });
              this.props.onChange({
                label: "sort",
                value: sort ? sort.value : ""
              });
            }}
            options={sortingList}
            className={classes.selectInput}
          />
        </Grid>
      </React.Fragment>
    );
  }

  renderFursuitFilter() {
    const { classes, width } = this.props;
    let limit = 12;

    return (
      <React.Fragment>
        {this.state.name.length >= 1 && (
          <Query
            query={LOAD_FURSUITS}
            variables={{
              name: this.state.name,
              limit,
              offset: 0,
              exclude: this.state.fursuits.map(a => a.id)
            }}
          >
            {({ data, loading, error, fetchMore }) => (
              <React.Fragment>
                <Grid container className={classes.root} spacing={8}>
                  {!loading &&
                    !error &&
                    this.renderFursuitResults({
                      data,
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
            )}
          </Query>
        )}
      </React.Fragment>
    );
  }

  renderFilters() {
    const { classes } = this.props;

    return (
      <Grid container spacing={8}>
        {this.state.fursuits.length == 0 && <Grid item xs={false} lg={2} />}
        <Grid item xs={12} lg={this.state.fursuits.length > 0 ? 10 : 8}>
          <ExpansionPanel
            expanded={this.state.expansion}
            onChange={() =>
              this.state.expansion == false &&
              this.setState({ expansion: !this.state.expansion })
            }
          >
            <ExpansionPanelSummary
              expandIcon={
                <ExpandMoreIcon
                  onClick={() =>
                    this.setState({ expansion: !this.state.expansion })
                  }
                />
              }
            >
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <SearchBar
                    className={classes.searchBar}
                    onChange={value => this.handleSearch(value)}
                    value={this.state.name}
                    onCancelSearch={() => this.handleSearch("")}
                    placeholder="Search fursuits..."
                  />
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={8}>
                {this.state.name && this.renderFursuitFilter()}
                {this.renderEventFilter()}
                {this.renderCategoryFilter()}
                {this.renderSortingFilter()}
              </Grid>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button onClick={value => this.clearFilters(value)}>
                Clear Filters
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </Grid>
        {this.state.fursuits.length > 0 && (
          <Grid item xs={false} lg={2}>
            <Grid container spacing={8}>
              {this.state.fursuits.map(fursuit => (
                <Grid item xs={6} key={fursuit.id}>
                  <FursuitMiniCard
                    fursuit={fursuit}
                    onClick={payload => {
                      let index = this.state.fursuits.indexOf(payload);
                      this.setState({
                        fursuits: this.state.fursuits.filter(
                          (_, i) => i !== index
                        )
                      });
                      this.props.onChange({
                        label: "fursuits",
                        value: this.state.fursuits.filter((_, i) => i !== index)
                      });
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        )}
        {this.state.fursuits.length == 0 && <Grid item xs={false} lg={2} />}
      </Grid>
    );
  }

  render() {
    return this.renderFilters();
  }
}

export default withStyles(styles)(MediaFilters);