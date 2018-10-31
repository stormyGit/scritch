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
          public
          slug
          avatar
          banner
          bio
          website
          theme
          mediaCount
          followingCount
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

export const READ_CHAT = gql`
  mutation readChat($input: ReadChatInput!) {
    readChat(input: $input) {
      chat {
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
        public
        slug
        avatar
        banner
        bio
        website
        theme
        mediaCount
        followingCount
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
        publishedAt
        thumbnailKey
        commentsDisabled
        tagList
        visibility
        restriction
        user {
          id
          slug
          public
          name
          avatar
        }
        relatedMedia {
          id
          slug
          title
          description
          thumbnailKey
          previewKey
          duration
          publishedAt
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
  query Media($q: String, $sort: String, $userId: ID, $offset: Int!, $limit: Int!) {
    media(q: $q, sort: $sort, userId: $userId, offset: $offset, limit: $limit) {
      id
      slug
      title
      description
      previewKey
      thumbnailKey
      publishedAt
      duration
      commentsCount
      likesCount
      viewsCount
      tagList
      visibility
      restriction
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
  query Activities($offset: Int!, $limit: Int!) {
    activities(offset: $offset, limit: $limit) @connection(key: "activities") {
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
query GetLikesByUser($userId: ID!, $offset: Int!, $limit: Int!) {
  likesByUser(userId: $userId, offset: $offset, limit: $limit) {
    id
    medium {
      id
      slug
      title
      description
      previewKey
      thumbnailKey
      publishedAt
      duration
      commentsCount
      likesCount
      viewsCount
      liked
      tagList
      visibility
      restriction
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
  followersByUser(userId: $userId, offset: $offset, limit: $limit) @connection(key: "followersByUser", filter: ["userId"]) {
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
  followingsByUser(userId: $userId, offset: $offset, limit: $limit) @connection(key: "followingsByUser", filter: ["userId"]) {
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
query GetCommentsByMedium($mediumId: ID!, $parentId: ID, $offset: Int!, $limit: Int!) {
  commentsByMedium(mediumId: $mediumId, parentId: $parentId, offset: $offset, limit: $limit) @connection(key: "commentsByMedium", filter: ["mediumId", "parentId"]) {
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

export const CREATE_COMMENT = gql`
  mutation createComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      comment {
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
      publishedAt
      thumbnailKey
      commentsDisabled
      tagList
      visibility
      restriction
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
        thumbnailKey
        previewKey
        duration
        publishedAt
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
      public
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

export const GET_CHATS = gql`
  query Chats($offset: Int!, $limit: Int!) {
    chats(offset: $offset, limit: $limit) @connection(key: "messages", filter: ["chatId"]) @connection(key: "chats") {
      id
      isUnread
      lastMessage {
        id
        senderId
        body
        createdAt
      }
      contact {
        id
        slug
        name
        avatar
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query Messages($chatId: ID, $offset: Int!, $limit: Int!) {
    messages(chatId: $chatId, offset: $offset, limit: $limit) @connection(key: "messages", filter: ["chatId"]) {
      id
      body
      senderId
      createdAt
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation createMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      message {
        id
        body
        senderId
        createdAt
      }
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
        public
        slug
        avatar
        banner
        bio
        website
        theme
        mediaCount
        followingCount
      }
    }
  }
`;

export const GET_UNREAD_ACTIVITY_COUNT = gql`
  query UnreadActivityCount {
    unreadActivityCount
  }
`;

export const GET_UNREAD_CHATS_COUNT = gql`
  query UnreadChatsCount {
    unreadChatsCount
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

export const CREATE_REPORT = gql`
  mutation createReport($input: CreateReportInput!) {
    createReport(input: $input) {
      report {
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
