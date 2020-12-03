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

import {LOAD_COMMISSION_STATUSES, LOAD_MAKER_COUNTRIES, LOAD_MAKER_REGIONS} from "../../queries/makerQueries";

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

class MakerFiltersMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expansion: false,
      name: "",
      commissionStatus: null,
      country: null,
      region: null
    };
  }
  componentDidMount() {}

  clearFilters(filter) {
    var criteria = {
      name: "",
      commissionStatus: null,
      country: null,
      region: null
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
      <Query query={LOAD_MAKER_COUNTRIES}>
        {({ data, loading, error }) => {
          if (error || !data) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            );
          }

          const countriesList = [];
          data.makersCountry.map(e =>
            countriesList.push({ value: e, label: e })
          );

          return (
            <React.Fragment>
              <Grid item xs={12}>
                <Select
                  fullWidth
                  placeholder="Country"
                  isClearable
                  isSearchable
                  value={this.state.country}
                  onChange={country => {
                    this.setState({ country: country, region: null });
                    this.props.onChange({
                      label: "country",
                      value: country ? country.value : null
                    });
                    this.props.onChange({
                      label: "region",
                      value: null
                    });
                  }}
                  options={countriesList}
                  className={classes.selectInput}
                />
              </Grid>
              {this.state.country &&
                this.renderRegionFilter(this.state.country)}
            </React.Fragment>
          );
        }}
      </Query>
    );
  }

  renderRegionFilter(country) {
    const { classes } = this.props;

    return (
      <Query query={LOAD_MAKER_REGIONS} variables={{ country: country.value }}>
        {({ data, loading, error }) => {
          if (
            error ||
            !data ||
            !data.makersRegion ||
            data.makersRegion.length == 0
          ) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            );
          }

          const regionsList = [];
          data.makersRegion.map(
            e => e && regionsList.push({ value: e, label: e })
          );
          if (regionsList.length == 0) {
            return null;
          }
          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Region"
                isClearable
                isSearchable
                value={this.state.region}
                onChange={region => {
                  this.setState({ region: region });
                  this.props.onChange({
                    label: "region",
                    value: region ? region.value : null
                  });
                }}
                options={regionsList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderCommissionFilter(country) {
    const { classes } = this.props;

    return (
      <Query query={LOAD_COMMISSION_STATUSES}>
        {({ data, loading, error }) => {
          if (error || !data || !data.commissionStatuses) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12}>
                <CircularProgress />
              </Grid>
            );
          }
          const commissionsList = [];
          data.commissionStatuses.map(
            e => e && commissionsList.push({ value: e.id, label: e.name })
          );
          if (commissionsList.length == 0) {
            return null;
          }
          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Commission Status"
                isClearable
                isSearchable
                value={this.state.commissionStatus}
                onChange={commissionStatus => {
                  this.setState({ commissionStatus: commissionStatus });
                  this.props.onChange({
                    label: "commissionStatus",
                    value: commissionStatus ? commissionStatus.value : null
                  });
                }}
                options={commissionsList}
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
        <Grid item xs={false} lg={2} />
        <Grid item xs={12} lg={8}>
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
                {this.renderCommissionFilter()}
              </Grid>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Button onClick={value => this.clearFilters(value)}>
                Clear Filters
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </Grid>
        <Grid item xs={false} lg={3} />
      </Grid>
    );
  }
  render() {
    return this.renderFilters();
  }
}

export default withStyles(styles)(MakerFiltersMobile);
