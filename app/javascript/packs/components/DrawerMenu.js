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

import TermsDialog from './TermsDialog';
import PrivacyPolicyDialog from './PrivacyPolicyDialog';

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
  })
};

class DrawerMenu extends React.Component {
  state = {
    privacyPolicyDialog: false,
    termsDialog: false,
  }
  render() {
    const { classes, location, currentSession } = this.props;

    return (
      <React.Fragment>
        <div className={classes.drawerSpacer}>
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

export default withRouter(withStyles(styles)(withCurrentSession(DrawerMenu)));
