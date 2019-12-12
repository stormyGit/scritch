import gql from "graphql-tag";

export const FETCH_ADVERTS = gql`
  query ModerationAdverts($filter: String) {
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
  query Moderators {
    moderators {
      id
      name
      telegramId
      capabilities
      createdAt
    }
  }
`;
