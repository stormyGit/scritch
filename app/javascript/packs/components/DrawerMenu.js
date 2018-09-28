import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import OnDemandVideoIcon from '@material-ui/icons/OndemandVideo';
import SettingsIcon from '@material-ui/icons/Settings';
import ToysIcon from '@material-ui/icons/Toys';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AsssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import TermsDialog from './TermsDialog';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import SettingsDialog from './SettingsDialog';
import SignUpDialog from './SignUpDialog';

import BannerPlaceholder from './BannerPlaceholder';

import { Link, withRouter } from 'react-router-dom'

import withCurrentSession from './withCurrentSession';

const styles = theme => {
  return ({
    drawerSpacer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'space-between'
    },
    profile: {
      minHeight: '20vh',
      display: 'flex'
    },
    BannerPlaceholder: {
      flex: 1
    }
  })
};

class DrawerMenu extends React.Component {
  state = {
    privacyPolicyDialog: false,
    termsDialog: false,
    settingsDialog: false,
    signUpDialog: false
  }
  render() {
    const { classes, location, currentSession } = this.props;

    return (
      <React.Fragment>
        <div className={classes.drawerSpacer}>
          {
            !this.props.disableProfile && currentSession &&
              <div className={classes.profile}>
                <BannerPlaceholder
                  slug={currentSession.user.name}
                  className={classes.BannerPlaceholder}
                  length={90}
                />
              </div>
          }
          {
            !this.props.disableProfile && !currentSession &&
            <List>
              <ListItem
                button
                onClick={() => this.setState({ signUpDialog: true })}
              >
                <ListItemIcon className={classes.text} color='secondary'>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Login with Telegram" primaryTypographyProps={{ className: classes.text }} />
              </ListItem>
            </List>
          }
          {
            !this.props.disableNavigation &&
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
          }
          <div>
            <List>
              {
                currentSession &&
                  <ListItem
                    button
                    onClick={() => this.setState({ settingsDialog: true })}
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
        <SettingsDialog
          open={this.state.settingsDialog}
          onClose={() => {
            this.setState({ settingsDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <TermsDialog
          open={this.state.termsDialog}
          onClose={() => {
            this.setState({ termsDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <PrivacyPolicyDialog
          open={this.state.privacyPolicyDialog}
          onClose={() => {
            this.setState({ privacyPolicyDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <SignUpDialog
          open={this.state.signUpDialog}
          onClose={() => {
            this.setState({ signUpDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(withCurrentSession(DrawerMenu)));
