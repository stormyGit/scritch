import gql from "graphql-tag";

export const GET_ADVERTS = gql`
  query Adverts($uuid: ID, $limit: Int!) {
    adverts(uuid: $uuid, limit: $limit) {
      id
      file
    }
  }
`;
