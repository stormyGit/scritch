import gql from "graphql-tag";

export const CREATE_ADVERT = gql`
  mutation createAdvert($input: CreateAdvertInput!) {
    createAdvert(input: $input) {
      advert {
        id
      }
    }
  }
`;
