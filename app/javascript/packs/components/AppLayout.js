import React from 'react';
import queryString from 'query-string';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import withWidth from '@material-ui/core/withWidth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatButtleIcon  from '@material-ui/icons/ChatBubble';
import ChatButtleEmptyIcon  from '@material-ui/icons/ChatBubbleOutline';
import CloseIcon from '@material-ui/icons/Close';
import BackIcon from '@material-ui/icons/ArrowBack';

import { Link, withRouter } from 'react-router-dom'
import TelegramLoginButton from 'react-telegram-login';
import SignUpDialog from './SignUpDialog';
import MultipleMediaDialog from './MultipleMediaDialog';
import PermanentDrawer from './PermanentDrawer';
import TemporaryDrawer from './TemporaryDrawer';
import AppBottomNavigation from './AppBottomNavigation';
import withCurrentSession from './withCurrentSession';
import SearchBar from './SearchBar';
import GlobalProgress from './GlobalProgress';
import ActivitiesDialog from './ActivitiesDialog';
import ChatDialog from './ChatDialog';
import SettingsDialog from './SettingsDialog';

import UserAvatar from './UserAvatar';
import Logo from './Logo';

import { GET_SESSION, GET_UNREAD_ACTIVITY_COUNT, GET_UNREAD_CHATS_COUNT } from '../queries';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: 'calc(100vh - 56px)'
  },
  content: {
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    overflow: 'hidden'
  },
  toolbar: {
    ...theme.mixins.toolbar,
    minHeight: "56px !important",
    "@media (min-width:0px) and (orientation: landscape)": {
      minHeight: 56
    }
  },
  toolBarRoot: {
    minHeight: "56px !important",
  },
  rootLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  titleZone: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center'
  },
  searchBar: {
    flex: 1,
  },
  separator: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 3,
    height: 32,
    borderLeftColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    [theme.breakpoints.down('md')]: {
      borderLeftWidth: 0,
      marginLeft: 0,
      marginRight: theme.spacing.unit * 2,
    },
  },
  pageTitle: {
    marginTop: 5,
    marginBottom: 5,
    lineHeight: '36px',
    flexShrink: 0,
    maxWidth: "calc(100vw - 256px)"
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  rightButton: {
    marginLeft: theme.spacing.unit * 2,
    display: 'inline-block'
  },
  rightActions: {
    flexShrink: 0,
  },
  closeIcon: {
  },
  searchIcon: {
  },
  tinyButton: {
  }
});

const GET_PAGE_TITLE = gql`
  {
    pageTitle @client
  }
`;

class AppLayout extends React.Component {
  state = {
    uploadDialog: false,
    signUpDialog: false,
    drawer: false,
    searchEnabled: false,
    activitiesDialog: false,
    chatDialog: false,
    settingsDialog: false,
    query: {},
  }

  componentDidMount() {

    this.handleQuery(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.search !== nextProps.location.search) {
      this.handleQuery(nextProps)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      document.activeElement.blur();
    }
  }

  handleQuery(props) {
    const query = queryString.parse(props.location.search);
    this.setState({ query, searchEnabled: (props.width !== 'xl' && props.width !== 'lg' && query.q && query.q.length > 0) })
  }

  handleRequestSearch(q) {
    this.props.history.push({
      pathname: '/pictures',
      search: queryString.stringify({ q })
    });
  }

