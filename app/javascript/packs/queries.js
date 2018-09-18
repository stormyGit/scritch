import gql from "graphql-tag";

export const GET_MEDIA = gql`
  query Media($q: String) {
    media(q: $q) {
      id
      title
      description
      previewKey
      thumbnailKey
      createdAt
      duration
      user {
        id
        slug
        name
        avatar
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

export const GET_MEDIUM = gql`
  query Medium($id: ID!) {
    medium(id: $id) {
      id
      title
      description
      key
      user {
        id
        slug
        name
        avatar
      }
      comments {
        id
        body
        createdAt
        user {
          id
          slug
          name
          avatar
        }
      }
      relatedMedia {
        id
        title
        description
        thumbnailKey
        previewKey
        duration
        createdAt
        user {
          id
          slug
          name
        }
      }
    }
  }
`;

export const GET_MEDIA_BY_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      name
      publishedMedia {
        id
        title
        description
        previewKey
        thumbnailKey
        createdAt
        duration
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
      }
    }
  }
`;
