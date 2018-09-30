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
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';

import { Link, withRouter } from 'react-router-dom'
import TelegramLoginButton from 'react-telegram-login';
import SignUpDialog from './SignUpDialog';
import UploadDialog from './UploadDialog';
import PermanentDrawer from './PermanentDrawer';
import TemporaryDrawer from './TemporaryDrawer';
import AppBottomNavigation from './AppBottomNavigation';
import withCurrentSession from './withCurrentSession';
import SearchBar from './SearchBar';
import GlobalProgress from './GlobalProgress';

import UserAvatar from './UserAvatar';
import Logo from './Logo';

import { TOGGLE_SIGNUP_DIALOG, GET_SESSION } from '../queries';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: '100vh'
  },
  content: {
    flexGrow: 1,
    minWidth: 0, // So the Typography noWrap works
    overflow: 'hidden'
  },
  toolbar: theme.mixins.toolbar,
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
  },
  searchBar: {
    flex: 1,
  },
  separator: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
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
    transition: "max-width 0.5s ease",
  },
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  avatar: {
    marginLeft: theme.spacing.unit * 2
  },
  rightActions: {
    flexShrink: 0,
  },
  closeIcon: {
  },
  searchIcon: {
  },
  toolbar: theme.mixins.toolbar,
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
    searchEnabled: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  handleRequestSearch(q) {
    this.props.history.push({
      pathname: '/videos',
      search: queryString.stringify({ q })
    });
  }

  handleCancelSearchRequest() {
    this.props.history.push({
      pathname: '/videos',
    });
    this.setState({ searchEnabled: false });
  }

  render() {
    const { classes, settingsLayout, children, currentSession, location, client, width } = this.props;
    const query = queryString.parse(location.search);

    let appBarPadding;
    if (width === 'xl' || width === 'lg') {
      appBarPadding = 16;
    } else {
      appBarPadding = 4;
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
                    this.state.searchEnabled &&
                      <IconButton
                        className={classes.closeIcon}
                        onClick={() => this.setState({ searchEnabled: false })}
                      >
                        <CloseIcon />
                      </IconButton>
                  }
                  {
                    (!this.state.searchEnabled || width === 'lg' || width === 'xl') &&
                      <Query query={GET_PAGE_TITLE}>
                        {({ data }) => (
                          data.pageTitle &&
                            <React.Fragment>
                              <div className={classes.separator} />
                              <Typography variant="headline" className={classes.pageTitle} component="div">
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
                        }}
                      >
                        <SearchBar
                          autoFocus={width !== 'lg' && width !== 'xl'}
                          cancelOnEscape
                          value={query.q}
                          onRequestSearch={(q) => {
                            if (typeof(q) === 'string') {
                              this.handleRequestSearch(q)
                            }
                          }}
                          onCancelSearch={() => {
                            this.handleCancelSearchRequest();
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
                        <ButtonBase
                          component={(props) => <Link to={`/${currentSession.user.slug}`} {...props} />}
                          focusRipple
                          className={classes.avatar}
                        >
                          <UserAvatar user={currentSession.user} />
                        </ButtonBase>
                    }
                    {
                      !currentSession &&
                        <Button
                          onClick={() => this.setState({ signUpDialog: true })}
                          variant="contained"
                          size="large"
                        >
                          Login with Telegram
                        </Button>
                    }
                  </Hidden>
                  <Hidden lgUp>
                    {
                      !this.state.searchEnabled &&
                        <IconButton
                          className={classes.searchIcon}
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
            <UploadDialog open={this.state.uploadDialog} onClose={() => this.setState({ uploadDialog: false })} />
            {this.props.children}
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
