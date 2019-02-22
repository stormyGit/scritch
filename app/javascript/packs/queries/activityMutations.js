import gql from "graphql-tag";

export const READ_ACTIVITIES = gql`
  mutation readActivities($input: ReadActivitiesInput!) {
    readActivities(input: $input) {
      user {
        id
      }
    }
  }
`;

export const CLEAR_ACTIVITIES = gql`
  mutation clearActivities($input: ClearActivitiesInput!) {
    clearActivities(input: $input) {
      user {
        id
      }
    }
  }
`;
