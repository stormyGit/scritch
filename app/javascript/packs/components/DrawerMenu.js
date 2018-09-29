import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import ButtonBase from '@material-ui/core/ButtonBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import OnDemandVideoIcon from '@material-ui/icons/OndemandVideo';
import SettingsIcon from '@material-ui/icons/Settings';
import ToysIcon from '@material-ui/icons/Toys';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AsssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import UploadIcon from '@material-ui/icons/CloudUpload';

import TermsDialog from './TermsDialog';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import SettingsDialog from './SettingsDialog';
import SignUpDialog from './SignUpDialog';
import UploadDialog from './UploadDialog';
import ProfileAvatar from './ProfileAvatar';

import BannerPlaceholder from './BannerPlaceholder';

import { Link, withRouter } from 'react-router-dom'

import withCurrentSession from './withCurrentSession';

const styles = theme => {
  return ({
    drawerSpacer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    profile: {
      display: 'flex',
      width: '100%',
      position: 'relative',
      justifyContent: 'flex-start',
      padding: theme.spacing.unit * 2,
    },
    bannerPlaceholder: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity: 0.4
    },
    userInfo: {
      display: 'flex',
      zIndex: 1,
      alignItems: 'center',
    },
    infoText: {
      marginLeft: theme.spacing.unit * 2
    }
  })
};

class DrawerMenu extends React.Component {
  state = {
    privacyPolicyDialog: false,
    termsDialog: false,
    settingsDialog: false,
    signUpDialog: false,
    uploadDialog: false
  }
  render() {
    const { classes, location, currentSession } = this.props;

    return (
      <React.Fragment>
        <div className={classes.drawerSpacer}>
          <div>
            {
              !this.props.disableProfile && currentSession &&
                <ButtonBase
                  className={classes.profile}
                  onClick={() => {
                    this.props.history.push({
                      pathname: `/${currentSession.user.slug}`
                    });
                    this.props.onClose();
                  }}
                >
                  <BannerPlaceholder
                    slug={currentSession.user.slug}
                    className={classes.bannerPlaceholder}
                    length={90}
                  />
                  <div className={classes.userInfo}>
                    <ProfileAvatar avatar={currentSession.user.avatar} slug={currentSession.user.slug} />
                    <Typography variant="title" className={classes.infoText} noWrap>
                     {currentSession.user.name}
                    </Typography>
                  </div>
                </ButtonBase>
            }
            <List>
              {
                !this.props.disableProfile && !currentSession &&
                  <ListItem
                    button
                    onClick={() => this.setState({ signUpDialog: true })}
                  >
                    <ListItemIcon className={classes.text} color='secondary'>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Login with Telegram" primaryTypographyProps={{ className: classes.text }} />
                  </ListItem>
              }
              {
                !this.props.disableUpload && currentSession &&
                  <ListItem
                    button
                    onClick={() => this.setState({ uploadDialog: true })}
                  >
                    <ListItemIcon className={classes.text} color='secondary'>
                      <UploadIcon />
                    </ListItemIcon>
                    <ListItemText primary="Upload" primaryTypographyProps={{ className: classes.text }} />
                  </ListItem>
              }
              {(!this.props.disableUpload || !this.props.disableProfile) && <Divider />}
              {
                !this.props.disableNavigation &&
                  <React.Fragment>
                    <ListItem
                      button
                      selected={location.pathname === '/'}
                      onClick={() => {
                        this.props.history.push({
                          pathname: '/'
                        });
                        this.props.onClose();
                      }}
                    >
                      <ListItemIcon className={classes.text} color='secondary'>
                        <OnDemandVideoIcon />
                      </ListItemIcon>
                      <ListItemText primary="Latest videos" primaryTypographyProps={{ className: classes.text }} />
                    </ListItem>
                    <ListItem
                      button
                      selected={location.pathname === '/trending'}
                      onClick={() => {
                        this.props.history.push({
                          pathname: '/trending'
                        });
                        this.props.onClose();
                      }}
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
                          onClick={() => {
                            this.props.history.push({
                              pathname: '/subscriptions'
                            });
                            this.props.onClose();
                          }}
                        >
                          <ListItemIcon className={classes.text} color='secondary'>
                            <SubscriptionsIcon />
                          </ListItemIcon>
                          <ListItemText primary="Subscriptions" primaryTypographyProps={{ className: classes.text }} />
                        </ListItem>
                    }
                  </React.Fragment>
              }
            </List>
          </div>
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
        <UploadDialog
          open={this.state.uploadDialog}
          onClose={() => {
            this.setState({ uploadDialog: false });
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
