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

export const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      subscription {
        id
      }
    }
  }
`;

export const DELETE_SUBSCRIPTION = gql`
  mutation deleteSubscription($input: DeleteSubscriptionInput!) {
    deleteSubscription(input: $input) {
      subscription {
        id
      }
    }
  }
`;
