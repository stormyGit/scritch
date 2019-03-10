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

export const CREATE_MAKER_CLAIM = gql`
  mutation createMakerClaim($input: CreateMakerClaimInput!) {
    createMakerClaim(input: $input) {
      makerClaim {
        id
      }
    }
  }
`;
