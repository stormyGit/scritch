import gql from "graphql-tag";

export const UPDATE_FURSUIT = gql`
  mutation updateFursuit($input: UpdateFursuitInput!) {
    updateFursuit(input: $input) {
      fursuit {
        id
        name
      }
    }
  }
`;
