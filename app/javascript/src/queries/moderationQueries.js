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

export const FETCH_SUSPENDED_USERS = gql`
  query moderationSuspended {
    moderationSuspended {
      id
      user {
        id
        slug
        name
        telegramId
        email
        service
      }
      limit
      reason
    }
  }
`;

export const FETCH_FURSUIT_REQUESTS = gql`
  query moderationFursuitRequests {
    moderationFursuitRequests {
      id
      url
      notes
      user {
        id
        slug
        name
      }
      name
      makers {
        id
        slug
        name
      }
      creationYear
      fursuitLegType {
        id
        name
        picture
      }
      species {
        id
        name
      }
      isHybrid
      fursuitBuild {
        id
        name
        picture
      }
      fursuitGender {
        id
        name
        picture
      }
      fursuitPadding {
        id
        name
        picture
      }
      fursuitFinger {
        id
        name
      }
      fursuitStyle {
        id
        name
        picture
      }
      assignee {
        id
        name
      }
      baseColor
      eyesColor
    }
  }
`;

export const FETCH_MAKER_REQUESTS = gql`
  query moderationMakerRequests {
    moderationMakerRequests {
      id
      url
      body
      url
      assetName
      user {
        id
        name
        slug
      }
    }
  }
`;

export const FETCH_EVENT_REQUESTS = gql`
  query moderationEventRequests {
    moderationEventRequests {
      id
      url
      body
      url
      assetName
      user {
        id
        name
        slug
      }
    }
  }
`;
