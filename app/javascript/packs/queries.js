import gql from "graphql-tag";

export const GET_THEME = gql`
  query getTheme @client {
    theme
  }
`;

export const CREATE_SESSION = gql`
  mutation createSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      session {
        id
        user {
          id
          name
          slug
          avatar
          banner
          bio
          theme
        }
      }
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation deleteSession($input: DeleteSessionInput!) {
    deleteSession(input: $input) {
      session {
        id
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        name
        slug
        avatar
        banner
        bio
        theme
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
      canUpdate
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
      id
      user {
        id
        name
        slug
        avatar
        banner
        bio
        theme
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
