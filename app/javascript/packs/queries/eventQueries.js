import gql from "graphql-tag";

export const LOAD_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      name
      slug
      editions {
        id
        year
        name
      }
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

export const LOAD_EVENT_COUNTRIES = gql`
  query events {
    events {
      editions {
        country
      }
    }
  }
`;
