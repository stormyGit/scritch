import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, Mutation, withApollo } from 'react-apollo';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ResponsiveDialog from './ResponsiveDialog';
import GlobalProgress from './GlobalProgress';
import UserAvatar from './UserAvatar';
import EmptyList from './EmptyList';

import { GET_ACTIVITIES } from '../queries';

const styles = theme => ({
  emptyNoficationContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: theme.spacing.unit * 8
  },
  emptyNoficationIcon: {
    fontSize: 2,
    display: 'block',
    fontSize: '4em',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing.unit,
    color: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)',
  }
});

class ActivitiesDialog extends React.Component {
  state = {
    accountSuppressionAlertOpen: false,
  }

  renderLikeCreate(activity) {

    return (
      <ListItem
        key={activity.id}
        button
        onClick={() => {
          this.props.history.push({
            pathname: `/${activity.owner.slug}`
          });
          this.props.onClose();
        }}
      >
        <UserAvatar user={activity.owner} />
        <ListItemText primary={`${activity.owner.name} liked your video.`} />
      </ListItem>
    );
  }

  renderActivity(activity) {
    switch (activity.key) {
      case 'like.create':
        return (this.renderLikeCreate(activity));
        break;
      default:
        return (null);
    }
  }

  render() {
    const { classes, match, width } = this.props;

    return (
      <ResponsiveDialog
        open={this.props.open}
        onClose={this.props.onClose}
      >
        <GlobalProgress absolute />
          <Query query={GET_ACTIVITIES} variables={{ q: 'like.create' }}>
            {({ loading, error, data }) => {
              if (loading || !data.activities) {
                return (null);
              }

              if (data.activities.length === 0) {
                return (
                  <DialogContent className={classes.emptyNoficationContainer}>
                    <NotificationsNoneIcon className={classes.emptyNoficationIcon} />
                    <EmptyList
                      label={`No recent activity`}
                    />
                  </DialogContent>
                )
              }

              return (
                <List>
                  {
                    data.activities.map((activity) => (
                      this.renderActivity(activity)
                    ))
                  }
                </List>
              );
            }}
          </Query>
        <DialogActions>
          <Grid container spacing={0} justify="space-between">
            <Grid item>
              {
                false &&
                  <Button>
                    Clear all notifications
                  </Button>
              }
            </Grid>
            <Grid item>
              <Button onClick={this.props.onClose}>
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </ResponsiveDialog>
    );
  }
}

export default withStyles(styles)(
  withApollo(
    withRouter(ActivitiesDialog)
  )
);
