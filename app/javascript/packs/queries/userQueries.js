import gql from "graphql-tag";

export const GET_USERS = gql`
  query Users(
    $q: String
    $fillWithFollowing: Boolean
    $offset: Int!
    $limit: Int!
  ) {
    users(
      q: $q
      fillWithFollowing: $fillWithFollowing
      offset: $offset
      limit: $limit
    ) {
      id
      slug
      name
      showAds
      showTooltips
      avatar
    }
  }
`;

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      public
      chatEnabled
      slug
      name
      avatar
      banner
      bio
      website
      showAds
      showTooltips
      followed
      following
      mediaCount
      makers {
        id
        slug
        name
      }
      fursuits {
        id
        name
        avatar
        mediaCount
        followersCount
        likesCount
        favesCount
        slug
        makers {
          id
          name
        }
      }
      sponsor {
        id
        limit
        plan
        status
        createdAt
      }
      followersCount
      followingCount
      likesCount
      blocked
    }
  }
`;

export const GET_BLOCKED_USERS = gql`
  query BlockedUsers {
    blockedUsers @connection(key: "blockedUsers") {
      id
      slug
      name
      avatar
    }
  }
`;

export const GET_LIKES_BY_USER = gql`
  query GetLikesByUser($userId: ID!, $offset: Int!, $limit: Int!) {
    likesByUser(userId: $userId, offset: $offset, limit: $limit) {
      id
      medium {
        id
        slug
        title
        description
        picture
        thumbnail
        width
        height
        createdAt
        commentsCount
        likesCount
        viewsCount
        liked
        tagList
        user {
          id
          slug
          name
          avatar
        }
      }
    }
  }
`;

export const GET_FOLLOWERS_BY_USER = gql`
  query GetFollowersByUser($userId: ID!, $offset: Int!, $limit: Int!) {
    followersByUser(userId: $userId, offset: $offset, limit: $limit)
      @connection(key: "followersByUser", filter: ["userId"]) {
      id
      slug
      name
      avatar
      bio
      mediaCount
    }
  }
`;

export const GET_FOLLOWINGS_BY_USER = gql`
  query GetFollowingsByUser($userId: ID!, $offset: Int!, $limit: Int!) {
    followingsByUser(userId: $userId, offset: $offset, limit: $limit)
      @connection(key: "followingsByUser", filter: ["userId"]) {
      id
      slug
      name
      avatar
      bio
      mediaCount
    }
  }
`;
