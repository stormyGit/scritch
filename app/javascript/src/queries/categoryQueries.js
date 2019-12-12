import gql from "graphql-tag";

export const LOAD_CATEGORIES = gql`
  query Categories($name: String, $limit: Int!, $offset: Int!) {
    categories(name: $name, limit: $limit, offset: $offset) {
      id
      name
    }
  }
`;
