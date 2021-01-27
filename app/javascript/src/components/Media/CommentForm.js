import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Mutation} from "react-apollo";

import UserAvatar from "../Users/UserAvatar";
import withCurrentSession from "../withCurrentSession";
import InteractiveTextInput from "../Global/InteractiveTextInput";
import {CREATE_COMMENT} from "../../queries/mediaMutations";
import {GET_COMMENTS_BY_MEDIUM, GET_MEDIUM} from "../../queries/mediaQueries";

const styles = theme => ({
  root: {
    flex: 1
  },
  textFieldContainer: {
    flex: 1,
    marginLeft: theme.spacing(1)
  },
  actions: {
    textAlign: "right",
    marginTop: theme.spacing(1)
  },
  cancelButton: {
    marginRight: theme.spacing(1)
  }
});

class CommentForm extends React.Component {
  state = {
    showAction: false,
    body: ""
  };

  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  componentDidMount() {
    // if (this.props.autoFocus) {
    //   setTimeout(() => {
    //     this.input.current.focus();
    //   }, 100)
    // }
  }

  render() {
    const {
      classes,
      medium,
      parent,
      currentSession,
      autoFocus,
      dismissable,
      onDismiss
    } = this.props;

    if (!currentSession) {
      return null;
    }

    return (
      <Mutation
        mutation={CREATE_COMMENT}
        update={(cache, { data: { createComment } }) => {
          let commentsByMedium;

          if (parent) {
            try {
              const data = cache.readQuery({
                query: GET_COMMENTS_BY_MEDIUM,
                variables: { mediumId: medium.id, parentId: parent.id }
              });
              commentsByMedium = data.commentsByMedium;
            } catch (e) {
              commentsByMedium = [];
            }
            cache.writeQuery({
              query: GET_COMMENTS_BY_MEDIUM,
              variables: { mediumId: medium.id, parentId: parent.id },
              data: {
                commentsByMedium: [createComment.comment, ...commentsByMedium]
              }
            });

            let parentCommentsByMedium;
            try {
              const data = cache.readQuery({
                query: GET_COMMENTS_BY_MEDIUM,
                variables: { mediumId: medium.id, parentId: null }
              });
              parentCommentsByMedium = data.commentsByMedium;
            } catch (e) {
              parentCommentsByMedium = [];
            }
            cache.writeQuery({
              query: GET_COMMENTS_BY_MEDIUM,
              variables: { mediumId: medium.id, parentId: null },
              data: {
                commentsByMedium: parentCommentsByMedium.map(comment => {
                  if (comment.id === parent.id) {
                    return {
                      ...comment,
                      repliesCount: comment.repliesCount + 1
                    };
                  }
                  return comment;
                })
              }
            });
          } else {
            try {
              const data = cache.readQuery({
                query: GET_COMMENTS_BY_MEDIUM,
                variables: { mediumId: medium.id, parentId: null }
              });
              commentsByMedium = data.commentsByMedium;
            } catch (e) {
              commentsByMedium = [];
            }
            cache.writeQuery({
              query: GET_COMMENTS_BY_MEDIUM,
              variables: { mediumId: medium.id, parentId: null },
              data: {
                commentsByMedium: [createComment.comment, ...commentsByMedium]
              }
            });
            cache.writeQuery({
              query: GET_MEDIUM,
              variables: { id: medium.id },
              data: {
                medium: {
                  ...medium,
                  commentsCount: medium.commentsCount + 1
                }
              }
            });
          }
        }}
      >
        {(createComment, { data }) => (
          <div className={classes.root}>
            <Grid container spacing={1} alignItems="flex-start">
              <Grid item>
                <UserAvatar user={currentSession.user} />
              </Grid>
              <Grid item className={classes.textFieldContainer}>
                <InteractiveTextInput
                  inputProps={{
                    ref: this.input,
                    autoFocus
                  }}
                  autoFocus
                  name="body"
                  margin="dense"
                  placeholder={parent ? "Add a reply…" : "Add a comment…"}
                  type="text"
                  fullWidth
                  multiline
                  rows={1}
                  rowsMax={12}
                  value={this.state.body}
                  onChange={e => {
                    this.setState({ body: e.target.value });
                  }}
                  onFocus={() => this.setState({ showAction: true })}
                />
              </Grid>
            </Grid>
            <div className={classes.actions}>
              {(this.state.body.length > 0 || dismissable) && (
                <Button
                  className={classes.cancelButton}
                  onClick={() => {
                    this.setState({ body: "", showAction: false });
                    if (onDismiss) {
                      onDismiss();
                    }
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button
                color={"primary"}
                variant={"contained"}
                disabled={this.state.body.replace(/\s+/g, "").length === 0}
                onClick={() => {
                  createComment({
                    variables: {
                      input: {
                        body: this.state.body,
                        mediumId: medium.id,
                        parentId: parent ? parent.id : null
                      }
                    }
                  });
                  this.setState({ body: "", showAction: false });
                  if (onDismiss) {
                    onDismiss();
                  }
                }}
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(withCurrentSession(CommentForm));
