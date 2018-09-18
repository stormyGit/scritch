import React from 'react';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withRouter } from 'react-router-dom'

import queryString from 'query-string';

import { GET_USER } from '../queries';

import CustomAppBar from './CustomAppBar';
import MediumCard from './MediumCard';
import SearchBar from './SearchBar';
import GlobalProgress from './GlobalProgress';
import EmptyList from './EmptyList';
import UserAvatar from './UserAvatar';
import ProfileAvatar from './ProfileAvatar';

const styles = theme => ({
  root: {
    width: '100%',
    padding: theme.spacing.unit * 1,
    paddingRight: 0
  },
  tabsContainer: {
    background: theme.palette.background.paper
  },
  userProfile: {
    width: '100%',
    position: 'relative',
    overflow: 'visible'
  },
  userAvatar: {
    position: 'absolute',
    bottom: -90,
    left: 16,
    zIndex: 1,
  },
  titleBar: {
    paddingLeft: 230,
  }
});

class User extends React.Component {
  state = {
    tab: 'videos'
  }

  componentDidMount() {
    if (this.props.match.params.tab) {
      this.setState({ tab: this.props.match.params.tab });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.tab !== nextProps.match.params.tab) {
      this.setState({ tab: nextProps.match.params.tab });
    }
  }

  handleRequestSearch(q) {
    this.props.history.push({
      pathname: '/videos',
      search: queryString.stringify({ q })
    });
  }

  handleTabChange(tab) {
    this.props.history.push({
      pathname: `/${this.props.match.params.id}/${tab}`,
    });
  }

  renderVideos({ data }) {
    if (data.user.publishedMedia.length === 0) {
      return (
        <EmptyList
          label={`${data.user.name} doesn't have any videos.`}
        />
      )
    }
    return (
      data.user.publishedMedia.map((medium) => (
        <Grid item item xs={12} lg={8} key={medium.id} style={{ marginLeft: 'auto', marginRight: 'auto'}}>
          <MediumCard medium={medium} horizontal />
        </Grid>
      ))
    );
  }

  renderUserProfile({ data }) {
    const { classes } = this.props;

    return (
      <GridList cellHeight={430} cols={1} spacing={0} className={classes.userProfile}>
        <Hidden mdDown>
          <ProfileAvatar user={data.user} className={classes.userAvatar} />
        </Hidden>
        <GridListTile cols={1}>
           <img src={data.user.banner || 'https://www.fillmurray.com/640/360'} />
           <GridListTileBar
             className={classes.titleBar}
             title={
               <Typography variant="headline">
                {data.user.name}
              </Typography>
             }
           />
         </GridListTile>
      </GridList>
    )
  }

  render() {
    const { classes, match } = this.props;

    return (
      <React.Fragment>
        <CustomAppBar>
          <SearchBar
            cancelOnEscape
            onRequestSearch={(q) => this.handleRequestSearch(q)}
          />
        </CustomAppBar>
        <Query query={GET_USER} variables={{ id: match.params.id }}>
          {({ data, loading, error }) => (
            <React.Fragment>
              {loading && <GlobalProgress />}
              {
                !loading &&
                  <React.Fragment>
                    {this.renderUserProfile({ data })}
                    <Paper className={classes.tabsContainer} elevation={0}>
                      <Grid containerspacing={8}>
                        <Grid item item xs={12} lg={8} style={{ marginLeft: 'auto', marginRight: 'auto'}}>
                          <Tabs
                            value={this.state.tab}
                            onChange={(e, value) => this.handleTabChange(value)}
                            scrollable
                            scrollButtons="on"
                            indicatorColor="secondary"
                            textColor="secondary"
                            fullWidth
                          >
                            <Tab value="videos" label={data.user.publishedMedia.length} icon="Videos" />
                            <Tab value="following" label="12" icon="Following "/>
                            <Tab value="followers" label="14" icon="Followers" />
                            <Tab value="likes" label="123" icon="Likes" />
                          </Tabs>
                        </Grid>
                      </Grid>
                    </Paper>
                    <Grid container className={classes.root} spacing={8}>
                      {this.state.tab === 'videos' && this.renderVideos({ data })}
                    </Grid>
                  </React.Fragment>
              }
            </React.Fragment>
          )}
        </Query>
      </React.Fragment>
    );
  }
}

const ConnectedUser = connect()(User);

export default withStyles(styles)(withRouter(ConnectedUser));
