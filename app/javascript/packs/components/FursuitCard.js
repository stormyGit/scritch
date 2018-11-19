import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import NoFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import dayjs from 'dayjs';
import queryString from 'query-string';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom';
import { keyToCdnUrl } from '../mediaService';
import timeAgo from '../timeAgo';
import UserAvatar from './UserAvatar';
import TruncatedText from './TruncatedText';
import UnderReview from './UnderReview';
import countFormat from '../countFormat';

import Background from '../photo.jpg'

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

const GET_ACTIVE_PREVIEW = gql`
  {
    activePreview @client
  }
`;

class FursuitCard extends React.Component {
  state = {
  }

  renderHeader() {
    const { classes, fursuit } = this.props;

    return (
      <CardHeader
        avatar={
          <Link to={`/${fursuit.user.slug}`} className={classes.userLink}>
            <UserAvatar user={fursuit.user} />
          </Link>
        }
        title={<Link to={`/${fursuit.user.slug}`} className={classes.userLink}>{fursuit.user.name}</Link>}
        subheader={fursuit.createdAt ? timeAgo.format(dayjs(fursuit.createdAt).toDate()) : "Under review"}
      />
    );
  }

  renderMedia() {
    const { classes, fursuit, horizontal, width, client } = this.props;

    return (
      <Query query={GET_ACTIVE_PREVIEW}>
        {({ data }) => (
          <div className={horizontal ? undefined : classes.cardMediaContainer}>
            <CardMedia
              className={horizontal ? classes.horizontalMedia : classes.verticalMedia}
              image={require('../photo.jpg')} //{fursuit.thumbnail}
              title={fursuit.name}
            >
            </CardMedia>
          </div>
        )}
      </Query>
    );
  }

  renderContent() {
    const { classes, fursuit, horizontal } = this.props;

    return (
      <CardContent className={classes.content}>
        <Typography gutterBottom variant="h5" component="h2" className={classes.text}  noWrap={!horizontal}>
          {fursuit.name}
        </Typography>
      </CardContent>
    );
  }

  renderTags() {
    const { classes, fursuit } = this.props;

    return (
      <CardContent className={classes.tags}>
        {
          fursuit.tagList.length === 0 ?
            <Chip label={"No tags"} variant={"outlined"} className={[classes.chip, classes.noTags].join(' ')} /> :
            fursuit.tagList.map((tag) => (
              <Chip
                clickable
                key={tag}
                label={tag}
                variant={"outlined"}
                className={classes.chip}
                component={(props) => <Link rel="nofollow" to={`/fursuits?${queryString.stringify({ q: tag })}`} {...props} />}
              />
            ))
        }
      </CardContent>
    );
  }

  renderActions() {
    const { classes, fursuit } = this.props;

    return (
      <CardActions>
        <Grid container spacing={8} justify="space-between" wrap="nowrap">
          <Grid item>
            <Grid container spacing={0} wrap="nowrap">
              <Grid item>
                <Button
                  disabled
                >
                  <CommentIcon className={classes.leftIcon} />
                  {fursuit.commentsCount}
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled
                >
                  <FavoriteIcon className={classes.leftIcon} />
                  {fursuit.likesCount}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Button
              disabled
            >
              {countFormat(fursuit.viewsCount, 'view', 'views')}
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    );
  }

  renderVertical() {
    const { classes, fursuit } = this.props;

    return (
      <Card className={classes.card} elevation={0}>
        {false && this.renderHeader()}
        <CardActionArea component={(props) => <Link to={`/fursuits/${fursuit.slug}-${fursuit.id}`} {...props} />}>
          {this.renderMedia()}
          {this.renderContent()}
        </CardActionArea>
        {false && this.renderTags()}
        {false && this.renderActions()}
      </Card>
    )
  }

  renderHorizontal() {
    const { classes, fursuit } = this.props;

    return (
      <Card className={[classes.card, classes.horizontalCard].join(' ')} elevation={0}>
        <CardActionArea component={(props) => <Link to={`/fursuits/${fursuit.slug}-${fursuit.id}`} {...props} />} className={classes.horizontalMediaContainer}>
          {this.renderMedia()}
        </CardActionArea>
        <div className={classes.horizontalContent}>
          {this.renderHeader()}
          <CardActionArea component={(props) => <Link to={`/fursuits/${fursuit.slug}-${fursuit.id}`} {...props} />} className={classes.horizontalInfos}>
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

FursuitCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  withWidth()(
    withApollo(FursuitCard)
  )
);
