import gql from "graphql-tag";

export const READ_ANNOUNCEMENTS = gql`
  mutation readAnnouncements($input: ReadAnnouncementsInput!) {
    readAnnouncements(input: $input) {
      user {
        id
      }
    }
  }
`;
