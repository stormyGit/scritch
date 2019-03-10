import gql from "graphql-tag";

export const UPDATE_MAKER = gql`
  mutation updateMaker($input: UpdateMakerInput!) {
    updateMaker(input: $input) {
      maker {
        id
        name
      }
    }
  }
`;
