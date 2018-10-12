import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import VisibilitySensor from 'react-visibility-sensor';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import TruncatedText from './TruncatedText';
import countFormat from '../countFormat';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  videoCount: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    paddingRight: theme.spacing.unit * 3
  }
});

class MediumCard extends React.Component {
  renderHeader() {
    const { classes, user } = this.props;

    return (
      <CardHeader
        avatar={
          <UserAvatar user={user} />
        }
        title={user.name}
        subheader={user.bio}
      />
    );
  }

  render() {
    const { classes, user } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        <CardActionArea component={(props) => <Link to={`/${user.slug}`} {...props} />}>
          <Grid container spacing={0} justify="space-between" wrap='nowrap'>
            <Grid item>
              {this.renderHeader()}
            </Grid>
            <Grid item className={classes.videoCount}>
              <Typography variant="button">
                {countFormat(user.mediaCount, 'video', 'videos')}
              </Typography>
            </Grid>
          </Grid>
        </CardActionArea>
      </Card>
    )
  }
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  withWidth()(MediumCard)
);
