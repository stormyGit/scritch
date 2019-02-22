import gql from "graphql-tag";

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
        commentsCount
        likesCount
        liked
        viewsCount
        createdAt
        picture
        completion
        fursuitsCount
        thumbnail
        width
        height
        width
        height
        commentsDisabled
        tagList
        category {
          id
          name
        }
        edition {
          id
          name
          event {
            id
            name
          }
        }
        user {
          id
          slug
          name
          avatar
        }
        fursuits {
          id
          name
          slug
        }
        relatedMedia {
          id
          slug
          title
          description
          picture
          thumbnail
          width
          height
          width
          height
          createdAt
          user {
            id
            slug
            name
          }
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
