import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import dayjs from 'dayjs';

import VisibilitySensor from 'react-visibility-sensor';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom';
import { keyToUrl } from '../mediaService';
import timeAgo from '../timeAgo';
import Duration from './Duration';
import UserAvatar from './UserAvatar';
import LikeButton from './LikeButton';
import TruncatedText from './TruncatedText';
import countFormat from '../countFormat';

const styles = theme => ({
  card: {
    width: '100%',
    borderRadius: 0,
  },
  horizontalCard: {
    display: 'flex',
  },
  horizontalContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  verticalMedia: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  horizontalMediaContainer: {
    maxWidth: '46%',
    minWidth: '46%',
    height: 340,
  },
  horizontalMedia: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  horizontalInfos: {
    flex: 1,
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  content: {
  },
});

class MediumCard extends React.Component {
  renderHeader() {
    const { classes, user } = this.props;

    return (
      <CardHeader
        avatar={
          <Link to={`/${user.slug}`} className={classes.userLink}>
            <UserAvatar user={user} />
          </Link>
        }
        title={<Link to={`/${user.slug}`} className={classes.userLink}>{user.name}</Link>}
        subheader={user.bio}
      />
    );
  }

  renderContent() {
    const { classes, user, horizontal } = this.props;

    return (
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="headline" component="h2" className={classes.text}  noWrap={!horizontal}>
          {user.name}
        </Typography>
        <Typography component="p" className={classes.text} noWrap={!horizontal}>
          <TruncatedText limit={100}>{user.bio || `No bio`}</TruncatedText>
        </Typography>
      </CardContent>
    );
  }

  renderActions() {
    const { classes, user } = this.props;

    return (
      <CardActions>
        <Grid container spacing={8} justify="space-between">
          <Grid item>
            <Grid container spacing={0}>
              <Grid item>
                <Button
                  disabled
                >
                  <CommentIcon className={classes.leftIcon} />
                  {countFormat(user.commentsCount, 'comment', 'comments')}
                </Button>
              </Grid>
              <Grid item>
                <LikeButton
                  disabled
                  user={user}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              disabled
            >
              {countFormat(user.viewsCount, 'view', 'views')}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    );
  }

  renderVertical() {
    const { classes, user } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        {this.renderHeader()}
        <CardActionArea component={(props) => <Link to={`/${user.slug}`} {...props} />}>
        </CardActionArea>
      </Card>
    )
  }

  renderHorizontal() {
    const { classes, user } = this.props;

    return (
      <Card className={[classes.card, classes.horizontalCard].join(' ')} elevation={0}>
        <CardActionArea component={(props) => <Link to={`/${user.slug}`} {...props} />} className={classes.horizontalMediaContainer}>
        </CardActionArea>
        <div className={classes.horizontalContent}>
          {this.renderHeader()}
          <CardActionArea component={(props) => <Link to={`/${user.slug}`} {...props} />} className={classes.horizontalInfos}>
          </CardActionArea>
        </div>
      </Card>
    )
  }

  render() {
    const { horizontal } = this.props;

    if (horizontal) {
      return this.renderHorizontal();
    }
    return this.renderVertical();
  }
}

MediumCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  withWidth()(MediumCard)
);
