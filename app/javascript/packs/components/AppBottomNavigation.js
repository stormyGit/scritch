import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'

import withCurrentSession from './withCurrentSession';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import OnDemandVideoIcon from '@material-ui/icons/OndemandVideo';

const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  action: {
    // color: theme.palette.secondary.main
  }
});

class AppBottomNavigation extends React.Component {
  state = {
    value: 'latest',
  };

  handleChange = (event, value) => {
    const routes = {
      latest: '/',
      trending: '/trending',
      subscriptions: '/subscriptions'
    };
    this.props.history.push({
      pathname: routes[value]
    });
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <BottomNavigation
        value={value}
        onChange={this.handleChange}
        className={classes.root}
      >
        <BottomNavigationAction className={classes.action} label="Latest" value="latest" icon={<OnDemandVideoIcon />} />
        <BottomNavigationAction className={classes.action} label="Trending" value="trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction className={classes.action} disabled={!this.props.currentSession} label="Subscriptions" value="subscriptions" icon={<SubscriptionsIcon />} />
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(AppBottomNavigation)));
