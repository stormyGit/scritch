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
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CommentIcon from '@material-ui/icons/Comment';
import dayjs from 'dayjs';
import queryString from 'query-string';

import VisibilitySensor from 'react-visibility-sensor';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom';
import { keyToCdnUrl } from '../mediaService';
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
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  horizontalMediaContainer: {
    maxWidth: '46%',
    minWidth: '46%',
    minHeight: '100%',
  },
  horizontalMedia: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0
  },
  horizontalInfos: {
    flex: 1,
  },
  cardMediaContainer: {
    position: 'relative',
    paddingTop: '56%',
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
  tags: {
    overflow: "hidden",
    maxHeight: theme.spacing.unit * 6,
    marginBottom: theme.spacing.unit * 2,
  },
  noTags: {
    fontStyle: 'italic',
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
});

class MediumCard extends React.Component {
  state = {
    thumbnailKey: this.props.medium.thumbnailKey,
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
        subheader={timeAgo.format(dayjs(medium.createdAt).toDate())}
      />
    );
  }

  renderMedia() {
    const { classes, medium, horizontal, width } = this.props;

    let previewImage = new Image();
    const handleOnMouseEnter = () => {
      previewImage.onload = () => {
        this.setState({ thumbnailKey: medium.previewKey });
      };
      previewImage.src = keyToCdnUrl(medium.previewKey);
    }
    const handleOnMouseLeave = () => {

      previewImage.onload = () => {
        this.setState({ thumbnailKey: medium.thumbnailKey });
      };
      previewImage.src = keyToCdnUrl(medium.thumbnailKey);
    }

    return (
      <div className={horizontal ? undefined : classes.cardMediaContainer}>
        <VisibilitySensor
          active={width !== 'lg' && width !== 'xl'}
          minTopValue={100}
          onChange={(isVisible) => {
            if (width === 'lg' || width === 'xl') {
              return;
            }
            if (isVisible && this.state.thumbnailKey !== medium.previewKey) {
              handleOnMouseEnter();
            }
            if (!isVisible && this.state.thumbnailKey !== medium.thumbnailKey) {
              handleOnMouseLeave();
            }
          }}
        >
          <CardMedia
            className={horizontal ? classes.horizontalMedia : classes.verticalMedia}
            image={keyToCdnUrl(this.state.thumbnailKey)}
            title={medium.title}
            onMouseEnter={() => {
              if (this.state.thumbnailKey !== medium.previewKey && width === 'lg' || width === 'xl') {
                handleOnMouseEnter();
              }
            }}
            onMouseLeave={() => {
              if (this.state.thumbnailKey !== medium.thumbnailKey && width === 'lg' || width === 'xl') {
                handleOnMouseLeave();
              }
            }}
          >
            <Duration duration={medium.duration} />
          </CardMedia>
        </VisibilitySensor>
      </div>
    );
  }

  renderContent() {
    const { classes, medium, horizontal } = this.props;

    return (
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.text}  noWrap={!horizontal}>
          {medium.title}
        </Typography>
        <Typography component="p" className={classes.text} noWrap={!horizontal}>
          <TruncatedText limit={100}>{medium.description || `No description`}</TruncatedText>
        </Typography>
      </CardContent>
    );
  }

  renderTags() {
    const { classes, medium } = this.props;

    return (
      <CardContent className={classes.tags}>
        {
          medium.tagList.length === 0 ?
            <Chip label={"No tags"} variant={"outlined"} className={[classes.chip, classes.noTags].join(' ')} /> :
            medium.tagList.map((tag) => (
              <Chip
                clickable
                key={tag}
                label={tag}
                variant={"outlined"}
                className={classes.chip}
                component={(props) => <Link to={`/videos?${queryString.stringify({ q: tag })}`} {...props} />}
              />
            ))
        }
      </CardContent>
    );
  }

  renderActions() {
    const { classes, medium } = this.props;

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
                  {countFormat(medium.commentsCount, 'comment', 'comments')}
                </Button>
              </Grid>
              <Grid item>
                <LikeButton
                  disabled
                  medium={medium}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              disabled
            >
              {countFormat(medium.viewsCount, 'view', 'views')}
            </Button>
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
        {this.renderTags()}
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
          {this.renderTags()}
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

export default withStyles(styles)(
  withWidth()(MediumCard)
);
