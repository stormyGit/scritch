import gql from "graphql-tag";

export const GET_THEME = gql`
  query getTheme @client {
    theme
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

export const CREATE_SESSION = gql`
  mutation createSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      session {
        id
        user {
          id
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
        public
        chatEnabled
        slug
        avatar
        banner
        globalScore
        bio
        website
        theme
        showAds
        showTooltips
        hasAdverts
        suspendedUser {
          id
          limit
          reason
        }
        sponsor {
          id
          limit
          plan
          status
          createdAt
        }
        tagTutorial
        mediaCount
        likedCount
        favedCount
        taggedCount
        followingCount
        followersCount
        unreadAnnouncementsCount
      }
    }
  }
`;
