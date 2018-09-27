import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Hidden from '@material-ui/core/Hidden';

import { HashRouter, Route, Switch } from 'react-router-dom'

import SearchBar from 'material-ui-search-bar'

import AppDrawer from './AppDrawer';
import Medium from './Medium';
import LatestVideos from './LatestVideos';
import Trending from './Trending';
import Subscriptions from './Subscriptions';
import User from './User';
import Settings from './Settings';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: '100vh'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  brand: {
    fontFamily: "'Caveat Brush', cursive",
    fontSize: '2.5em'
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row'
  },
  content: {
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    overflow: 'hidden'
  },
  toolbar: theme.mixins.toolbar,
});

class Layout extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <HashRouter>
        <div className="App">
          <div className={classes.root}>
            <Hidden mdDown>
              <AppDrawer />
            </Hidden>
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route exact path='/' component={LatestVideos} />
                <Route exact path='/trending' component={Trending} />
                <Route exact path='/subscriptions' component={Subscriptions} />
                <Route exact path='/settings' component={Settings} />
                <Route exact path='/videos' component={LatestVideos} />
                <Route exact path='/videos/:id' component={Medium} />
                <Route exact path='/:id' component={User} />
                <Route exact path='/:id/:tab' component={User} />
              </Switch>
            </main>
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default withStyles(styles)(Layout);
