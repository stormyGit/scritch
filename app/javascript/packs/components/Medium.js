import React from 'react';
import { Query } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from 'react-router-dom';
import timeAgo from '../timeAgo';
import UserAvatar from './UserAvatar';
import PageTitle from './PageTitle';
import dayjs from 'dayjs';

import { GET_MEDIUM } from '../queries';

import RelatedMediumCard from './RelatedMediumCard';
import CardVideo from './CardVideo';
import CommentForm from './CommentForm';
import FormattedText from './FormattedText';
import LikeButton from './LikeButton';
import EditMediumDialog from './EditMediumDialog';
import Comments from './Comments';
import withCurrentSession from './withCurrentSession';
import SocialButton from './SocialButton';
import TwitterIcon from '../icons/Twitter';
import TelegramIcon from '../icons/Telegram';
import countFormat from '../countFormat';

const styles = theme => ({
  container: {
    margin: theme.spacing.unit * 1,
    display: 'flex'
  },
  card: {
    width: '100%',
    borderRadius: 0,
    backgroundColor: theme.palette.background,
  },
  videoInfo: {
    paddingBottom: theme.spacing.unit,
  },
  userInfo: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  text: {
  },
  mediumTitle: {
    maxWidth: "50vw",
    marginBottom: 0
  },
  relatedMedia: {
    marginBottom: theme.spacing.unit
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  socialButton: {
    color: theme.palette.text.primary,
    padding: theme.spacing.unit,
    minWidth: 36,
  }
});

class Medium extends React.Component {
  state = {
    editMedium: false
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

  render() {
    const { classes, match, currentSession } = this.props;

    return (
      <Query query={GET_MEDIUM} variables={{ id: match.params.id }}>
        {({ loading, error, data: { medium } }) => {
          return (
            !loading && medium &&
              <div className={classes.container}>
                <PageTitle>{!loading && medium ? medium.title : null}</PageTitle>
                <Card className={classes.card} elevation={0}>
                  <CardVideo medium={medium} />
                  <Grid container spacing={8}>
                    <Grid item lg={8} xs={12}>
                      <CardContent>
                        <div className={classes.videoInfo}>
                          <Grid container spacing={8} justify="space-between">
                            <Grid item>
                              <Typography gutterBottom variant="headline" component="h2" className={classes.mediumTitle} noWrap>
                                {medium.title}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <SocialButton
                                name="Twitter"
                                url="https://twitter.com/intent/tweet/"
                                params={{
                                  text: medium.title,
                                  url: window.location.href
                                }}
                                className={classes.socialButton}
                              >
                                <TwitterIcon fontSize={'inherit'} />
                              </SocialButton>
                              <SocialButton
                                name="Telegram"
                                className={classes.socialButton}
                                url="https://telegram.me/share/url"
                                params={{
                                  text: medium.title,
                                  url: window.location.href
                                }}
                              >
                                <TelegramIcon fontSize={'inherit'} />
                              </SocialButton>
                              <LikeButton medium={medium} />
                            </Grid>
                          </Grid>
                          <Grid container spacing={8} justify="space-between">
                            <Grid item>
                              <Typography gutterBottom variant="subheading" noWrap>
                                {countFormat(medium.viewsCount, 'view', 'views')}
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
                        <Divider />
                        <Grid container spacing={0} justify="space-between" alignItems="center">
                          <Grid item>
                            <CardHeader
                              className={classes.userInfo}
                              avatar={
                                <Link to={`/${medium.user.slug}`} className={classes.userLink}>
                                  <UserAvatar user={medium.user} />
                                </Link>
                              }
                              title={<Link to={`/${medium.user.slug}`} className={classes.userLink}>{medium.user.name}</Link>}
                              subheader={timeAgo.format(dayjs(medium.createdAt).toDate())}
                            />
                          </Grid>
                          {
                            currentSession && medium.user.id === currentSession.user.id &&
                              <Grid item>
                                <Button
                                  onClick={() => this.setState({ editMedium: true })}
                                  variant="outlined"
                                >
                                  Edit video
                                </Button>
                              </Grid>
                          }
                        </Grid>
                        <Typography component="p" className={classes.text}>
                          {medium.description || 'No description'}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        {
                          medium.commentsDisabled ?
                            <Typography gutterBottom variant="caption">
                              {"Comments are disabled for this video."}
                            </Typography> :
                            <React.Fragment>
                              <Typography gutterBottom variant="title" component="h3">
                                {countFormat(medium.commentsCount, 'comment', 'comments')}
                              </Typography>
                              {
                                currentSession ?
                                  <CommentForm mediumId={medium.id} parentId={null} /> :
                                  <Typography gutterBottom variant="caption">
                                    {"You must be connected to write a comment."}
                                  </Typography>
                              }
                              <Comments medium={medium} parent={null} />
                            </React.Fragment>
                        }
                      </CardContent>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                      <CardContent>
                        <Typography gutterBottom variant="title" component="h3">
                          Watch more
                        </Typography>
                        {
                          medium.relatedMedia.map((medium) => (
                            <div className={classes.relatedMedia} key={medium.id}>
                              <RelatedMediumCard medium={medium} horizontal/>
                            </div>
                          ))
                        }
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
                <EditMediumDialog
                  open={this.state.editMedium}
                  onClose={() => this.setState({ editMedium: false })}
                  medium={medium}
                />
              </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(withCurrentSession(Medium));
