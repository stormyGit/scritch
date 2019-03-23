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
        ... on FursuitUser {
          id
          user {
            id
            name
          }
          fursuit {
            id
            name
            isHybrid
            fursuitSpecy {
              name
            }
          }
        }
        ... on Medium {
          id
          title
        }
        ... on Comment {
          id
          body
          medium {
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
      }
    }
  }
`;

export const GET_UNREAD_ACTIVITY_COUNT = gql`
  query UnreadActivityCount {
    unreadActivityCount
  }
`;
