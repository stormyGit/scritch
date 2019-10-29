import gql from "graphql-tag";

export const TAG_LOCK_MEDIUM = gql`
  mutation tagLockMedium($input: TagLockMediumInput!) {
    tagLockMedium(input: $input) {
      medium {
        id
      }
    }
  }
`;

export const TAG_UNLOCK_MEDIUM = gql`
  mutation tagUnlockMedium($input: TagUnlockMediumInput!) {
    tagUnlockMedium(input: $input) {
      medium {
        id
      }
    }
  }
`;

export const DELETE_MEDIUM = gql`
  mutation deleteMedium($input: DeleteMediumInput!) {
    deleteMedium(input: $input) {
      medium {
        id
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      comment {
        id
      }
    }
  }
`;

export const UPDATE_MEDIUM = gql`
  mutation updateMedium($input: UpdateMediumInput!) {
    updateMedium(input: $input) {
      medium {
        id
        slug
        title
        description
        picture
        thumbnail
        width
        height
        exif
        commentsCount
        completion
        fursuitsCount
        likesCount
        photographerSlug
        photographerString
        liked
        tagger
        tagLocked
        favesCount
        faved
        viewsCount
        createdAt
        resized
        commentsDisabled
        tagList
        fursuits {
          id
          name
          avatar
          isHybrid
          species {
            id
            name
          }
          slug
        }
        subEvent {
          id
          name
        }
        category {
          id
          name
        }
        edition {
          id
          name
          event {
            id
            slug
            name
          }
        }
        user {
          id
          slug
          name
          avatar
        }
      }
    }
  }
`;

export const CREATE_MEDIUM = gql`
  mutation createMedium($input: CreateMediumInput!) {
    createMedium(input: $input) {
      medium {
        id
        slug
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      comment {
        id
        body
        createdAt
        repliesCount
        parentId
        user {
          id
          slug
          name
          avatar
        }
      }
    }
  }
`;

export const CREATE_LIKE = gql`
  mutation createLike($input: CreateLikeInput!) {
    createLike(input: $input) {
      like {
        id
      }
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation deleteLike($input: DeleteLikeInput!) {
    deleteLike(input: $input) {
      like {
        id
      }
    }
  }
`;

export const CREATE_FAVE = gql`
  mutation createFave($input: CreateFaveInput!) {
    createFave(input: $input) {
      fave {
        id
      }
    }
  }
`;

export const DELETE_FAVE = gql`
  mutation deleteFave($input: DeleteFaveInput!) {
    deleteFave(input: $input) {
      fave {
        id
      }
    }
  }
`;
