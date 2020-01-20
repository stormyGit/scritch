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

export const UPDATE_ANNOUNCEMENT = gql`
  mutation updateAnnouncement($input: UpdateAnnouncementInput!) {
    updateAnnouncement(input: $input) {
      announcement {
        id
        title
        body
      }
    }
  }
`;

export const CREATE_ANNOUNCEMENT = gql`
  mutation createAnnouncement($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
      announcement {
        title
        body
      }
    }
  }
`;

export const DELETE_ANNOUNCEMENT = gql`
  mutation deleteAnnouncement($input: DeleteAnnouncementInput!) {
    deleteAnnouncement(input: $input) {
      announcement {
        id
      }
    }
  }
`;
