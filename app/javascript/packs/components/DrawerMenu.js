import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Query, Mutation, withApollo } from 'react-apollo';

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
import LogoutIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

import TermsDialog from './TermsDialog';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import SettingsDialog from './SettingsDialog';
import SignUpDialog from './SignUpDialog';
import EditMediumDialog from './EditMediumDialog';
import ActivitiesDialog from './ActivitiesDialog';

import ProfileAvatar from './ProfileAvatar';
import themeSelector from '../themeSelector';

import BannerPlaceholder from './BannerPlaceholder';

import { Link, withRouter } from 'react-router-dom'

import { DELETE_SESSION, GET_SESSION, GET_UNREAD_ACTIVITY_COUNT } from '../queries';
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
    uploadDialog: false,
    activitiesDialog: false
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
                    if (this.props.onClose) {
                      this.props.onClose();
                    }
                  }}
                >
                  <BannerPlaceholder
                    slug={currentSession.user.slug}
                    className={classes.bannerPlaceholder}
                    length={90}
                  />
                  <div className={classes.userInfo}>
                    <ProfileAvatar avatar={currentSession.user.avatar} slug={currentSession.user.slug} />
                    <Typography variant="h6" className={classes.infoText} noWrap>
                     {currentSession.user.name}
                    </Typography>
                  </div>
                </ButtonBase>
            }
            <List>
              {
                !this.props.disableProfile && !currentSession &&
                  <React.Fragment>
                    <ListItem
                      button
                      onClick={() => this.setState({ signUpDialog: true })}
                    >
                      <ListItemIcon className={classes.text} color='secondary'>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Login with Telegram" primaryTypographyProps={{ className: classes.text }} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
              }
              {
                !this.props.disableUpload && currentSession &&
                  <React.Fragment>
                    <ListItem
                      button
                      onClick={() => this.setState({ uploadDialog: true })}
                    >
                      <ListItemIcon className={classes.text} color='secondary'>
                        <UploadIcon />
                      </ListItemIcon>
                      <ListItemText primary="Upload" primaryTypographyProps={{ className: classes.text }} />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
              }
              {
                !this.props.disableNotifications && currentSession &&
                  <React.Fragment>
                    <Query query={GET_UNREAD_ACTIVITY_COUNT} pollInterval={parseInt(process.env.UNREAD_ACTIVITY_COUNT_REFRESH_INTERVAL)}>
                      {({ loading, error, data }) => (
                        <ListItem
                          button
                          onClick={() => this.setState({ activitiesDialog: true })}
                        >
                          <ListItemIcon className={classes.text} color='secondary'>
                            {loading || !data || data.unreadActivityCount === 0 ? <NotificationsNoneIcon /> : <NotificationsIcon />}
                          </ListItemIcon>
                          <ListItemText primary="Notifications" primaryTypographyProps={{ className: classes.text }} />
                        </ListItem>
                      )}
                    </Query>
                    <Divider />
                  </React.Fragment>
              }
              {
                !this.props.disableNavigation &&
                  <React.Fragment>
                    <ListItem
                      button
                      selected={location.pathname === '/' || location.pathname === '/videos'}
                      onClick={() => {
                        this.props.history.push({
                          pathname: '/'
                        });
                        if (this.props.onClose) {
                          this.props.onClose();
                        }
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
                        if (this.props.onClose) {
                          this.props.onClose();
                        }
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
                          disabled={currentSession.user.followingCount === 0}
                          selected={location.pathname === '/subscriptions'}
                          onClick={() => {
                            this.props.history.push({
                              pathname: '/subscriptions'
                            });
                            if (this.props.onClose) {
                              this.props.onClose();
                            }
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
                currentSession && !this.props.disableSettings &&
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
              {
                currentSession &&
                  <React.Fragment>
                    <Divider />
                    <Mutation
                      mutation={DELETE_SESSION}
                      update={(cache) => {
                        cache.writeQuery({
                          query: GET_SESSION,
                          data: { session: null }
                        });
                        themeSelector();
                      }}
                    >
                      {( deleteSession, { data }) => (
                        <ListItem
                          button
                          onClick={() => {
                            deleteSession({ variables: { input: { id: currentSession.id }}})
                              .then(() => {
                                localStorage.setItem('token', null);
                                if (this.props.onClose) {
                                  this.props.onClose();
                                }
                              });
                          }}
                        >
                          <ListItemIcon className={classes.text}>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary={`Logout from ${process.env.SITE_NAME}`} />
                        </ListItem>
                      )}
                    </Mutation>
                  </React.Fragment>
              }
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
        <EditMediumDialog
          open={this.state.uploadDialog}
          uploadEnabled
          onClose={() => {
            this.setState({ uploadDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
          medium={{
            title: '',
            description: '',
            commentsDisabled: false
          }}
        />
        <ActivitiesDialog
          open={this.state.activitiesDialog}
          onClose={() => {
            this.setState({ activitiesDialog: false });
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
