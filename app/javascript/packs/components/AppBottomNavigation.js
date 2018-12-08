import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo';

import withCurrentSession from './withCurrentSession';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';

import SubscriptionsIcon from '@material-ui/icons/ViewCarousel';
import TagIcon from '@material-ui/icons/AssignmentTurnedIn';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PicturesIcon from '@material-ui/icons/PhotoLibrary';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';


const styles = theme => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1,
  },
  bottomNavigationSpacer: {
    height: 56
  },
  label: {
    color: theme.palette.secondary.main,
  },
  selected: {
    '&$selected': {
      paddingTop: 6,
      color: theme.palette.secondary.main,
    },
  }
});

const routes = {
  latest: '/',
  databases: '/databases',
  subscriptions: '/subscriptions',
  tag: '/tag',
};

class AppBottomNavigation extends React.Component {
  state = {
    value: null,
  };

  componentDidMount() {
    this.handleLocation(this.props.location);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location) {
      this.handleLocation(nextProps.location);
    }
  }

  handleLocation(location) {
    if (location.pathname === '/pictures' || location.pathname === '/') {
      this.setState({ value: 'latest'});
    }
    else if (location.pathname === '/databases') {
      this.setState({ value: 'databases'});
    }
    else if (location.pathname === '/subscriptions') {
      this.setState({ value: 'subscriptions'});
    }
    else if (location.pathname === '/tag') {
      this.setState({ value: 'tag'});
    }
    else {
      this.setState({ value: null });
    }
  }

  handleChange = (e, value) => {
    this.props.history.push({
      pathname: routes[value]
    });
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    if (!value) {
      return (null);
    }

    return (
      <React.Fragment>
        <div className={classes.bottomNavigationSpacer}></div>
        <BottomNavigation
          value={value}
          onChange={this.handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            className={classes.action}
            classes={{
              label: classes.label,
              selected: classes.selected,
            }}
            label="Latest"
            value="latest"
            icon={<PicturesIcon />}
          />
          <BottomNavigationAction
            className={classes.action}
            classes={{
              label: classes.label,
              selected: classes.selected,
            }}
            label="Databases"
            value="databases"
            icon={<WhatshotIcon />}
          />
          {
            this.props.currentSession &&
              <BottomNavigationAction
                className={classes.action}
                classes={{
                  label: classes.label,
                  selected: classes.selected,
                }}
                label="Subscriptions"
                value="subscriptions"
                icon={<SubscriptionsIcon />}
              />
          }
          {
            this.props.currentSession &&
              <BottomNavigationAction
                className={classes.action}
                classes={{
                  label: classes.label,
                  selected: classes.selected,
                }}
                label="Tag"
                value="tag"
                icon={<TagIcon />}
              />
          }
        </BottomNavigation>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(withRouter(withCurrentSession(AppBottomNavigation)));
