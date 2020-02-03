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
      reports
      reportsOpen
      averageCompletion
      scritches
      faves
      sponsors
      events
      editions
      storageDiskUsage
      usersCount {
        date
        amount
      }
      usersPerDay {
        date
        amount
      }
      sponsorsCount {
        date
        amount
      }
      impressionsCount {
        date
        amount
      }
      mediaCount {
        date
        amount
      }
      impressionsPerDay {
        date
        amount
      }
      averageCompletionPerDay {
        date
        amount
      }
    }
  }
`;
