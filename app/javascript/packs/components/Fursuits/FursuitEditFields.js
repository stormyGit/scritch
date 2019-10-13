import React from "react";
import { withStyles } from "@material-ui/core/styles";

import { Query } from "react-apollo";

import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { Link } from "react-router-dom";

import { fursuitColors } from "../../fursuitColors";
import { fursuitEyes } from "../../fursuitEyes";

import {
  LOAD_LEG_TYPES,
  LOAD_STYLES,
  LOAD_SPECIES,
  LOAD_BUILDS,
  LOAD_PADDINGS,
  LOAD_FINGERS,
  LOAD_GENDERS
} from "../../queries/fursuitQueries";
import { LOAD_MAKERS_SELECT } from "../../queries/makerQueries";

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
      textDecoration: "none",
      color: theme.palette.primary.main
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

const MakerFilter = React.memo(
  ({ classes, inRequest, onChange, maker }) => (
    <Query query={LOAD_MAKERS_SELECT}>
      {({ data, loading, error }) => {
        if (error || !data) {
          return null;
        }
        if (loading) {
          return (
            <Grid item xs={8}>
              <CircularProgress />
            </Grid>
          );
        }

        return (
          <Grid item xs={12}>
            {inRequest && (
              <Typography variant="h6" className={classes.label}>
                Maker (If Maker is not present,{" "}
                <Link to="/makers" className={classes.link}>
                  Request a New Maker
                </Link>{" "}
                first)
              </Typography>
            )}
            {!inRequest && (
              <Typography variant="h6" className={classes.label}>
                Maker
              </Typography>
            )}
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
    <Grid item xs={12}>
      <Typography variant="h6" className={classes.label}>
        Base Colour
      </Typography>
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
    <Grid item xs={12}>
      <Typography variant="h6" className={classes.label}>
        Base Colour
      </Typography>
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
    <Grid item xs={12}>
      <FormControlLabel
        control={<Checkbox checked={hybridSearch} onChange={onChange} />}
        label="Custom Hybrid?"
      />
    </Grid>
  ),
  ({ hybridSearch: oldHybridSearch }, { hybridSearch: newHybridSearch }) =>
    oldHybridSearch == newHybridSearch
);

const FursuitSpeciesFilter = React.memo(
  ({ classes, onChange, speciesIds }) => (
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
  ({ speciesIds: oldSpeciesIds }, { speciesIds: newSpeciesIds }) =>
    oldSpeciesIds == newSpeciesIds
);

const HybridSpeciesFilter = React.memo(
  ({ classes, onChange, speciesIds }) => (
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
  ({ speciesIds: oldSpeciesIds }, { speciesIds: newSpeciesIds }) =>
    oldSpeciesIds == newSpeciesIds
);

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
    if (!this.props.fursuit) return null;
    this.setState({
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

  renderFilters() {
    const { classes, inRequest } = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item xs={12}>
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
              speciesIds={this.state.speciesIds && this.state.speciesIds[0]}
              onChange={specy => {
                this.setState({ speciesIds: specy });
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
            inRequest={inRequest}
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
            color={this.state.baseColor}
            onChange={color => {
              this.setState({ fursuitColor: color });
              this.props.onChange({
                label: "baseColor",
                value: color ? color.value : null
              });
            }}
          />
          <EyesFilter
            classes={classes}
            color={this.state.eyesColor}
            onChange={color => {
              this.setState({ fursuitEyes: color });
              this.props.onChange({
                label: "eyesColor",
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
      </Grid>
    );
  }
  render() {
    return this.renderFilters();
  }
}

export default withStyles(styles)(FursuitEditFields);
