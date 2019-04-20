import gql from "graphql-tag";

export const GET_ACTIVITIES = gql`
  query Activities($offset: Int!, $limit: Int!) {
    activities(offset: $offset, limit: $limit) @connection(key: "activities") {
      id
      key
      createdAt
      owner {
        id
        slug
        name
        avatar
      }
      trackable {
        ... on Like {
          id
          medium {
            id
            title
          }
        }
        ... on FursuitMedium {
          id
          medium {
            id
            thumbnail
          }
          fursuit {
            id
            name
          }
        }
        ... on Comment {
          id
          body
          medium {
            id
            title
          }
        }
        ... on Follow {
          id
        }
        ... on Report {
          id
          reportedUserName
        }
        ... on MediumReport {
          id
          reportedPictureTitle
        }
        ... on CommentReport {
          id
          reportedCommentUserName
        }
        ... on TagReport {
          id
          reportedTagPictureTitle
        }
        ... on Maker {
          id
          name
          slug
          avatar
        }
        ... on Advert {
          id
          file
        }
        ... on User {
          id
        }
        ... on Fursuit {
          id
          name
        }
      }
    }
  }
`;

export const GET_UNREAD_ACTIVITY_COUNT = gql`
  query UnreadActivityCount {
    unreadActivityCount
  }
`;
