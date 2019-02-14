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

import { Link, withRouter } from "react-router-dom";

import {
  LOAD_LEG_TYPES,
  LOAD_STYLES,
  LOAD_SPECIES,
  LOAD_MAKERS
} from "../queries";

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

class FursuitFiltersMakers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  componentDidMount() {}

  clearFilters(filter) {
    var criteria = {
      maker: null
    };
    this.setState({
      maker: null
    });
    this.props.onChange(criteria);
  }

  renderMakerFilter() {
    const { classes } = this.props;

    return (
      <Query query={LOAD_MAKERS} variables={{ offset: 0, limit: 1000 }}>
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

          const makersList = [];
          data.makers.map(e => makersList.push({ value: e.id, label: e.name }));

          return (
            <Grid item xs={4}>
              <Select
                fullWidth
                placeholder="Maker"
                isClearable
                isSearchable
                value={this.state.maker}
                onChange={maker => {
                  this.setState({ maker: maker });
                  this.props.onChange({
                    maker: maker
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

  render() {
    return this.renderMakerFilter();
  }
}

export default withStyles(styles)(FursuitFiltersMakers);
