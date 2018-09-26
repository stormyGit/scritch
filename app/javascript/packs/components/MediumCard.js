import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom';
import { keyToUrl } from '../mediaService';
import timeAgo from '../timeAgo';
import Duration from './Duration';
import UserAvatar from './UserAvatar';
import LikeButton from './LikeButton';

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
  }
});

class MediumCard extends React.Component {
  state = {
    thumbnailKey: this.props.medium.thumbnailKey
  }

  renderHeader() {
    const { classes, medium } = this.props;

    return (
      <CardHeader
        avatar={
          <Link to={`/${medium.user.slug}`} className={classes.userLink}>
            <UserAvatar user={medium.user} />
          </Link>
        }
        title={<Link to={`/${medium.user.slug}`} className={classes.userLink}>{medium.user.name}</Link>}
        subheader={timeAgo.format(new Date(medium.createdAt))}
      />
    );
  }

  renderMedia() {
    const { classes, medium, horizontal } = this.props;
    return (
      <CardMedia
        className={horizontal ? classes.horizontalMedia : classes.verticalMedia}
        image={keyToUrl(this.state.thumbnailKey)}
        title={medium.title}
        onMouseEnter={() => this.setState({ thumbnailKey: medium.previewKey })}
        onMouseLeave={() => this.setState({ thumbnailKey: medium.thumbnailKey })}
      >
        <Duration duration={medium.duration} />
      </CardMedia>
    );
  }

  renderContent() {
    const { classes, medium, horizontal } = this.props;

    return (
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="headline" component="h2" className={classes.text}  noWrap={!horizontal}>
          {medium.title}
        </Typography>
        <Typography component="p" className={classes.text} noWrap={!horizontal}>
          {medium.description || `No description`}
        </Typography>
      </CardContent>
    );
  }

  renderCommentsCount(count) {
    if (count === 0) {
      return (`No comments`);
    }
    if (count === 1) {
      return (`One comment`);
    }
    return (`${count} comments`);
  }

  renderActions() {
    const { classes, medium } = this.props;

    return (
      <CardActions>
        <Grid container spacing={8}>
          <Grid item>
            <Button
              disabled
              size="small"
              color="secondary"
            >
              <CommentIcon className={classes.leftIcon} />
              {this.renderCommentsCount(medium.commentsCount)}
            </Button>
          </Grid>
          <Grid item>
            <LikeButton
              disabled
              medium={medium}
            />
          </Grid>
        </Grid>
      </CardActions>
    );
  }

  renderVertical() {
    const { classes, medium } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        {this.renderHeader()}
        <CardActionArea component={(props) => <Link to={`/videos/${medium.id}`} {...props} />}>
          {this.renderMedia()}
          {this.renderContent()}
        </CardActionArea>
        {this.renderActions()}
      </Card>
    )
  }

  renderHorizontal() {
    const { classes, medium } = this.props;

    return (
      <Card className={[classes.card, classes.horizontalCard].join(' ')} elevation={0}>
        <CardActionArea component={(props) => <Link to={`/videos/${medium.id}`} {...props} />} className={classes.horizontalMediaContainer}>
          {this.renderMedia()}
        </CardActionArea>
        <div className={classes.horizontalContent}>
          {this.renderHeader()}
          <CardActionArea component={(props) => <Link to={`/videos/${medium.id}`} {...props} />} className={classes.horizontalInfos}>
            {this.renderContent()}
          </CardActionArea>
          {this.renderActions()}
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

export default withStyles(styles)(MediumCard);
