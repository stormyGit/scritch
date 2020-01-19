import gql from "graphql-tag";

export const UPDATE_MODERATOR = gql`
  mutation updateModerator($input: UpdateModeratorInput!) {
    updateModerator(input: $input) {
      moderator {
        id
        capabilities
      }
    }
  }
`;

export const DELETE_MODERATOR = gql`
  mutation deleteModerator($input: DeleteModeratorInput!) {
    deleteModerator(input: $input) {
      moderator {
        id
      }
    }
  }
`;
