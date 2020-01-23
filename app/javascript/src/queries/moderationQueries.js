import gql from "graphql-tag";

export const FETCH_ADVERTS = gql`
  query moderationAdverts($filter: String) {
    moderationAdverts(filter: $filter) {
      id
      status
      width
      height
      impressions
      file
      url
      isPlaceholder
      public
    }
  }
`;

export const FETCH_MAKER_CLAIMS = gql`
  query moderationMakerClaims {
    moderationMakerClaims {
      id
      maker {
        id
        name
        slug
      }
      user {
        id
        name
        slug
      }
      conflictual
      status
    }
  }
`;

export const FETCH_CLAIMS = gql`
  query moderationClaims {
    moderationClaims {
      id
      fursuit {
        id
        name
        slug
        users {
          id
          name
          slug
        }
      }
      user {
        id
        name
        slug
      }
      conflictual
      status
    }
  }
`;

export const FETCH_MODERATORS = gql`
  query moderationModerators {
    moderationModerators {
      id
      name
      telegramId
      capabilities
      createdAt
    }
  }
`;

export const FETCH_ANNOUNCEMENTS = gql`
  query moderationAnnouncements {
    moderationAnnouncements {
      id
      body
      title
      createdAt
    }
  }
`;

export const FETCH_ANALYTICS = gql`
  query moderationAnalytics {
    moderationAnalytics {
      users
      suspended
      moderators
      media
      tags
      adverts
      impressions
      makers
      claimedMakers
      fursuits
      claimedFursuits
      reportsOpen
      averageCompletion
      scritches
      faves
      sponsors
      events
      editions
      storageDiskUsage
    }
  }
`;
