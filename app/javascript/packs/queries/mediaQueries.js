import gql from "graphql-tag";

export const GET_MEDIA = gql`
  query Media(
    $q: String
    $sort: String
    $userId: ID
    $offset: Int!
    $limit: Int!
    $fursuitId: ID
    $categoryId: ID
    $subEventId: ID
    $fursuits: [ID]
    $tagging: Boolean
    $editionId: [ID!]
  ) {
    media(
      q: $q
      sort: $sort
      userId: $userId
      offset: $offset
      limit: $limit
      fursuitId: $fursuitId
      categoryId: $categoryId
      subEventId: $subEventId
      fursuits: $fursuits
      tagging: $tagging
      editionId: $editionId
    ) {
      id
      slug
      title
      description
      picture
      thumbnail
      width
      height
      completion
      fursuitsCount
      createdAt
      commentsCount
      likesCount
      viewsCount
      tagList
      category {
        id
        name
      }
      fursuits {
        id
        name
      }
      edition {
        id
        name
        event {
          id
          name
        }
      }
      user {
        id
        slug
        name
        avatar
      }
    }
    users(q: $q, fillWithFollowing: false, offset: 0, limit: 2) {
      id
      slug
      name
      avatar
      mediaCount
    }
  }
`;

export const GET_MEDIUM = gql`
  query Medium($id: ID!) {
    medium(id: $id) {
      id
      slug
      title
      description
      picture
      thumbnail
      width
      height
      exif
      commentsCount
      completion
      fursuitsCount
      likesCount
      liked
      viewsCount
      createdAt
      commentsDisabled
      tagList
      fursuits {
        id
        name
        slug
      }
      category {
        id
        name
      }
      edition {
        id
        name
        event {
          id
          name
        }
      }
      user {
        id
        slug
        name
        avatar
      }
      relatedMedia {
        id
        slug
        title
        description
        picture
        thumbnail
        width
        height
        createdAt
        user {
          id
          slug
          name
        }
      }
    }
  }
`;

export const GET_COMMENTS_BY_MEDIUM = gql`
  query GetCommentsByMedium(
    $mediumId: ID!
    $parentId: ID
    $offset: Int!
    $limit: Int!
  ) {
    commentsByMedium(
      mediumId: $mediumId
      parentId: $parentId
      offset: $offset
      limit: $limit
    ) @connection(key: "commentsByMedium", filter: ["mediumId", "parentId"]) {
      id
      body
      createdAt
      repliesCount
      parentId
      user {
        id
        slug
        name
        avatar
      }
    }
  }
`;

export const GET_LIKES = gql`
  query Likes($mediumId: ID, $offset: Int!, $limit: Int!) {
    likes(mediumId: $mediumId, offset: $offset, limit: $limit)
      @connection(key: "likes", filter: ["mediumID"]) {
      id
      createdAt
      user {
        id
        slug
        name
        avatar
      }
    }
  }
`;
