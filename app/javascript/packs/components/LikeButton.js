import React from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NoFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';

import { CREATE_LIKE, DELETE_LIKE, GET_MEDIUM } from '../queries';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit
  }
});

const likeCountString = (count) => {
  if (count === 0) {
    return ('No likes')
  }
  if (count === 1) {
    return ('One like');
  }
  return (`${count} likes`);
}

const LikeButton = ({ medium, classes, ...props }) => {

  if (medium.liked) {
    return (
      <Mutation
        mutation={DELETE_LIKE}
        update={(cache) => {
          cache.writeQuery({
            query: GET_MEDIUM,
            variables: { id: medium.id },
            data: { medium: { ...medium, liked: false, likersCount: (medium.likersCount - 1) } }
          });
        }}
      >
        {( deleteLike, { data }) => (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              deleteLike({ variables: { input: { mediumId: medium.id }}})
            }}
            {...props}
          >
            <FavoriteIcon className={classes.leftIcon} />
            {likeCountString(medium.likersCount)}
          </Button>
        )}
      </Mutation>
    );
  } else {
    return (
      <Mutation
        mutation={CREATE_LIKE}
        update={(cache) => {
          cache.writeQuery({
            query: GET_MEDIUM,
            variables: { id: medium.id },
            data: { medium: { ...medium, liked: true, likersCount: (medium.likersCount + 1) } }
          });
        }}
      >
        {( createLike, { data }) => (
          <Button
            size="small"
            color="secondary"
            onClick={() => {
              createLike({ variables: { input: { mediumId: medium.id }}})
            }}
            {...props}
          >
            <NoFavoriteIcon className={classes.leftIcon} />
            {likeCountString(medium.likersCount)}
          </Button>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(LikeButton);
