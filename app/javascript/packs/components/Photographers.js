import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Query } from 'react-apollo';
import {LOAD_PHOTOGRAPHERS} from "../queries"

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import { Link, withRouter } from 'react-router-dom';

import Filters from './Filters';


const styles = theme => {
  return ({
    root: {
      flexGrow: 1,
    },
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
    grid: {
      paddingLeft: 5,
      paddingRight: 5
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.primary,
      maxWidth: 400,
    },
    filtersPaper: {
      padding: theme.spacing.unit * 2,
      height: 100,
      borderRadius: 15,
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

class Photographers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      criteria: {
        name: "",
        country: ""
      }
    };
  }
  componentDidMount() {
  }

  renderPhotographerList() {
    const {classes} = this.props;

    // TODO ASSET CARD COMPONENT
    return (
      <Query query={LOAD_PHOTOGRAPHERS} variables={this.state.criteria}>
        {({ data, loading, error }) => {
          if (loading) {
            var progress = <LinearProgress classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} />
            if (!data)
              return (null);
          }
          else if (error) {
            return (null);
          }
          else
            var progress = null

          return (
            <div>
              {progress}
              <div style={{padding: 8}}>
                <Grid container spacing={16} >
                {
                  data.photographers &&
                  data.photographers.map((photographer) => (
                    <Grid key={photographer.id} item xs={12} lg={6} className={classes.grid} component={(props) => <Link to={`/photographers/${photographer.slug}`} {...props} />}>
                      <Paper className={classes.paper} >
                        <Typography className={classes.subtitle}>{photographer.name}</Typography>
                      </Paper>
                    </Grid>
                  ))
                }
                </Grid>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }

  render() {
    const {classes, photographers} = this.props;

    return (
      <div>
        <Filters currentFilter="Photographers" onChange={(value) => {this.setState({criteria: value});}} />
        {this.renderPhotographerList()}
      </div>
    );
  }
}

export default withStyles(styles)(Photographers);
