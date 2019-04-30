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
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Link, withRouter } from "react-router-dom";

import { fursuitColors } from "../../fursuitColors";
import { fursuitEyes } from "../../fursuitEyes";

import {
  LOAD_LEG_TYPES,
  LOAD_STYLES,
  LOAD_SPECIES,
  LOAD_HYBRID_SPECIES,
  LOAD_BUILDS,
  LOAD_PADDINGS,
  LOAD_FINGERS,
  LOAD_GENDERS
} from "../../queries/fursuitQueries";

import { LOAD_MAKERS_SELECT } from "../../queries/makerQueries";

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
    }
  };
};

class FursuitFiltersMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expansion: false,
      fursuitLegType: null,
      fursuitStyle: null,
      speciesIds: null,
      hybridSearch: false,
      fursuitBuild: null,
      fursuitPadding: null,
      fursuitGender: null,
      fursuitFingers: null,
      fursuitColor: null,
      fursuitEyes: null,
      name: ""
    };
  }
  componentDidMount() {}

  clearFilters(filter) {
    var criteria = {
      name: "",
      fursuitLegType: null,
      fursuitStyle: null,
      speciesIds: null,
      hybridSearch: false,
      fursuitBuild: null,
      fursuitPadding: null,
      fursuitGener: null,
      fursuitFingers: null,
      fursuitColor: null,
      fursuitEyes: null,
      maker: null
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

  renderFursuitLegsFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_LEG_TYPES}>
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

          const legList = [];
          data.fursuitLegTypes.map(e =>
            legList.push({ value: e.id, label: e.name })
          );

          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Leg Type"
                isClearable
                isSearchable
                value={this.state.fursuitLegType}
                onChange={legType => {
                  this.setState({ fursuitLegType: legType });
                  this.props.onChange({
                    label: "fursuitLegType",
                    value: legType ? legType.value : null
                  });
                }}
                options={legList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderFursuitStylesFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_STYLES}>
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

          const stylesList = [];
          data.fursuitStyles.map(e =>
            stylesList.push({ value: e.id, label: e.name })
          );

          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Style"
                isClearable
                isSearchable
                value={this.state.fursuitStyle}
                onChange={style => {
                  this.setState({ fursuitStyle: style });
                  this.props.onChange({
                    label: "fursuitStyle",
                    value: style ? style.value : null
                  });
                }}
                options={stylesList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderFursuitSpeciesFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_SPECIES}>
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

          const speciesList = [];
          data.species.map(e =>
            speciesList.push({ value: e.id, label: e.name })
          );

          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Species"
                isClearable
                isSearchable
                value={this.state.speciesIds}
                onChange={specy => {
                  this.setState({ speciesIds: specy });
                  this.props.onChange({
                    label: "speciesIds",
                    value: specy ? [specy] : null
                  });
                }}
                options={speciesList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderHybridSpeciesFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_SPECIES}>
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
          const speciesList = [];
          data.species.map(e =>
            speciesList.push({ value: e.id, label: e.name })
          );

          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Species"
                isClearable
                isSearchable
                isMulti
                value={this.state.speciesIds}
                onChange={specy => {
                  this.setState({ speciesIds: specy });
                  this.props.onChange({
                    label: "speciesIds",
                    value: specy
                  });
                }}
                options={speciesList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderHybridCheck() {
    const { classes } = this.props;

    return (
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.hybridSearch}
              onChange={() => {
                this.setState({ hybridSearch: event.target.checked });
                this.props.onChange({
                  label: "hybridSearch",
                  value: event.target.checked
                });
              }}
              value={this.state.hybridSearch}
            />
          }
          label="Activate hybrid species search"
        />
      </Grid>
    );
  }

  renderFursuitBuildFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_BUILDS}>
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

          const buildList = [];
          data.fursuitBuilds.map(e =>
            buildList.push({ value: e.id, label: e.name })
          );

          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Build"
                isClearable
                isSearchable
                value={this.state.fursuitBuild}
                onChange={build => {
                  this.setState({ fursuitBuild: build });
                  this.props.onChange({
                    label: "fursuitBuild",
                    value: build ? build.value : null
                  });
                }}
                options={buildList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderFursuitPaddingFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_PADDINGS}>
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

          const paddingList = [];
          data.fursuitPaddings.map(e =>
            paddingList.push({ value: e.id, label: e.name })
          );

          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Padding"
                isClearable
                isSearchable
                value={this.state.fursuitPadding}
                onChange={padding => {
                  this.setState({ fursuitPadding: padding });
                  this.props.onChange({
                    label: "fursuitPadding",
                    value: padding ? padding.value : null
                  });
                }}
                options={paddingList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderFursuitGendersFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_GENDERS}>
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

          const genderList = [];
          data.fursuitGenders.map(e =>
            genderList.push({ value: e.id, label: e.name })
          );

          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Appearance"
                isClearable
                isSearchable
                value={this.state.fursuitGender}
                onChange={gender => {
                  this.setState({ fursuitGender: gender });
                  this.props.onChange({
                    label: "fursuitGender",
                    value: gender ? gender.value : null
                  });
                }}
                options={genderList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderFursuitFingersFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_FINGERS}>
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

          const fingersList = [];
          data.fursuitFingers.map(e =>
            fingersList.push({ value: e.id, label: e.name })
          );

          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Role"
                isClearable
                isSearchable
                value={this.state.fursuitFingers}
                onChange={fingers => {
                  this.setState({ fursuitFingers: fingers });
                  this.props.onChange({
                    label: "fursuitFingers",
                    value: fingers ? fingers.value : null
                  });
                }}
                options={fingersList}
                className={classes.selectInput}
              />
            </Grid>
          );
        }}
      </Query>
    );
  }

  renderFursuitColorFilter() {
    const { classes } = this.props;

    return (
      <Grid item xs={12}>
        <Select
          fullWidth
          placeholder="Base Colour"
          isClearable
          isSearchable
          value={this.state.fursuitColor}
          onChange={color => {
            this.setState({ fursuitColor: color });
            this.props.onChange({
              label: "fursuitColor",
              value: color ? color.value : null
            });
          }}
          options={fursuitColors}
          className={classes.selectInput}
        />
      </Grid>
    );
  }

  renderFursuitEyesFilter() {
    const { classes } = this.props;

    return (
      <Grid item xs={12}>
        <Select
          fullWidth
          placeholder="Eye Colour"
          isClearable
          isSearchable
          value={this.state.fursuitEyes}
          onChange={color => {
            this.setState({ fursuitEyes: color });
            this.props.onChange({
              label: "fursuitEyes",
              value: color ? color.value : null
            });
          }}
          options={fursuitEyes}
          className={classes.selectInput}
        />
      </Grid>
    );
  }

  renderMakerFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_MAKERS_SELECT}>
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

          const makersList = [];
          data.makersSelect.map(e =>
            makersList.push({ value: e.id, label: e.name })
          );

          return (
            <Grid item xs={12}>
              <Select
                fullWidth
                placeholder="Maker"
                isClearable
                isSearchable
                value={this.state.maker}
                onChange={maker => {
                  this.setState({ maker: maker });
                  this.props.onChange({
                    label: "maker",
                    value: maker ? maker.value : null
                  });
                }}
                options={makersList}
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
      <Grid container spacing={8}>
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
              <Grid container spacing={8}>
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
              <Grid container spacing={8}>
                {this.renderFursuitLegsFilter()}
                {this.renderFursuitStylesFilter()}
                {this.renderFursuitBuildFilter()}
                {this.renderFursuitPaddingFilter()}
                {this.renderFursuitFingersFilter()}
                {this.renderFursuitGendersFilter()}
                {this.renderFursuitColorFilter()}
                {this.renderFursuitEyesFilter()}
                {this.renderMakerFilter()}
                {this.renderHybridCheck()}
                {!this.state.hybridSearch && this.renderFursuitSpeciesFilter()}
                {this.state.hybridSearch && this.renderHybridSpeciesFilter()}
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

export default withStyles(styles)(FursuitFiltersMobile);