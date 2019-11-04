import gql from "graphql-tag";

export const UPDATE_MAKER = gql`
  mutation updateMaker($input: UpdateMakerInput!) {
    updateMaker(input: $input) {
      maker {
        id
        name
        bio
        slug
        web
        country
        region
        avatar
        claimed
        claimRejected
        commissionStatus {
          id
          name
        }
        followed
        fursuitsNumber
        possessed
      }
    }
  }
`;

export const CREATE_MAKER_SUBSCRIPTION = gql`
  mutation createMakerSubscription($input: CreateMakerSubscriptionInput!) {
    createMakerSubscription(input: $input) {
      subscription {
        id
      }
    }
  }
`;

export const DELETE_MAKER_SUBSCRIPTION = gql`
  mutation deleteMakerSubscription($input: DeleteMakerSubscriptionInput!) {
    deleteMakerSubscription(input: $input) {
      subscription {
        id
      }
    }
  }
`;
