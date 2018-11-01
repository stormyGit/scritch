import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NoFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Query, Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';

import { CREATE_LIKE, DELETE_LIKE, GET_MEDIUM, GET_SESSION } from '../queries';
import countFormat from '../countFormat';
import withCurrentSession from './withCurrentSession';
import LikesDialog from './LikesDialog';

const styles = theme => ({
  root: {
    marginLeft: theme.spacing.unit,
    paddingBottom: 2,
    paddingLeft: 2,
    paddingRight: 2,
    display: 'inline-block',
    borderBottomColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
  },
  iconButton: {
    padding: theme.spacing.unit - 2,
  },
  button: {
    padding: "6px 3px",
    minWidth: 33,
  }
});

class LikeButton extends React.Component {
  state = {
    likesDialog: false,
  }

  render() {
    const { medium, classes, link, currentSession, ...props } = this.props;
    const likesCount = medium.likesCount;

    return (
      <React.Fragment>
        <div className={classes.root}>
          {
            medium.liked ?
              <Mutation
                mutation={DELETE_LIKE}
                update={(cache) => {
                  cache.writeQuery({
                    query: GET_MEDIUM,
                    variables: { id: medium.id },
                    data: { medium: { ...medium, liked: false, likesCount: (likesCount - 1) } }
                  });
                }}
              >
                {(deleteLike) => (
                  <IconButton
                    size="small"
                    color="secondary"
                    classes={{
                      root: classes.iconButton
                    }}
                    onClick={() => {
                      deleteLike({ variables: { input: { mediumId: medium.id }}})
                    }}
                    {...props}
                  >
                    <FavoriteIcon fontSize={'small'} />
                  </IconButton>
                )}
              </Mutation> :
              <Mutation
                mutation={CREATE_LIKE}
                update={(cache) => {
                  cache.writeQuery({
                    query: GET_MEDIUM,
                    variables: { id: medium.id },
                    data: { medium: { ...medium, liked: true, likesCount: (likesCount + 1) } }
                  });
                }}
              >
                {(createLike) => (
                  <IconButton
                    size="small"
                    color="secondary"
                    classes={{
                      root: classes.iconButton
                    }}
                    disabled={!currentSession}
                    onClick={() => {
                      createLike({ variables: { input: { mediumId: medium.id }}})
                    }}
                    {...props}
                  >
                    <NoFavoriteIcon fontSize={'small'} />
                  </IconButton>
                )}
              </Mutation>
          }
          <Button
            size="small"
            classes={{
              root: classes.button
            }}
            onClick={() => {
              this.setState({ likesDialog: true })
            }}
          >
            {countFormat(likesCount, 'like', 'likes')}
          </Button>
        </div>
        <LikesDialog
          medium={medium}
          open={this.state.likesDialog}
          onClose={() => {
            this.setState({ likesDialog: false })
          }}
        />
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(withCurrentSession(LikeButton));
