import gql from "graphql-tag";

export const CREATE_SESSION = gql`
  mutation createSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      session {
        id
        user {
          name
          slug
          avatar
          banner
          bio
        }
      }
    }
  }
`;

export const GET_MEDIA = gql`
  query Media($q: String) {
    media(q: $q) {
      id
      slug
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
      slug
      title
      description
      key
      duration
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
        slug
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

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      avatar
      banner
      bio
      followed
      following
      followersCount
      followingCount
      likesCount
      publishedMedia {
        id
        slug
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

export const GET_SESSION = gql`
  query Session {
    session {
      user {
        name
        slug
        avatar
        banner
        bio
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

export const CREATE_FOLLOW = gql`
  mutation createFollow($input: CreateFollowInput!) {
    createFollow(input: $input) {
      follow {
        id
      }
    }
  }
`;


export const DELETE_FOLLOW = gql`
  mutation deleteFollow($input: DeleteFollowInput!) {
    deleteFollow(input: $input) {
      follow {
        id
      }
    }
  }
`;
