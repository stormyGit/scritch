import React from 'react';

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
import WhatshotIcon from '@material-ui/icons/Whatshot';

import TermsDialog from './TermsDialog';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';

import { Link, withRouter } from 'react-router-dom'

import { GET_SESSION, DELETE_SESSION, DELETE_USER } from '../queries';

import withCurrentSession from './withCurrentSession';

const drawerWidth = 301;

const styles = theme => {
  console.log(theme);
  return ({
    drawerPadder: {
      width: drawerWidth,
      height: '100%',
      flexShrink: 0
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

class AppDrawer extends React.Component {
  state = {
    privacyPolicyDialog: false,
    termsDialog: false,
  }
  render() {
    const { classes, location, currentSession } = this.props;

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
                        <ListItemText primary="Latest videos" primaryTypographyProps={{ className: classes.text }} />
                      </ListItem>
                      <ListItem
                        button
                        selected={location.pathname === '/trending'}
                        component={(props) => <Link to='/trending' {...props} />}
                      >
                        <ListItemIcon className={classes.text} color='secondary'>
                          <WhatshotIcon />
                        </ListItemIcon>
                        <ListItemText primary="Trending" primaryTypographyProps={{ className: classes.text }} />
                      </ListItem>
                      {
                        currentSession &&
                          <ListItem
                            button
                            selected={location.pathname === '/subscriptions'}
                            component={(props) => <Link to='/subscriptions' {...props} />}
                          >
                            <ListItemIcon className={classes.text} color='secondary'>
                              <SubscriptionsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Subscriptions" primaryTypographyProps={{ className: classes.text }} />
                          </ListItem>
                      }
                    </List>
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
                        onClick={() => this.setState({ termsDialog: true })}
                      >
                        <ListItemIcon className={classes.text}>
                          <VerifiedUserIcon />
                        </ListItemIcon>
                        <ListItemText primary="Terms and conditions" primaryTypographyProps={{ className: classes.text }} />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => this.setState({ privacyPolicyDialog: true })}
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
        <TermsDialog
          open={this.state.termsDialog}
          onClose={() => this.setState({ termsDialog: false })}
        />
        <PrivacyPolicyDialog
          open={this.state.privacyPolicyDialog}
          onClose={() => this.setState({ privacyPolicyDialog: false })}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(withCurrentSession(AppDrawer)));
