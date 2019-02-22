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
