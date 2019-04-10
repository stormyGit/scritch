import gql from "graphql-tag";

export const LOAD_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      name
      web
      slug
      avatar
      country
      editions {
        id
        year
        name
      }
    }
  }
`;

export const LOAD_EVENTS = gql`
  query Events($name: String, $country: String, $limit: Int!, $offset: Int!) {
    events(name: $name, country: $country, limit: $limit, offset: $offset) {
      id
      name
      country
      avatar
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

export const LOAD_EDITION = gql`
  query Edition($id: ID!) {
    edition(id: $id) {
      id
      name
      slug
      venue
      theme
      attendance
      charity
      city
      country
      startDate
      endDate
    }
  }
`;

export const LOAD_SUB_EVENTS = gql`
  query SubEvents($name: String, $limit: Int!, $offset: Int!) {
    subEvents(name: $name, limit: $limit, offset: $offset) {
      id
      name
    }
  }
`;

export const LOAD_EVENTS_COUNTRIES = gql`
  query eventsCountry {
    eventsCountry
  }
`;
