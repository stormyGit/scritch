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

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      errors
    }
  }
`;

export const SEND_NEW_CONFIRM_MAIL = gql`
  mutation sendNewConfirmMail($input: SendNewConfirmMailInput!) {
    sendNewConfirmMail(input: $input) {
      errors
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

export const REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      errors
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      errors
    }
  }
`;

export const EMAIL_SIGN_IN = gql`
  mutation emailSignIn($input: EmailSignInInput!) {
    emailSignIn(input: $input) {
      session {
        id
        user {
          id
        }
      }
    }
  }
`;

export const CREATE_FACEBOOK_SESSION = gql`
  mutation createFacebookSession($input: CreateFacebookSessionInput!) {
    createFacebookSession(input: $input) {
      session {
        id
        user {
          id
        }
      }
    }
  }
`;

export const GET_SESSION_MODERATOR = gql`
  query Session {
    session {
      id
      user {
        id
        moderator {
          id
          name
          capabilities
          telegramId
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
        service
        name
        public
        chatEnabled
        slug
        avatar
        banner
        usedFreeTrial
        globalScore
        score
        bio
        metricSpecies
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
        isModerator
      }
    }
  }
`;
