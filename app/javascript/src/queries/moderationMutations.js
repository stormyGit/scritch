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

export const CREATE_MODERATOR = gql`
  mutation createModerator($input: CreateModeratorInput!) {
    createModerator(input: $input) {
      moderator {
        name
        telegramId
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
