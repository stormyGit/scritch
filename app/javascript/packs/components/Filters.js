import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import { Link, withRouter } from 'react-router-dom';

import SearchBar from 'material-ui-search-bar';

const styles = theme => {
  return ({
    title: {
      color: theme.palette.primary.main,
      fontFamily: 'Indie Flower',
      textAlign: 'center',
      fontSize: '5em'
    },
    subtitle: {
      color: theme.palette.primary.main,
      fontFamily: 'Indie Flower',
      fontSize: '3em',
      textDecoration: 'none'

    },
    content: {
      color: theme.palette.primary.main,
      fontFamily: 'Ubuntu',
      fontSize: '1em'
    },
    filtersPaper: {
      padding: theme.spacing.unit * 2,
      height: 100,
      borderRadius: 15,
      textAlign: 'center',
      alignItems: 'center',
      textDecoration: 'none'

      // boxShadow: '0 1px 3px 3px rgba(255, 255, 255, 0.7)'
    },
    searchBar: {
      width: '100%'
    },
    filters: {
      textAlign: 'center'
    },
    link: {
      textDecoration: 'none'
    },
    root: {
      flexGrow: 1,
    },
    grid: {
      textDecoration: 'none'

    },
    paper: {
      padding: theme.spacing.unit * 2,
      backgroundColor: theme.palette.secondary.dark,
    },
    back: {
      backgroundColor: theme.palette.secondary.main
    },
    select: {
      color: theme.palette.primary.main,
      "&:before": {
        borderColor: "white"
      },
    },
    icon: {
      fill: 'white'
    }
  });
};

class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: {
        name: "",
      }
    };
  }
  componentDidMount() {

  }

  dataLoader(payload) {
    this.props.onChange(payload);
  }

  handleFilter(e) {
    const criteria = { ...this.state.criteria, [e.target.name]: e.target.value }
    this.setState({ criteria });
    this.dataLoader(criteria);
  }

  clearFilters(filter) {
    var criteria = {name: ""};
    var dataSet = this.selectDataSet();
    if (dataSet && dataSet.length > 0) {
      this.selectDataSet().map((e) => {
        criteria = { ...criteria, [e.name]: "" }
      });
    }
    this.setState({criteria});
    this.dataLoader(criteria);
  }

  handleSearch(val) {
    if (this.state.criteria.name.length >= 1 && val.length < 1) {
      this.reset = true;
    }

    this.setState({ criteria: { ...this.state.criteria, name: val}})

    if (this.loadEventTimer) {
      clearTimeout(this.loadEventTimer);
    }

    if (val.length >= 1) {
      this.loadEventTimer = setTimeout(() => {
        this.dataLoader({ ...this.state.criteria, name: val });
      }, 500);
    }
    else if (this.reset) {
      clearTimeout(this.loadEventTimer);
      this.dataLoader({ ...this.state.criteria, name: "" });
      this.reset = false;
    }
  }

  selectDataSet() {
    switch (this.props.currentFilter) {
      case "Fursuits":
        return this.props.fursuitFilters
        break;
      case "Makers":
        return this.props.makerFilters
        break;
      case "Photographers":
        return this.props.photographerFilters
        break;
      case "Events":
        return this.props.eventFilters
        break;
      case "Editions":
        return this.props.editionFilters
        break;

    }
  }

  renderSelect(filter) {
    const {classes} = this.props;

    if (!this.state.criteria)
      return <div></div>

    return (
      <Select
        value={this.state.criteria[filter] || ""}
        name={filter}
        key={filter}
        displayEmpty
        onChange={(value) => this.handleFilter(value)}
      >
        <MenuItem value="">
          All {filter}
        </MenuItem>
        {
          this.selectDataSet()[filter].map((e) => (
            <MenuItem key={e} value={e}>{e}</MenuItem>
          ))
        }
      </Select>
    );
  }

  renderFilters() {
    const {classes, fursuitFilters, eventFilters, makerFilters, photographerFilters, editionFilters} = this.props;
    var filters = []
    switch (this.props.currentFilter) {
      case "Fursuits":
        for (var key in fursuitFilters) { filters.push(key); }
        break;
      case "Makers":
        for (var key in makerFilters) { filters.push(key); }
        break;
      case "Photographers":
        for (var key in photographerFilters) { filters.push(key); }
        break;
      case "Events":
        for (var key in eventFilters) { filters.push(key); }
        break;
      case "Editions":
        for (var key in editionFilters) { filters.push(key); }
        break;

    }

    return (
      <div>
        <Grid container spacing={16}  >
          <Grid item xs={false} lg={3} />
          <Grid item xs={12} lg={6}>
            <Paper elevation={1} className={classes.filtersPaper}>
              <SearchBar
                className={classes.searchBar}
                onChange={(value) => this.handleSearch(value)}
                value={this.state.criteria.name}
                onCancelSearch={() => this.handleSearch("")}
              />
              <div><br /></div>
              <Grid container spacing={16} >
              {
                filters.map((filter) => (
                  <Grid key={filter} item lg={3}>
                    {
                      this.renderSelect(filter)
                    }
                  </Grid>
                ))
              }
              </Grid>
              <Button onClick={(value) => this.clearFilters(value)}>
                Clear Filters
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={false} lg={3} />
        </Grid>
      </div>
    );
  }
  render() {
    return (
      this.renderFilters()
    );
  }
}

export default withStyles(styles)(Filters);
