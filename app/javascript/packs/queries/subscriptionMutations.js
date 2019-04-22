import gql from "graphql-tag";

export const READ_MAKER_NOTIFICATIONS = gql`
  mutation readMakerNotifications($input: ReadMakerNotificationsInput!) {
    readMakerNotifications(input: $input) {
      user {
        id
      }
    }
  }
`;

export const READ_MEDIA_NOTIFICATIONS = gql`
  mutation readMediaNotifications($input: ReadMediaNotificationsInput!) {
    readMediaNotifications(input: $input) {
      user {
        id
      }
    }
  }
`;

export const READ_FURSUIT_NOTIFICATIONS = gql`
  mutation readFursuitNotifications($input: ReadFursuitNotificationsInput!) {
    readFursuitNotifications(input: $input) {
      user {
        id
      }
    }
  }
`;
