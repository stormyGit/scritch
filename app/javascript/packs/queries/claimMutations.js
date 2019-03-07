import gql from "graphql-tag";

export const CREATE_CLAIM = gql`
  mutation createClaim($input: CreateClaimInput!) {
    createClaim(input: $input) {
      claim {
        id
      }
    }
  }
`;
