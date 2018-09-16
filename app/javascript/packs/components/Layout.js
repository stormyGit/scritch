import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { HashRouter, Route, Switch } from 'react-router-dom'

import SearchBar from 'material-ui-search-bar'

import AppDrawer from './AppDrawer';
import Media from './Media';
import Medium from './Medium';
import User from './User';
import SignUpDialog from './SignUpDialog';
import UploadDialog from './UploadDialog';
import TermsDialog from './TermsDialog';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';

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

function Layout(props) {
  const { classes } = props;

  return (
    <HashRouter>
      <div className="App">
        <div className={classes.root}>
          <AppDrawer />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route exact path='/' component={Media} />
              <Route exact path='/videos' component={Media} />
              <Route exact path='/videos/:id' component={Medium} />
              <Route exact path='/:id' component={User} />
            </Switch>
          </main>
        </div>
        <SignUpDialog />
        <UploadDialog />
        <TermsDialog />
        <PrivacyPolicyDialog />
      </div>
    </HashRouter>
  );
}

const ConnectedLayout = connect(
  ({ session }) => ({
  })
)(Layout)

export default withStyles(styles)(ConnectedLayout);
