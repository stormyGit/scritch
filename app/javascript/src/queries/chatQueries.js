import gql from "graphql-tag";

export const GET_CHATS = gql`
  query Chats($offset: Int!, $limit: Int!) {
    chats(offset: $offset, limit: $limit)
      @connection(key: "messages", filter: ["chatId"])
      @connection(key: "chats") {
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
  query Messages($caseId: ID, $caseType: String, $chatId: ID, $offset: Int!, $limit: Int!) {
    messages(caseId: $caseId, caseType: $caseType, chatId: $chatId, offset: $offset, limit: $limit)
      @connection(key: "messages", filter: ["chatId"]) {
      id
      body
      senderId
      createdAt
    }
  }
`;

export const GET_UNREAD_CHATS_COUNT = gql`
  query UnreadChatsCount {
    unreadChatsCount
  }
`;
