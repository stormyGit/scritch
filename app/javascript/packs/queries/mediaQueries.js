import gql from "graphql-tag";

export const GET_MEDIA = gql`
  query Media(
    $q: String
    $sort: String
    $filter: String
    $userId: ID
    $uuid: ID
    $offset: Int!
    $limit: Int!
    $fursuitId: ID
    $categoryId: ID
    $subEventId: ID
    $fursuits: [ID]
    $gifs: Boolean
    $tagging: Boolean
    $faves: Boolean
    $editionId: ID
    $eventId: ID
  ) {
    media(
      q: $q
      sort: $sort
      filter: $filter
      userId: $userId
      uuid: $uuid
      offset: $offset
      limit: $limit
      fursuitId: $fursuitId
      categoryId: $categoryId
      subEventId: $subEventId
      fursuits: $fursuits
      gifs: $gifs
      tagging: $tagging
      faves: $faves
      editionId: $editionId
      eventId: $eventId
    ) {
      id
      slug
      title
      description
      picture
      thumbnail
      width
      exif
      height
      completion
      fursuitsCount
      createdAt
      commentsCount
      likesCount
      favesCount
      viewsCount
      tagList
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
      subEvent {
        id
        name
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

export const GET_FRONT_MEDIA = gql`
  query FrontMedia($filter: String!, $limit: Int!) {
    frontMedia(filter: $filter, limit: $limit) {
      id
      slug
      title
      thumbnail
      completion
      createdAt
      commentsCount
      likesCount
      favesCount
      viewsCount
    }
  }
`;

export const GET_MEDIA_WITH_FURSUITS = gql`
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
    $faves: Boolean
    $editionId: ID
    $eventId: ID
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
      faves: $faves
      editionId: $editionId
      eventId: $eventId
    ) {
      id
      slug
      title
      description
      picture
      thumbnail
      width
      exif
      height
      completion
      fursuitsCount
      createdAt
      commentsCount
      likesCount
      favesCount
      viewsCount
      tagList
      category {
        id
        name
      }
      fursuits {
        id
        name
        avatar
      }
      edition {
        id
        name
        event {
          id
          name
        }
      }
      subEvent {
        id
        name
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
  query Medium($id: ID!, $tagging: Boolean) {
    medium(id: $id, tagging: $tagging) {
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
      photographerSlug
      photographerString
      liked
      tagger
      tagLocked
      favesCount
      faved
      viewsCount
      createdAt
      resized
      commentsDisabled
      tagList
      fursuits {
        id
        name
        avatar
        isHybrid
        species {
          id
          name
        }
        slug
      }
      subEvent {
        id
        name
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
          slug
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

export const GET_FAVES = gql`
  query Faves($mediumId: ID, $offset: Int!, $limit: Int!) {
    faves(mediumId: $mediumId, offset: $offset, limit: $limit)
      @connection(key: "faves", filter: ["mediumID"]) {
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
