import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NoFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import { Query, Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';

import { CREATE_LIKE, DELETE_LIKE, GET_MEDIUM, GET_SESSION } from '../queries';
import countFormat from '../countFormat';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

const LikeButton = ({ medium, classes, link, ...props }) => (
  <Query query={GET_SESSION}>
    {({ loading, data: sessionData }) => (
      medium.liked ?
        <Mutation
          mutation={DELETE_LIKE}
          update={(cache) => {
            cache.writeQuery({
              query: GET_MEDIUM,
              variables: { id: medium.id },
              data: { medium: { ...medium, liked: false, likesCount: (medium.likesCount - 1) } }
            });
          }}
        >
          {(deleteLike) => (
            <Button
              size="small"
              color="secondary"
              onClick={() => {
                deleteLike({ variables: { input: { mediumId: medium.id }}})
              }}
              {...props}
            >
              <FavoriteIcon className={classes.leftIcon} />
              {countFormat(medium.likesCount, 'like', 'likes')}
            </Button>
          )}
        </Mutation> :
        <Mutation
          mutation={CREATE_LIKE}
          update={(cache) => {
            cache.writeQuery({
              query: GET_MEDIUM,
              variables: { id: medium.id },
              data: { medium: { ...medium, liked: true, likesCount: (medium.likesCount + 1) } }
            });
          }}
        >
          {(createLike) => (
            <Button
              size="small"
              color="secondary"
              disabled={loading || !sessionData.session}
              onClick={() => {
                createLike({ variables: { input: { mediumId: medium.id }}})
              }}
              {...props}
            >
              <NoFavoriteIcon className={classes.leftIcon} />
              {countFormat(medium.likesCount, 'like', 'likes')}
            </Button>
          )}
        </Mutation>
    )}
  </Query>
)

export default withStyles(styles)(LikeButton);
