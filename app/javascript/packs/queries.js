import gql from "graphql-tag";

export const TOGGLE_SIGNUP_DIALOG = gql`
  mutation toggleSignUpDialog($isSignupDialogOpen: Boolean) {
    toggleSignUpDialog(isSignupDialogOpen: $isSignupDialogOpen) @client
  }
`;

export const GET_SIGNUP_DIALOG = gql`
  query getSignupDialog @client {
    isSignupDialogOpen
  }
`;


export const CREATE_SESSION = gql`
  mutation createSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      session {
        id
      }
    }
    toggleSignUpDialog(isSignupDialogOpen: false) @client
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
      name
      avatar
      banner
      bio
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
  query Session($id: ID!) {
    session(id: $id) {
      user {
        name
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
