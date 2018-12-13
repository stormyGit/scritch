import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import MenuItem from "@material-ui/core/MenuItem";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Link, withRouter } from 'react-router-dom';

import { LOAD_LEG_TYPES } from '../queries'

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
    heading: {
       fontSize: theme.typography.pxToRem(15),
       flexBasis: '33.33%',
       flexShrink: 0,
     },
     secondaryHeading: {
       fontSize: theme.typography.pxToRem(15),
       color: theme.palette.text.secondary,
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
    },
    selectInput: {
      fontFamily: theme.typography.fontFamily,
    },
  });
};

class FursuitFilters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expansion: false,
      fursuitLegType: null,
      name: "",
    };
  }
  componentDidMount() {

  }

  clearFilters(filter) {
    var criteria = {name: "", fursuitLegType: null};
    this.setState({ name: "", fursuitLegType: null });
    this.props.onChange(criteria);
  }

  handleSearch(val) {
    if (this.state.name.length >= 1 && val.length < 1) {
      this.reset = true;
    }

    this.setState({ name: val })

    if (this.loadEventTimer) {
      clearTimeout(this.loadEventTimer);
    }

    if (val.length >= 1) {
      this.loadEventTimer = setTimeout(() => {
        this.props.onChange({ ...this.state, name: val });
      }, 500);
    }
    else if (this.reset) {
      clearTimeout(this.loadEventTimer);
      this.props.onChange({ ...this.state, name: "" });
      this.reset = false;
    }
  }

  renderFilters() {
    const {classes} = this.props;

    return (
      <div>
        <Grid container spacing={8}  >
          <Grid item xs={false} lg={2} />
          <Grid item xs={12} lg={8}>
            <ExpansionPanel
              expanded={this.state.expansion}
              onChange={() => this.setState({expansion: !this.state.expansion})}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>Filters</Typography>
                <Typography className={classes.secondaryHeading}>Refine your search</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container spacing={8} >
                  <Grid item xs={12}>
                    <SearchBar
                      className={classes.searchBar}
                      onChange={(value) => this.handleSearch(value)}
                      value={this.state.name}
                      onCancelSearch={() => this.handleSearch("")}
                    />
                  </Grid>
                  {
                    <Query query={LOAD_LEG_TYPES}>
                      {
                        ({ data, loading, error }) => {
                          if (loading || error || !data) {
                            return null;
                          }

                          const legList = [];
                          data.fursuitLegTypes.map((e) => legList.push({value: e.id, label: e.name}));

                          return (
                            <Grid item xs={4}>
                              <Select
                                fullWidth
                                placeholder="Leg Type"
                                isSearchable
                                value={this.state.fursuitLegType}
                                onChange={
                                  (legType) => {
                                    console.log(legType);
                                    this.setState({fursuitLegType: legType});
                                    this.props.onChange({ name: this.state.name, fursuitLegType: legType })
                                  }
                                }
                                options={legList}
                                className={classes.selectInput}
                              />
                            </Grid>
                          );
                        }
                      }
                    </Query>
                  }
                  {
                    false &&
                    filters.map((filter) => (
                      <Grid key={filter} item lg={3}>
                      {
                        this.renderSelect(filter)
                      }
                      </Grid>
                    ))
                  }
                </Grid>
              </ExpansionPanelDetails>
              <ExpansionPanelActions>
                <Button onClick={(value) => this.clearFilters(value)}>
                  Clear Filters
                </Button>
              </ExpansionPanelActions>
            </ExpansionPanel>
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

export default withStyles(styles)(FursuitFilters);
