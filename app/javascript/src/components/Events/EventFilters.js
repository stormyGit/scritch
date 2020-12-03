import React from "react";
import {withStyles} from "@material-ui/core/styles";

import {Query} from "react-apollo";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "../Global/Select";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";

import {LOAD_EVENTS_COUNTRIES, LOAD_EVENTS_STATUSES} from "../../queries/eventQueries";

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
      padding: theme.spacing(2),
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
    }
  };
};

class EventFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expansion: false,
      name: "",
      country: null
    };
  }
  componentDidMount() {}

  clearFilters(filter) {
    const criteria = {
      name: "",
      country: null
    };
    this.setState(criteria);
    this.props.clearFilters();
  }

  handleSearch(val) {
    if (this.state.name.length >= 1 && val.length < 1) {
      this.reset = true;
    }

    this.setState({ name: val });

    if (this.loadEventTimer) {
      clearTimeout(this.loadEventTimer);
    }

    if (val.length >= 1) {
      this.loadEventTimer = setTimeout(() => {
        this.props.onChange({ label: "name", value: val });
      }, 1000);
    } else if (this.reset) {
      clearTimeout(this.loadEventTimer);
      this.props.onChange({ label: "name", value: "" });
      this.reset = false;
    }
  }

  renderCountryFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_EVENTS_COUNTRIES}>
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

          const countriesList = [];
          data.eventsCountry.map(e => countriesList.push({ value: e, label: e }));

          return (
            <Grid item xs={4}>
              <Select
                fullWidth
                placeholder="Country"
                isClearable
                isSearchable
                value={this.state.country}
                onChange={country => {
                  this.setState({ country: country });
                  this.props.onChange({
                    label: "country",
                    value: country ? country.value : null
                  });
                }}
                options={countriesList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderStatusFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_EVENTS_STATUSES}>
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

          const statusesList = [];
          data.eventsStatuses.map(e => statusesList.push({ value: e, label: e }));

          return (
            <Grid item xs={4}>
              <Select
                fullWidth
                placeholder="Status"
                isClearable
                isSearchable
                value={this.state.status}
                onChange={status => {
                  this.setState({ status: status });
                  this.props.onChange({
                    label: "status",
                    value: status ? status.value : null
                  });
                }}
                options={statusesList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderFilters() {
    const { classes } = this.props;

    return (
      <Grid container spacing={1}>
        <Grid item xs={false} lg={1} />
        <Grid item xs={12} lg={10}>
          <ExpansionPanel
            expanded={this.state.expansion}
            onChange={() =>
              this.state.expansion === false && this.setState({ expansion: !this.state.expansion })
            }
          >
            <ExpansionPanelSummary
              expandIcon={
                <ExpandMoreIcon
                  onClick={() => this.setState({ expansion: !this.state.expansion })}
                />
              }
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <SearchBar
                    className={classes.searchBar}
                    onChange={value => this.handleSearch(value)}
                    value={this.state.name}
                    onCancelSearch={() => this.handleSearch("")}
                    placeholder="Search..."
                  />
                </Grid>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={1}>
                {this.renderCountryFilter()}
                {false &&
                  filters.map(filter => (
                    <Grid key={filter} item lg={3}>
                      {this.renderSelect(filter)}
                    </Grid>
                  ))}
                {this.renderStatusFilter()}
              </Grid>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button onClick={value => this.clearFilters(value)}>Clear Filters</Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </Grid>
        <Grid item xs={false} lg={1} />
      </Grid>
    );
  }
  render() {
    return this.renderFilters();
  }
}

export default withStyles(styles)(EventFilters);
