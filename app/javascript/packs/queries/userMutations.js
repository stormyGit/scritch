import gql from "graphql-tag";

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        name
        public
        chatEnabled
        slug
        avatar
        banner
        bio
        website
        theme
        showAds
        showTooltips
        mediaCount
        followingCount
        unreadAnnouncementsCount
      }
    }
  }
`;

export const BLOCK_USER = gql`
  mutation blockUser($input: BlockUserInput!) {
    blockUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const UNBLOCK_USER = gql`
  mutation unblockUser($input: UnblockUserInput!) {
    unblockUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const CREATE_FOLLOW = gql`
  mutation createFollow($input: CreateFollowInput!) {
    createFollow(input: $input) {
      follow {
        id
      }
    }
  }
`;

export const DELETE_FOLLOW = gql`
  mutation deleteFollow($input: DeleteFollowInput!) {
    deleteFollow(input: $input) {
      follow {
        id
      }
    }
  }
`;