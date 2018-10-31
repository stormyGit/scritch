import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import withWidth from '@material-ui/core/withWidth';
import dayjs from 'dayjs';

import { withStyles } from '@material-ui/core/styles';
import { Link} from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Mutation } from 'react-apollo';

import FormattedText from './FormattedText';
import UserAvatar from './UserAvatar';
import Comments from './Comments';
import CommentForm from './CommentForm';
import withCurrentSession from './withCurrentSession';
import countFormat from '../countFormat';

import { DELETE_COMMENT, GET_MEDIUM, GET_COMMENTS_BY_MEDIUM } from '../queries';

import timeAgo from '../timeAgo';

const styles = theme => ({
  comment: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  commentHeader: {
    padding: 0,
    alignItems: 'flex-start',
    position: 'relative'
  },
  userLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none'
  },
  repliesPanel: {
    marginTop: theme.spacing.unit,
    // marginLeft: theme.spacing.unit * 7,
    // paddingLeft: 34,
    backgroundColor: theme.palette.type === 'dark' ? '#333' : '#eee',
  },
  repliesPanelDetails: {
    display: 'block',
  },
  repliesCount: {
  },
  repliesAction: {
    right: 0,
  },
  menuButton: {
    // position: 'absolute',
    // top: 0,
    // right: -theme.spacing.unit * 8,
  }
})

class Comment extends React.Component {
  state = {
    menuAnchor: null,
    showMenuButton: false,
    replyExpanded: false,
  };

  render() {
    const { comment, currentSession, classes, medium, disableReply, width } = this.props;
    const repliesCount = comment.repliesCount;

    let canDelete = false;
    if (currentSession && currentSession.user.id === comment.user.id) {
      canDelete = true;
    }
    if (currentSession && currentSession.user.id === medium.user.id) {
      canDelete = true;
    }

    return (
      <div className={classes.comment}>
        <CardHeader
          className={classes.commentHeader}
          avatar={
            <Link to={`/${comment.user.slug}`} className={classes.userLink}>
              <UserAvatar user={comment.user} />
            </Link>
          }
          onMouseEnter={() => {
            this.setState({ showMenuButton: true });
          }}
          onMouseLeave={() => {
            this.setState({ showMenuButton: false });
          }}
          action={
            <div>
              {
                <IconButton
                  aria-owns={this.state.menuAnchor ? `menu-${comment.id}` : null}
                  aria-haspopup="true"
                  className={classes.menuButton}
                  onClick={(event) => this.setState({ menuAnchor: event.currentTarget })}
                  style={{
                    visibility: ((canDelete) && (this.state.showMenuButton || (width !== 'xl' && width !== 'lg')) ? 'visible' : 'hidden')
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              <Menu
                id={`menu-${comment.id}`}
                anchorEl={this.state.menuAnchor}
                open={Boolean(this.state.menuAnchor)}
                onClose={() => this.setState({ menuAnchor: null })}
              >
                {
                  canDelete &&
                    <Mutation
                      mutation={DELETE_COMMENT}
                      update={(cache) => {
                        const { commentsByMedium } = cache.readQuery({ query: GET_COMMENTS_BY_MEDIUM, variables: { parentId: comment.parentId || null, mediumId: medium.id }});
                        cache.writeQuery({
                          query: GET_COMMENTS_BY_MEDIUM,
                          variables: { parentId: comment.parentId || null, mediumId: medium.id },
                          data: {
                            commentsByMedium: commentsByMedium.filter((otherComment) => otherComment.id !== comment.id)
                          }
                        });

                        if (comment.parentId) {
                          let parentCommentsByMedium;
                          try {
                            const data = cache.readQuery({ query: GET_COMMENTS_BY_MEDIUM, variables: { mediumId: medium.id, parentId: null } });
                            parentCommentsByMedium = data.commentsByMedium;
                          } catch (e) {
                            parentCommentsByMedium = [];
                          }
                          cache.writeQuery({
                            query: GET_COMMENTS_BY_MEDIUM,
                            variables: { mediumId: medium.id, parentId: null },
                            data: {
                              commentsByMedium: parentCommentsByMedium.map((otherComment) => {
                                if (otherComment.id === comment.parentId) {
                                  return ({ ...otherComment, repliesCount: (otherComment.repliesCount - 1) })
                                }
                                return (otherComment);
                              })
                            }
                          });
                        } else {
                          cache.writeQuery({
                            query: GET_MEDIUM,
                            variables: { id: medium.id },
                            data: {
                              medium: {
                                ...medium,
                                commentsCount: (medium.commentsCount - 1),
                              }
                            }
                          });
                        }
                      }}
                    >
                      {(deleteComment) => (
                        <MenuItem
                          onClick={() => {
                            deleteComment({
                              variables: {
                                input: {
                                  id: comment.id
                                }
                              }
                            });
                          }}
                        >
                          Delete
                        </MenuItem>
                      )}
                    </Mutation>
                }
              </Menu>
            </div>
          }
          title={
            <Grid spacing={8} container alignItems="baseline">
              <Grid item>
                <Typography variant={'subtitle2'}>
                  <Link to={`/${comment.user.slug}`} className={classes.userLink}>{comment.user.name}</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant={'caption'}>
                  {timeAgo.format(dayjs(comment.createdAt).toDate())}
                </Typography>
              </Grid>
            </Grid>
          }
          subheader={<FormattedText text={comment.body} variant="inherit" />}
        />
        {
          !disableReply && (currentSession || repliesCount > 0) &&
            <ExpansionPanel
              elevation={0}
              square
              expanded={this.state.replyExpanded}
              className={classes.repliesPanel}
              style={width === 'lg' || width === 'xl' ? { marginLeft: 56 } : { paddingLeft: 34 }}
              onChange={() => this.setState({ replyExpanded: !this.state.replyExpanded })}
              CollapseProps={{
                timeout: 100
              }}
            >
              <ExpansionPanelSummary
                classes={{
                  expandIcon: classes.repliesAction
                }}
                expandIcon={
                  <ExpandMoreIcon
                    className={classes.repliesAction}
                  />
                }
                className={classes.repliesCount}
              >
                <Typography>{countFormat(repliesCount, 'reply', 'replies')}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.repliesPanelDetails}>
                {
                  this.state.replyExpanded &&
                    <CommentForm
                      medium={medium}
                      parent={comment}
                      autoFocus
                    />
                }
                {repliesCount > 0 && <Comments medium={medium} parent={comment} commentsCount={repliesCount} />}
              </ExpansionPanelDetails>
            </ExpansionPanel>
        }
      </div>
    );
  }
}

export default withStyles(styles)(
  withCurrentSession(
    withWidth()(Comment)
  )
);
