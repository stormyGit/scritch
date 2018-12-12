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

export const READ_ANNOUNCEMENTS = gql`
  mutation readAnnouncements($input: ReadAnnouncementsInput!) {
    readAnnouncements(input: $input) {
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
        chatEnabled
        slug
        avatar
        banner
        bio
        website
        theme
        mediaCount
        followingCount
        unreadAnnouncementsCount
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
        commentsCount
        likesCount
        liked
        viewsCount
        createdAt
        picture
        completion
        fursuitsCount
        thumbnail
        width
        height
        width
        height
        commentsDisabled
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
  }
`;

export const GET_MEDIA = gql`
  query Media($q: String, $sort: String, $userId: ID, $offset: Int!, $limit: Int!, $fursuitId: ID, $tagging: Boolean) {
    media(q: $q, sort: $sort, userId: $userId, offset: $offset, limit: $limit, fursuitId: $fursuitId, tagging: $tagging) {
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

export const GET_USERS = gql`
  query Users($q: String, $fillWithFollowing: Boolean, $offset: Int!, $limit: Int!) {
    users(q: $q, fillWithFollowing: $fillWithFollowing, offset: $offset, limit: $limit) {
      id
      slug
      name
      avatar
    }
  }
`

export const GET_ANNOUNCEMENTS = gql`
  query Announcements($offset: Int!, $limit: Int!) {
    announcements(offset: $offset, limit: $limit) {
      id
      body
      createdAt
      sender {
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
        ... on Report {
          id
          reportedUserName
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
      picture
      thumbnail
      width
      height
      commentsCount
      completion
      fursuitsCount
      likesCount
      liked
      viewsCount
      createdAt
      commentsDisabled
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
      followed
      following
      mediaCount
      followersCount
      followingCount
      likesCount
      blocked
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

export const GET_LIKES = gql`
  query Likes($mediumId: ID, $offset: Int!, $limit: Int!) {
    likes(mediumId: $mediumId, offset: $offset, limit: $limit) @connection(key: "likes", filter: ["mediumID"]) {
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
        chatEnabled
        slug
        avatar
        banner
        bio
        website
        theme
        tagTutorial
        mediaCount
        followingCount
        unreadAnnouncementsCount
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

export const LOAD_MAKER = gql`
  query Maker($id: ID!) {
    maker(id: $id) {
      id
      name
      slug
      web
      country
      fursuits {
        id
        name
        slug
      }
    }
  }
`;

export const LOAD_MAKERS = gql`
  query Makers($name: String, $country: String, $limit: Int!,$offset: Int!) {
    makers(name: $name, country: $country, limit: $limit, offset: $offset) {
      id
      name
      country
      slug
    }
  }
`;

export const LOAD_CATEGORIES = gql`
  query Categories($name: String, $limit: Int!, $offset: Int!) {
    categories(name: $name, limit: $limit, offset: $offset) {
      id
      name
    }
  }
`;

export const LOAD_EVENTS = gql`
  query Events($name: String, $limit: Int!, $offset: Int!) {
    events(name: $name, limit: $limit, offset: $offset) {
      id
      name
      slug
    }
  }
`;

export const LOAD_EDITIONS = gql`
  query Editions($name: String, $limit: Int!, $offset: Int!, $eventId: ID!) {
    editions(name: $name, limit: $limit, offset: $offset, eventId: $eventId) {
      id
      name
      slug
    }
  }
`;

//
//

export const LOAD_FURSUIT = gql`
  query Fursuit($id: ID!) {
    fursuit(id: $id) {
      id
      name
      slug
      mediaCount
      creationYear
      fursuitLegType {
        name
      }
      fursuitSpecy {
        name
      }
      fursuitStyle {
        name
      }
      makers {
        name
      }
    }
  }
`;

export const LOAD_FURSUITS = gql`
  query Fursuits($name: String, $species: String, $legs: String, $style: String, $exclude: [ID!], $limit: Int!, $offset: Int!) {
    fursuits(name: $name, fursuitSpecy: $species, fursuitLegType: $legs, fursuitStyle: $style, exclude: $exclude, limit: $limit, offset: $offset) {
      id
      name
      creationYear
      slug
    }
  }
`;

export const LOAD_PHOTOGRAPHERS = gql`
  query Photographers($name: String, $country: String) {
    photographers(name: $name, country: $country) {
      id
      name
      country
      slug
    }
  }
`;
