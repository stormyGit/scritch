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

export const CREATE_FURSUIT_REQUEST = gql`
  mutation createFursuitRequest($input: CreateFursuitRequestInput!) {
    createFursuitRequest(input: $input) {
      fursuitRequest {
        id
        name
      }
      errors
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

export const DELETE_FURSUIT_USER = gql`
  mutation deleteFursuitUser($input: DeleteFursuitUserInput!) {
    deleteFursuitUser(input: $input) {
      fursuitUser {
        id
      }
    }
  }
`;
