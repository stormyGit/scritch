import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Query } from 'react-apollo';
import {LOAD_EVENTS} from "../queries"

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import Filters from './Filters';

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
    back: {
      backgroundColor: theme.palette.secondary.main
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



class Events extends React.Component {
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

  renderEventList() {
    const {classes, events} = this.props;

    return (
      <Query query={LOAD_EVENTS} variables={this.state.criteria}>
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
                  data.events &&
                  data.events.map((event) => (
                    <Grid key={event.id} item xs={12} lg={6} className={classes.grid} component={(props) => <Link to={`/events/${event.slug}`} {...props} />}>
                      <Paper className={classes.paper} >
                        <Typography className={classes.subtitle}>{event.name}</Typography>
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
    const {classes} = this.props;

    return (
      <div>
        <Filters currentFilter="Events" onChange={(value) => {this.setState({criteria: value});}} />
        {this.renderEventList()}
      </div>
    );
  }
}

export default withStyles(styles)(Events);
