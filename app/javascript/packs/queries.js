import gql from "graphql-tag";

export const GET_THEME = gql`
  query getTheme @client {
    theme
  }
`;

export const CREATE_SESSION = gql`
  mutation createSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      session {
        id
        user {
          id
          name
          slug
          avatar
          banner
          bio
          website
          theme
        }
      }
    }
  }
`;

export const READ_ACTIVITIES = gql`
  mutation readActivities($input: ReadActivitiesInput!) {
    readActivities(input: $input) {
      user {
        id
      }
    }
  }
`;

export const CLEAR_ACTIVITIES = gql`
  mutation clearActivities($input: ClearActivitiesInput!) {
    clearActivities(input: $input) {
      user {
        id
      }
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation deleteSession($input: DeleteSessionInput!) {
    deleteSession(input: $input) {
      session {
        id
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const DELETE_MEDIUM = gql`
  mutation deleteMedium($input: DeleteMediumInput!) {
    deleteMedium(input: $input) {
      medium {
        id
      }
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($input: DeleteCommentInput!) {
    deleteComment(input: $input) {
      comment {
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
        slug
        avatar
        banner
        bio
        website
        theme
        mediaCount
      }
    }
  }
`;

export const UPDATE_MEDIUM = gql`
  mutation updateMedium($input: UpdateMediumInput!) {
    updateMedium(input: $input) {
      medium {
        id
        slug
        title
        description
        key
        duration
        commentsCount
        likesCount
        liked
        viewsCount
        createdAt
        thumbnailKey
        commentsDisabled
        tagList
        user {
          id
          slug
          name
          avatar
        }
        comments {
          id
          body
          createdAt
          user {
            id
            slug
            name
            avatar
          }
        }
        relatedMedia {
          id
          slug
          title
          description
          thumbnailKey
          previewKey
          duration
          createdAt
          user {
            id
            slug
            name
          }
        }
      }
    }
  }
`;

export const GET_MEDIA = gql`
  query Media($q: String, $sort: String, $userId: ID, $page: Int!, $per: Int!) {
    media(q: $q, sort: $sort, userId: $userId, page: $page, per: $per) {
      id
      slug
      title
      description
      previewKey
      thumbnailKey
      createdAt
      duration
      commentsCount
      likesCount
      viewsCount
      tagList
      user {
        id
        slug
        name
        avatar
      }
    }
  }
`;

export const GET_ACTIVITIES = gql`
  query Activities($page: Int!, $per: Int!) {
    activities(page: $page, per: $per) @connection(key: "activities") {
      id
      key
      createdAt
      owner {
        id
        slug
        name
        avatar
      }
      trackable {
        ... on Like {
          id
          medium {
            title
          }
        }
        ... on Medium {
          id
          title
        }
        ... on Comment {
          id
          body
          medium {
            title
          }
        }
        ... on Follow {
          id
        }
      }
    }
  }
`;

export const GET_LIKES_BY_USER = gql`
query GetLikesByUser($userId: ID!, $page: Int!, $per: Int!) {
  likesByUser(userId: $userId, page: $page, per: $per) {
    id
    medium {
      id
      slug
      title
      description
      previewKey
      thumbnailKey
      createdAt
      duration
      commentsCount
      likesCount
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
query GetFollowersByUser($userId: ID!, $page: Int!, $per: Int!) {
  followersByUser(userId: $userId, page: $page, per: $per) {
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
query GetFollowingsByUser($userId: ID!, $page: Int!, $per: Int!) {
  followingsByUser(userId: $userId, page: $page, per: $per) {
    id
    slug
    name
    avatar
    bio
    mediaCount
  }
}
`;

export const GET_COMMENTS_BY_MEDIUM = gql`
query GetCommentsByMedium($mediumId: ID!, $parentId: ID, $page: Int!, $per: Int!) {
  commentsByMedium(mediumId: $mediumId, parentId: $parentId, page: $page, per: $per) {
    id
    body
    createdAt
    repliesCount
    user {
      id
      slug
      name
      avatar
    }
  }
}
`;

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      comment {
        id
        body
        createdAt
        repliesCount
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

export const GET_MEDIUM = gql`
  query Medium($id: ID!) {
    medium(id: $id) {
      id
      slug
      title
      description
      key
      duration
      commentsCount
      likesCount
      liked
      viewsCount
      createdAt
      thumbnailKey
      commentsDisabled
      tagList
      user {
        id
        slug
        name
        avatar
      }
      comments {
        id
        body
        createdAt
        user {
          id
          slug
          name
          avatar
        }
      }
      relatedMedia {
        id
        slug
        title
        description
        thumbnailKey
        previewKey
        duration
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

export const GET_USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      slug
      name
      avatar
      banner
      bio
      website
      followed
      following
      mediaCount
      followersCount
      followingCount
      likesCount
    }
  }
`;

export const GET_SESSION = gql`
  query Session {
    session {
      id
      user {
        id
        name
        slug
        avatar
        banner
        bio
        website
        theme
        mediaCount
      }
    }
  }
`;

export const GET_UNREAD_ACTIVITY_COUNT = gql`
  query UnreadActivityCount {
    unreadActivityCount
  }
`;

export const CREATE_MEDIUM = gql`
  mutation createMedium($input: CreateMediumInput!) {
    createMedium(input: $input) {
      medium {
        id
        slug
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

export const CREATE_LIKE = gql`
  mutation createLike($input: CreateLikeInput!) {
    createLike(input: $input) {
      like {
        id
      }
    }
  }
`;

export const DELETE_LIKE = gql`
  mutation deleteLike($input: DeleteLikeInput!) {
    deleteLike(input: $input) {
      like {
        id
      }
    }
  }
`;
