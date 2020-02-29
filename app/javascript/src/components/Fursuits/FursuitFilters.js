import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Select from "../Global/Select";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { fursuitColors } from "../../fursuitColors";
import { fursuitEyes } from "../../fursuitEyes";

import {
  LOAD_LEG_TYPES,
  LOAD_STYLES,
  LOAD_SPECIES,
  LOAD_BUILDS,
  LOAD_PADDINGS,
  LOAD_GENDERS,
  LOAD_FINGERS
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

const MakerFilter = React.memo(
  ({ classes, onChange, maker }) => (
    <Query query={LOAD_MAKERS_SELECT}>
      {({ data, loading, error }) => {
        if (error || !data) {
          return null;
        }
        if (loading) {
          return (
            <Grid item xs={12} md={6} lg={4}>
              <CircularProgress />
            </Grid>
          );
        }

        return (
          <Grid item xs={12} md={6} lg={4}>
            <Select
              fullWidth
              placeholder="Maker"
              isClearable
              isSearchable
              value={maker}
              onChange={onChange}
              options={data.makersSelect.map(option => ({
                label: option.name,
                value: option.id
              }))}
              className={classes.selectInput}
            />
          </Grid>
        );
      }}
    </Query>
  ),
  ({ maker: oldMaker }, { maker: newMaker }) => oldMaker == newMaker
);

const GenderFilter = React.memo(
  ({ classes, onChange, gender }) => (
    <React.Fragment>
      <Query query={LOAD_GENDERS}>
        {({ data, loading, error }) => {
          if (error || !data) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <CircularProgress />
              </Grid>
            );
          }

          return (
            <Grid item xs={12} md={6} lg={4}>
              <Select
                fullWidth
                placeholder="Appearance"
                isClearable
                isSearchable
                value={gender}
                onChange={onChange}
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
  ),
  ({ gender: oldGender }, { gender: newGender }) => oldGender == newGender
);

const PaddingFilter = React.memo(
  ({ classes, onChange, padding }) => (
    <React.Fragment>
      <Query query={LOAD_PADDINGS}>
        {({ data, loading, error }) => {
          if (error || !data) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <CircularProgress />
              </Grid>
            );
          }

          return (
            <Grid item xs={12} md={6} lg={4}>
              <Select
                fullWidth
                placeholder="Padding"
                isClearable
                isSearchable
                value={padding}
                onChange={onChange}
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
  ),
  ({ padding: oldPadding }, { padding: newPadding }) => oldPadding == newPadding
);

const FingersFilter = React.memo(
  ({ classes, onChange, finger }) => (
    <React.Fragment>
      <Query query={LOAD_FINGERS}>
        {({ data, loading, error }) => {
          if (error || !data) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <CircularProgress />
              </Grid>
            );
          }

          return (
            <Grid item xs={12} md={6} lg={4}>
              <Select
                fullWidth
                placeholder="Role"
                isClearable
                isSearchable
                value={finger}
                onChange={onChange}
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
  ),
  ({ finger: oldFinger }, { finger: newFinger }) => oldFinger == newFinger
);

const LegFilter = React.memo(
  ({ classes, onChange, legType }) => (
    <React.Fragment>
      <Query query={LOAD_LEG_TYPES}>
        {({ data, loading, error }) => {
          if (error || !data) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <CircularProgress />
              </Grid>
            );
          }

          return (
            <Grid item xs={12} md={6} lg={4}>
              <Select
                fullWidth
                placeholder="Leg Type"
                isClearable
                isSearchable
                value={legType}
                onChange={onChange}
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
  ),
  ({ legType: oldLegType }, { legType: newLegType }) => oldLegType == newLegType
);

const BuildFilter = React.memo(
  ({ classes, onChange, build }) => (
    <React.Fragment>
      <Query query={LOAD_BUILDS}>
        {({ data, loading, error }) => {
          if (error || !data) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <CircularProgress />
              </Grid>
            );
          }

          return (
            <Grid item xs={12} md={6} lg={4}>
              <Select
                fullWidth
                placeholder="Build"
                isClearable
                isSearchable
                value={build}
                onChange={onChange}
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
  ),
  ({ build: oldBuild }, { build: newBuild }) => oldBuild == newBuild
);

const StyleFilter = React.memo(
  ({ classes, onChange, style }) => (
    <React.Fragment>
      <Query query={LOAD_STYLES}>
        {({ data, loading, error }) => {
          if (error || !data) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12} md={6} lg={4}>
                <CircularProgress />
              </Grid>
            );
          }

          return (
            <Grid item xs={12} md={6} lg={4}>
              <Select
                fullWidth
                placeholder="Style"
                isClearable
                isSearchable
                value={style}
                onChange={onChange}
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
  ),
  ({ style: oldStyle }, { style: newStyle }) => oldStyle == newStyle
);

const ColorFilter = React.memo(
  ({ classes, onChange, color }) => (
    <Grid item xs={12} md={6} lg={4}>
      <Select
        fullWidth
        placeholder="Base Colour"
        isClearable
        isSearchable
        value={color}
        onChange={onChange}
        options={fursuitColors}
        className={classes.selectInput}
      />
    </Grid>
  ),
  ({ color: oldColor }, { color: newColor }) => oldColor == newColor
);

const EyesFilter = React.memo(
  ({ classes, onChange, color }) => (
    <Grid item xs={12} md={6} lg={4}>
      <Select
        fullWidth
        placeholder="Eyes Colour"
        isClearable
        isSearchable
        value={color}
        onChange={onChange}
        options={fursuitEyes}
        className={classes.selectInput}
      />
    </Grid>
  ),
  ({ color: oldColor }, { color: newColor }) => oldColor == newColor
);

const HybridCheckbox = React.memo(
  ({ classes, onChange, hybridSearch }) => (
    <Grid item xs={12} md={12} lg={5}>
      <FormControlLabel
        control={<Checkbox checked={hybridSearch} onChange={onChange} />}
        label="Activate hybrid species search"
      />
    </Grid>
  ),
  ({ hybridSearch: oldHybridSearch }, { hybridSearch: newHybridSearch }) =>
    oldHybridSearch == newHybridSearch
);

const FursuitSpeciesFilter = React.memo(
  ({ classes, onChange, speciesIds }) => (
    <React.Fragment>
      <Query query={LOAD_SPECIES}>
        {({ data, loading, error }) => {
          if (error || !data) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12} md={12} lg={7}>
                <CircularProgress />
              </Grid>
            );
          }

          return (
            <Grid item xs={12} md={12} lg={7}>
              <Select
                fullWidth
                placeholder="Species"
                isClearable
                isSearchable
                value={speciesIds ? speciesIds[0] : null}
                onChange={onChange}
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
  ),
  ({ speciesIds: oldSpeciesIds }, { speciesIds: newSpeciesIds }) => oldSpeciesIds == newSpeciesIds
);

const HybridSpeciesFilter = React.memo(
  ({ classes, onChange, speciesIds }) => (
    <React.Fragment>
      <Query query={LOAD_SPECIES}>
        {({ data, loading, error }) => {
          if (error || !data) {
            return null;
          }
          if (loading) {
            return (
              <Grid item xs={12} md={12} lg={7}>
                <CircularProgress />
              </Grid>
            );
          }

          return (
            <Grid item xs={12} md={12} lg={7}>
              <Select
                fullWidth
                placeholder="Species"
                isClearable
                isSearchable
                isMulti
                value={speciesIds}
                onChange={onChange}
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
  ),
  ({ speciesIds: oldSpeciesIds }, { speciesIds: newSpeciesIds }) => oldSpeciesIds == newSpeciesIds
);

class FursuitFilters extends React.Component {
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
      fursuitGender: null,
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

  renderFilters() {
    const { classes } = this.props;

    return (
      <Grid container spacing={1}>
        <Grid item xs={false} lg={1} />
        <Grid item xs={12} lg={10}>
          <ExpansionPanel
            expanded={this.state.expansion}
            onChange={() =>
              this.state.expansion == false && this.setState({ expansion: !this.state.expansion })
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
                <HybridCheckbox
                  classes={classes}
                  hybridSearch={this.state.hybridSearch}
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
                {!this.state.hybridSearch ? (
                  <FursuitSpeciesFilter
                    classes={classes}
                    speciesIds={this.state.speciesIds ? this.state.speciesIds[0] : null}
                    onChange={specy => {
                      this.setState({ speciesIds: [specy] });
                      this.props.onChange({
                        label: "speciesIds",
                        value: specy ? [specy] : null
                      });
                    }}
                  />
                ) : (
                  <HybridSpeciesFilter
                    classes={classes}
                    speciesIds={this.state.speciesIds}
                    onChange={specy => {
                      this.setState({ speciesIds: specy });
                      this.props.onChange({
                        label: "speciesIds",
                        value: specy
                      });
                    }}
                  />
                )}
                <FingersFilter
                  classes={classes}
                  finger={this.state.fursuitFinger}
                  onChange={finger => {
                    this.setState({ fursuitFinger: finger });
                    this.props.onChange({
                      label: "fursuitFinger",
                      value: finger ? finger.value : null
                    });
                  }}
                />
                <MakerFilter
                  classes={classes}
                  maker={this.state.maker}
                  onChange={maker => {
                    this.setState({ maker: maker });
                    this.props.onChange({
                      label: "maker",
                      value: maker ? maker.value : null
                    });
                  }}
                />
                <BuildFilter
                  classes={classes}
                  build={this.state.fursuitBuild}
                  onChange={build => {
                    this.setState({ fursuitBuild: build });
                    this.props.onChange({
                      label: "fursuitBuild",
                      value: build ? build.value : null
                    });
                  }}
                />
                <StyleFilter
                  classes={classes}
                  style={this.state.fursuitStyle}
                  onChange={style => {
                    this.setState({ fursuitStyle: style });
                    this.props.onChange({
                      label: "fursuitStyle",
                      value: style ? style.value : null
                    });
                  }}
                />
                <ColorFilter
                  classes={classes}
                  color={this.state.fursuitColor}
                  onChange={color => {
                    this.setState({ fursuitColor: color });
                    this.props.onChange({
                      label: "fursuitColor",
                      value: color ? color.value : null
                    });
                  }}
                />
                <EyesFilter
                  classes={classes}
                  color={this.state.fursuitEyes}
                  onChange={color => {
                    this.setState({ fursuitEyes: color });
                    this.props.onChange({
                      label: "fursuitEyes",
                      value: color ? color.value : null
                    });
                  }}
                />
                <GenderFilter
                  classes={classes}
                  gender={this.state.fursuitGender}
                  onChange={gender => {
                    this.setState({ fursuitGender: gender });
                    this.props.onChange({
                      label: "fursuitGender",
                      value: gender ? gender.value : null
                    });
                  }}
                />
                <PaddingFilter
                  classes={classes}
                  padding={this.state.fursuitPadding}
                  onChange={padding => {
                    this.setState({ fursuitPadding: padding });
                    this.props.onChange({
                      label: "fursuitPadding",
                      value: padding ? padding.value : null
                    });
                  }}
                />
                <LegFilter
                  classes={classes}
                  legType={this.state.fursuitLegType}
                  onChange={legType => {
                    this.setState({ fursuitLegType: legType });
                    this.props.onChange({
                      label: "fursuitLegType",
                      value: legType ? legType.value : null
                    });
                  }}
                />
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

export default withStyles(styles)(FursuitFilters);
