import gql from "graphql-tag";

export const UPDATE_FURSUIT = gql`
  mutation updateFursuit($input: UpdateFursuitInput!) {
    updateFursuit(input: $input) {
      fursuit {
        id
        name
        slug
        mediaCount
        followersCount
        likesCount
        favesCount
        claimed
        claimRejected
        possessed
        followed
        visible
        bio
        avatar
        creationYear
        fursuitLegType {
          id
          name
        }
        species {
          id
          name
        }
        isHybrid
        fursuitBuild {
          id
          name
        }
        fursuitGender {
          id
          name
        }
        fursuitPadding {
          id
          name
        }
        fursuitFinger {
          id
          name
        }
        fursuitStyle {
          id
          name
        }
        baseColor
        eyesColor
        makers {
          id
          name
          slug
        }
        users {
          id
          public
          slug
          name
        }
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

export const CREATE_FURSUIT = gql`
  mutation createFursuit($input: CreateFursuitInput!) {
    createFursuit(input: $input) {
      fursuit {
        id
      }
      errors
    }
  }
`;

export const DELETE_FURSUIT = gql`
  mutation deleteFursuit($input: DeleteFursuitInput!) {
    deleteFursuit(input: $input) {
      fursuit {
        id
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
