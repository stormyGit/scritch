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
import Badge from '@material-ui/core/Badge';
import withWidth from '@material-ui/core/withWidth';

import SubscriptionsIcon from '@material-ui/icons/ViewCarousel';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import PictureIcon from '@material-ui/icons/PhotoLibrary';
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
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import TagIcon from '@material-ui/icons/AssignmentTurnedIn';

import TermsDialog from './TermsDialog';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';
import SettingsDialog from './SettingsDialog';
import SignUpDialog from './SignUpDialog';
import AnnouncementsDialog from './AnnouncementsDialog';
import MultipleMediaDialog from './MultipleMediaDialog';

import ProfileAvatar from './ProfileAvatar';
import themeSelector from '../themeSelector';

import BannerPlaceholder from './BannerPlaceholder';

import { Link, withRouter } from 'react-router-dom'

import { GET_SESSION } from '../queries';
import withCurrentSession from './withCurrentSession';

const styles = theme => {
  return ({
    drawerSpacer: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
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
    announcementsDialog: false,
  }
  render() {
    const { classes, location, currentSession, width } = this.props;

    return (
      <React.Fragment>
        <div className={classes.drawerSpacer} style={{ justifyContent: (width === 'lg' || width === 'xl') ? 'space-between' : 'flex-start' }}>
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
            <List disablePadding={width !== 'lg' && width !== 'xl'}>
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
                !this.props.disableNavigation &&
                  <React.Fragment>
                    <ListItem
                      button
                      selected={location.pathname === '/' || location.pathname === '/pictures'}
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
                        <PictureIcon />
                      </ListItemIcon>
                      <ListItemText primary="Latest Pictures" primaryTypographyProps={{ className: classes.text }} />
                    </ListItem>
                    <ListItem
                      button
                      selected={location.pathname === '/databases'}
                      onClick={() => {
                        this.props.history.push({
                          pathname: '/databases'
                        });
                        if (this.props.onClose) {
                          this.props.onClose();
                        }
                      }}
                    >
                      <ListItemIcon className={classes.text} color='secondary'>
                        <WhatshotIcon />
                      </ListItemIcon>
                      <ListItemText primary="Databases" primaryTypographyProps={{ className: classes.text }} />
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
                    {
                      currentSession &&
                        <ListItem
                          button
                          selected={location.pathname === '/tag'}
                          onClick={() => {
                            this.props.history.push({
                              pathname: '/tag'
                            });
                            if (this.props.onClose) {
                              this.props.onClose();
                            }
                          }}
                        >
                          <ListItemIcon className={classes.text} color='secondary'>
                            <TagIcon />
                          </ListItemIcon>
                          <ListItemText primary="Tag" primaryTypographyProps={{ className: classes.text }} />
                        </ListItem>
                    }
                  </React.Fragment>
              }
              {
                !this.props.disableUpload && currentSession &&
                  <React.Fragment>
                    <Divider />
                    <ListItem
                      button
                      onClick={() => this.setState({ uploadDialog: true })}
                    >
                      <ListItemIcon className={classes.text} color='secondary'>
                        <UploadIcon />
                      </ListItemIcon>
                      <ListItemText primary="Upload" primaryTypographyProps={{ className: classes.text }} />
                    </ListItem>
                  </React.Fragment>
              }
            </List>
          </div>
          <div style={{textAlign: 'center', padding: 10}}>
            <img src={require('../1.gif')} style={{width: '80%'}} />
          </div>
          <div style={{textAlign: 'center', padding: 10}}>
            <img src={require('../2.gif')} style={{width: '80%'}} />
          </div>
          <div>
            <List disablePadding={width !== 'lg' && width !== 'xl'}>
              {
                currentSession && !this.props.disableSettings &&
                  <React.Fragment>
                    <ListItem
                      button
                      onClick={() => this.setState({ settingsDialog: true })}
                    >
                      <ListItemIcon>
                        <SettingsIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Account and security"
                        primaryTypographyProps={{
                          noWrap: true,
                        }}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
              }
              <ListItem
                button
                onClick={() => this.setState({ announcementsDialog: true })}
              >
                <ListItemIcon className={classes.text}>
                  {
                    currentSession && currentSession.user.unreadAnnouncementsCount > 0 ?
                      <Badge badgeContent={currentSession.user.unreadAnnouncementsCount} color="primary">
                        <AnnouncementIcon />
                      </Badge> :
                      <AnnouncementIcon />
                  }
                </ListItemIcon>
                <ListItemText primary={`${process.env.SITE_NAME} news`} primaryTypographyProps={{ className: classes.text }} />
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
                process.env.TELEGRAM_CONTACT &&
                  <ListItem
                    button
                    component={(props) => <a href={`https://t.me/${process.env.TELEGRAM_CONTACT}`} target="_blank" {...props} />}
                  >
                    <ListItemIcon className={classes.text}>
                      <ContactSupportIcon />
                    </ListItemIcon>
                    <ListItemText primary="Contact us" primaryTypographyProps={{ className: classes.text }} />
                  </ListItem>
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
        <AnnouncementsDialog
          open={this.state.announcementsDialog}
          onClose={() => {
            this.setState({ announcementsDialog: false });
            if (this.props.onClose) {
              this.props.onClose();
            }
          }}
        />
        <MultipleMediaDialog
          open={this.state.uploadDialog}
          uploadEnabled
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

export default withRouter(withStyles(styles)(withCurrentSession(withWidth()(DrawerMenu))));
