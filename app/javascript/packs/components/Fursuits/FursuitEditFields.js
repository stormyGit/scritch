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

import { makersList } from "../../makersList";
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

import { LOAD_MAKERS } from "../../queries/makerQueries";

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
      fontWeight: 200,
      paddingLeft: theme.spacing.unit,
      paddingTop: theme.spacing.unit
    }
  };
};

class FursuitEditFields extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fursuitLegType: null,
      fursuitStyle: null,
      species: [],
      hybridSearch: false,
      fursuitBuild: null,
      fursuitPadding: null,
      fursuitFingers: null,
      fursuitColor: "",
      fursuitEyes: "",
      maker: null
    };
  }
  componentDidMount() {
    this.setInitialValues(this.props.fursuit);
  }

  setInitialValues(fursuit) {
    this.setState({
      id: fursuit.id,
      fursuitLegType: this.props.fursuit.fursuitLegType && {
        value: this.props.fursuit.fursuitLegType.id,
        label: this.props.fursuit.fursuitLegType.name
      },
      fursuitStyle: this.props.fursuit.fursuitStyle && {
        value: this.props.fursuit.fursuitStyle.id,
        label: this.props.fursuit.fursuitStyle.name
      },
      speciesIds:
        fursuit.species && fursuit.species.length > 0
          ? this.props.fursuit.species.map(e => ({
              value: e.id,
              label: e.name
            }))
          : [],
      hybridSearch: fursuit.isHybrid,
      fursuitBuild: this.props.fursuit.fursuitBuild && {
        value: this.props.fursuit.fursuitBuild.id,
        label: this.props.fursuit.fursuitBuild.name
      },
      fursuitPadding: this.props.fursuit.fursuitPadding && {
        value: this.props.fursuit.fursuitPadding.id,
        label: this.props.fursuit.fursuitPadding.name
      },
      fursuitFinger: this.props.fursuit.fursuitFinger && {
        value: this.props.fursuit.fursuitFinger.id,
        label: this.props.fursuit.fursuitFinger.name
      },
      fursuitGender: this.props.fursuit.fursuitGender && {
        value: this.props.fursuit.fursuitGender.id,
        label: this.props.fursuit.fursuitGender.name
      },
      baseColor: this.props.fursuit.baseColor && {
        value: this.props.fursuit.baseColor,
        label: this.props.fursuit.baseColor
      },
      eyesColor: this.props.fursuit.eyesColor && {
        value: this.props.fursuit.eyesColor,
        label: this.props.fursuit.eyesColor
      },
      maker: this.props.fursuit.makers.length > 0 && {
        value: this.props.fursuit.makers[0].id,
        label: this.props.fursuit.makers[0].name
      }
    });
  }

  renderFursuitLegsFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.label}>
          Leg type
        </Typography>
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
                  options={data.fursuitLegTypes.map(option => ({
                    label: option.name,
                    value: option.id
                  }))}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }

  renderFursuitStylesFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.label}>
          Style
        </Typography>
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
                  options={data.fursuitStyles.map(option => ({
                    label: option.name,
                    value: option.id
                  }))}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }

  renderFursuitSpeciesFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.label}>
          Species
        </Typography>
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

            return (
              <Grid item xs={12}>
                <Select
                  fullWidth
                  placeholder="Species"
                  isClearable
                  isSearchable
                  value={this.state.speciesIds && this.state.speciesIds[0]}
                  onChange={specy => {
                    this.setState({ speciesIds: specy });
                    this.props.onChange({
                      label: "speciesIds",
                      value: specy ? [specy] : null
                    });
                  }}
                  options={data.species.map(option => ({
                    label: option.name,
                    value: option.id
                  }))}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }

  renderHybridSpeciesFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.label}>
          Species
        </Typography>
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
                  options={data.species.map(option => ({
                    label: option.name,
                    value: option.id
                  }))}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
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
                if (this.state.speciesIds.length > 0) {
                  this.setState({ speciesIds: [this.state.speciesIds[0]] });
                  this.props.onChange({
                    label: "speciesIds",
                    value: [this.state.speciesIds[0]]
                  });
                }
              }}
            />
          }
          label="Custom Hybrid?"
        />
      </Grid>
    );
  }

  renderFursuitBuildFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.label}>
          Build
        </Typography>
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
                  options={data.fursuitBuilds.map(option => ({
                    label: option.name,
                    value: option.id
                  }))}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }

  renderFursuitGenderFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.label}>
          Appearance
        </Typography>
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
                  options={data.fursuitGenders.map(option => ({
                    label: option.name,
                    value: option.id
                  }))}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }

  renderFursuitPaddingFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.label}>
          Padding
        </Typography>
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
                  options={data.fursuitPaddings.map(option => ({
                    label: option.name,
                    value: option.id
                  }))}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }

  renderFursuitFingersFilter() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Typography variant="h6" className={classes.label}>
          Role
        </Typography>
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

            return (
              <Grid item xs={12}>
                <Select
                  fullWidth
                  placeholder="Role"
                  isClearable
                  isSearchable
                  value={this.state.fursuitFinger}
                  onChange={fingers => {
                    this.setState({ fursuitFinger: fingers });
                    this.props.onChange({
                      label: "fursuitFinger",
                      value: fingers ? fingers.value : null
                    });
                  }}
                  options={data.fursuitFingers.map(option => ({
                    label: option.name,
                    value: option.id
                  }))}
                  className={classes.selectInput}
                />
              </Grid>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }

  renderFursuitColorFilter() {
    const { classes } = this.props;

    return (
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.label}>
          Base Color
        </Typography>
        <Select
          fullWidth
          placeholder="Base Color"
          isClearable
          isSearchable
          value={this.state.baseColor}
          onChange={color => {
            this.setState({ fursuitColor: color });
            this.props.onChange({
              label: "baseColor",
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
        <Typography variant="h6" className={classes.label}>
          Eyes Color
        </Typography>
        <Select
          fullWidth
          placeholder="Eyes Color"
          isClearable
          isSearchable
          value={this.state.eyesColor}
          onChange={color => {
            this.setState({ fursuitEyes: color });
            this.props.onChange({
              label: "eyesColor",
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
      <Grid item xs={12}>
        <Typography variant="h6" className={classes.label}>
          Maker
        </Typography>
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
  }

  renderFilters() {
    const { classes } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
          {this.renderHybridCheck()}
          {!this.state.hybridSearch && this.renderFursuitSpeciesFilter()}
          {this.state.hybridSearch && this.renderHybridSpeciesFilter()}
          {this.renderMakerFilter()}
          {this.renderFursuitStylesFilter()}
          {this.renderFursuitGenderFilter()}
          {this.renderFursuitBuildFilter()}
          {this.renderFursuitPaddingFilter()}
          {this.renderFursuitColorFilter()}
          {this.renderFursuitEyesFilter()}
          {this.renderFursuitLegsFilter()}
          {this.renderFursuitFingersFilter()}
        </Grid>
      </Grid>
    );
  }
  render() {
    return this.renderFilters();
  }
}

export default withStyles(styles)(FursuitEditFields);
