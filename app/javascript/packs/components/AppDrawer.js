import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';

import Drawer from '@material-ui/core/Drawer';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import OnDemandVideoIcon from '@material-ui/icons/OndemandVideo';
import ChatIcon from '@material-ui/icons/Chat';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import BugReportIcon from '@material-ui/icons/BugReport';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import InfoIcon from '@material-ui/icons/Info';
import ToysIcon from '@material-ui/icons/Toys';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AsssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';

import { Link, withRouter } from 'react-router-dom'

import { showTermsDialog } from '../actions/termsDialog';
import { showPrivacyPolicyDialog } from '../actions/privacyPolicyDialog';

import { GET_SESSION, DELETE_SESSION, DELETE_USER } from '../queries';

const drawerWidth = 301;

const styles = theme => {
  console.log(theme);
  return ({
    drawerPadder: {
      width: drawerWidth,
      height: '100%',
    },
    drawerSpacer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'space-between'
    },
    drawerPaper: {
      position: 'relative',
      width: drawerWidth,
      position: 'fixed',
      backgroundColor: theme.palette.background.default,
      borderRightWidth: 0
    },
    text: {
    },
    toolbar: theme.mixins.toolbar,
  })
};

const AppDrawer = (props) => {
  const { classes, location, currentUser } = props;

  return (
    <React.Fragment>
      <div className={classes.drawerPadder} />
      <Query query={GET_SESSION}>
        {({ loading, error, data }) => {
          if (loading) {
            return (null);
          }

          return (
            <Drawer
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
              PaperProps={{
                elevation: 0,
              }}
            >
              <div className={classes.toolbar} />
              <div className={classes.drawerSpacer}>
                <div>
                  <List>
                    <ListItem
                      button
                      selected={location.pathname === '/'}
                      component={(props) => <Link to='/' {...props} />}
                    >
                      <ListItemIcon className={classes.text} color='secondary'>
                        <OnDemandVideoIcon />
                      </ListItemIcon>
                      <ListItemText primary="Last videos" primaryTypographyProps={{ className: classes.text }} />
                    </ListItem>
                  </List>
                  {
                    currentUser &&
                      <React.Fragment>
                        <Divider />
                        <List>
                          <ListItem
                            button
                            selected={location.pathname === '/likes'}
                            component={(props) => <Link to='/likes' {...props} />}
                          >
                            <ListItemIcon className={classes.text}>
                              <FavoriteIcon />
                            </ListItemIcon>
                            <ListItemText primary="Favorites" primaryTypographyProps={{ className: classes.text }} />
                          </ListItem>
                          <ListItem
                            button
                            selected={location.pathname === '/groups'}
                            component={(props) => <Link to='/groups' {...props} />}
                          >
                            <ListItemIcon className={classes.text}>
                              <SubscriptionsIcon />
                            </ListItemIcon>
                            <ListItemText primary="My subscriptions" primaryTypographyProps={{ className: classes.text }} />
                          </ListItem>
                        </List>
                      </React.Fragment>
                  }
                </div>
                <div>
                  <List>
                    {
                      !loading && data.session &&
                        <ListItem
                          button
                          selected={location.pathname === '/settings'}
                          component={(props) => <Link to='/settings' {...props} />}
                        >
                          <ListItemIcon>
                            <SettingsIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary="Settings"
                            primaryTypographyProps={{
                              noWrap: true,
                            }}
                          />
                        </ListItem>
                    }
                    <ListItem
                      button
                      component={(props) => <a href='https://lab.howlr.im' target="_blank" {...props} />}
                    >
                      <ListItemIcon className={classes.text}>
                        <ToysIcon />
                      </ListItemIcon>
                      <ListItemText primary="More projects" primaryTypographyProps={{ className: classes.text }} />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => props.showTermsDialog()}
                    >
                      <ListItemIcon className={classes.text}>
                        <VerifiedUserIcon />
                      </ListItemIcon>
                      <ListItemText primary="Terms and conditions" primaryTypographyProps={{ className: classes.text }} />
                    </ListItem>
                    <ListItem
                      button
                      onClick={() => props.showPrivacyPolicyDialog()}
                    >
                      <ListItemIcon className={classes.text}>
                        <AsssistantPhotoIcon />
                      </ListItemIcon>
                      <ListItemText primary="Privacy policy" primaryTypographyProps={{ className: classes.text }} />
                    </ListItem>
                  </List>
                </div>
              </div>
            </Drawer>
          );
        }}
      </Query>
    </React.Fragment>
  );
}

const ConnectedAppDrawer = connect(
  ({ currentUser }) => ({ currentUser }),
  (dispatch) => ({
    showTermsDialog: () => dispatch(showTermsDialog()),
    showPrivacyPolicyDialog: () => dispatch(showPrivacyPolicyDialog()),
  })
)(AppDrawer);

export default withRouter(withStyles(styles)(ConnectedAppDrawer));
