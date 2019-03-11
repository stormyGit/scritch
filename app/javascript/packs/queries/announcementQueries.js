import gql from "graphql-tag";

export const GET_ANNOUNCEMENTS = gql`
  query Announcements($offset: Int!, $limit: Int!) {
    announcements(offset: $offset, limit: $limit) {
      id
      body
      title
      createdAt
    }
  }
`;

export const GET_RIBBON_ANNOUNCEMENT = gql`
  query RibbonAnnouncement {
    ribbonAnnouncement {
      id
      body
      createdAt
    }
  }
`;