  render() {
    const { classes, settingsLayout, children, currentSession, location, client, width } = this.props;
    const { query } = this.state;

    let appBarPadding;
    if (width === 'xl' || width === 'lg') {
      appBarPadding = 16;
    } else {
      appBarPadding = 8;
    }

    return (
      <React.Fragment>
        <GlobalProgress />
        <div className={classes.root}>
          <Hidden mdDown>
            <PermanentDrawer />
          </Hidden>
          <Hidden lgUp>
            <TemporaryDrawer
              open={this.state.drawer}
              onOpen={() => this.setState({ drawer: true })}
              onClose={() => this.setState({ drawer: false })}
            />
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <AppBar
              position="absolute"
              className={classes.appBar}
              elevation={1}
            >
              <Toolbar
                className={classes.toolBar}
                classes={{
                  root: classes.toolBarRoot
                }}
                style={{
                  paddingLeft: appBarPadding,
                  paddingRight: appBarPadding
                }}
              >
                <div className={classes.titleZone}>
                  <Hidden mdDown>
                    <Link to='/' className={classes.rootLink}>
                      <Logo />
                    </Link>
                  </Hidden>
                  {
                    !this.state.searchEnabled &&
                      <Hidden lgUp>
                        <IconButton
                          onClick={() => this.setState({ drawer: true })}
                        >
                          <MenuIcon />
                        </IconButton>
                      </Hidden>
                  }
                  {
                    this.state.searchEnabled && !query.q &&
                      <IconButton
                        className={classes.closeIcon}
                        onClick={() => {
                          this.setState({ searchEnabled: false });
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                  }
                  {
                    this.state.searchEnabled && query.q &&
                      <IconButton
                        className={classes.closeIcon}
                        onClick={() => {
                          this.props.history.goBack();
                        }}
                      >
                        <BackIcon />
                      </IconButton>
                  }
                  {
                    (!this.state.searchEnabled || width === 'lg' || width === 'xl') &&
                      <Query query={GET_PAGE_TITLE}>
                        {({ data }) => (
                          data.pageTitle &&
                            <React.Fragment>
                              <div className={classes.separator} />
                              <Typography variant="h5" className={classes.pageTitle} component="div" noWrap>
                                {data.pageTitle}
                              </Typography>
                            </React.Fragment>
                        )}
                      </Query>
                  }
                  {
                    (this.state.searchEnabled || width === 'lg' || width === 'xl') &&
                      <div
                        className={classes.searchBar}
                        style={{
                          paddingLeft: appBarPadding,
                          maxWidth: (width === 'lg' || width === 'xl') ? 600 : 'none',
                          marginRight: (width === 'lg' || width === 'xl') ? 16 : 0,
                        }}
                      >
                        <SearchBar
                          autoFocus={width !== 'lg' && width !== 'xl' && !query.q}
                          cancelOnEscape
                          value={query.q}
                          onRequestSearch={(q) => {
                            if (typeof(q) === 'string') {
                              this.handleRequestSearch(q)
                            }
                          }}
                        />
                      </div>
                  }
                </div>
                <div className={classes.rightActions}>
                  <Hidden mdDown>
                    {
                      currentSession &&
                        <Button
                          onClick={() => this.setState({ uploadDialog: true })}
                          variant="contained"
                          size="large"
                          color="primary"
                        >
                          Upload
                        </Button>
                    }
                    {
                      currentSession &&
                        <div className={classes.rightButton}>
                          <Query query={GET_UNREAD_ACTIVITY_COUNT} pollInterval={parseInt(process.env.UNREAD_ACTIVITY_COUNT_REFRESH_INTERVAL)}>
                            {({ loading, error, data }) => (
                              <IconButton
                                onClick={() => this.setState({ activitiesDialog: true })}
                              >
                                {loading || !data || data.unreadActivityCount <= 0 ? <NotificationsNoneIcon /> : <NotificationsIcon />}
                              </IconButton>
                            )}
                          </Query>
                        </div>
                    }
                    {
                      currentSession &&
                        <React.Fragment>
                          <ButtonBase
                            focusRipple
                            className={classes.rightButton}
                            onClick={(event) => this.setState({ userMenuAnchor: event.currentTarget })}
                          >
                            <UserAvatar user={currentSession.user} />
                          </ButtonBase>
                          <Menu
                            id={`user-menu`}
                            anchorEl={this.state.userMenuAnchor}
                            open={Boolean(this.state.userMenuAnchor)}
                            onClose={() => this.setState({ userMenuAnchor: null })}
                          >
                            <MenuItem
                              component={(props) => <Link to={`/${currentSession.user.slug}`} {...props} />}
                              onClick={() => {
                                this.setState({ userMenuAnchor: null })
                              }}
                            >
                              Profile
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                this.setState({ userMenuAnchor: null, settingsDialog: true })
                              }}
                            >
                              Settings and security
                            </MenuItem>
                          </Menu>
                        </React.Fragment>
                    }
                    {
                      !currentSession &&
                        <Button
                          onClick={() => this.setState({ signUpDialog: true })}
                          variant="outlined"
                          size="large"
                        >
                          Login with Telegram
                        </Button>
                    }
                  </Hidden>
                  <Hidden lgUp>
                    {
                      currentSession && !this.state.searchEnabled &&
                        <React.Fragment>
                          <Query query={GET_UNREAD_ACTIVITY_COUNT} pollInterval={parseInt(process.env.UNREAD_ACTIVITY_COUNT_REFRESH_INTERVAL)}>
                            {({ loading, error, data }) => (
                              <IconButton
                                className={classes.tinyButton}
                                onClick={() => this.setState({ activitiesDialog: true })}
                              >
                                {loading || !data || data.unreadActivityCount <= 0 ? <NotificationsNoneIcon /> : <NotificationsIcon />}
                              </IconButton>
                            )}
                          </Query>
                        </React.Fragment>
                    }
                    {
                      !this.state.searchEnabled &&
                        <IconButton
                          className={[classes.searchIcon, classes.tinyButton].join(' ')}
                          onClick={() => this.setState({ searchEnabled: true })}
                        >
                          <SearchIcon />
                        </IconButton>
                    }
                  </Hidden>
                </div>
              </Toolbar>
            </AppBar>
            <SignUpDialog open={this.state.signUpDialog} onClose={() => this.setState({ signUpDialog: false })} />
            <ChatDialog open={this.state.chatDialog} onClose={() => this.setState({ chatDialog: false })} />
            <MultipleMediaDialog
              open={this.state.uploadDialog}
              onClose={() => this.setState({ uploadDialog: false })}
              uploadEnabled
            />
            <SettingsDialog
              open={this.state.settingsDialog}
              onClose={() => this.setState({ settingsDialog: false })}
            />
            {currentSession && <ActivitiesDialog open={this.state.activitiesDialog} onClose={() => this.setState({ activitiesDialog: false })} />}
            <div id="scoll-parent">
              {this.props.children}
            </div>
          </main>
        </div>
        <Hidden lgUp>
          <AppBottomNavigation />
        </Hidden>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(
  withRouter(
    withCurrentSession(
      withWidth()(
        AppLayout
      )
    )
  )
);
