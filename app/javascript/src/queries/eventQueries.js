import gql from "graphql-tag";

export const LOAD_EVENT = gql`
  query Event($id: ID!) {
    event(id: $id) {
      id
      name
      web
      slug
      avatar
      status
      country
      editions {
        id
        name
        slug
        venue
        theme
        attendance
        charity
        kind
        year
        guestOfHonours
        city
        country
        startDate
        endDate
      }
    }
  }
`;

export const LOAD_EVENTS = gql`
  query Events($name: String, $country: String, $status: String, $limit: Int!, $offset: Int!) {
    events(name: $name, country: $country, status: $status, limit: $limit, offset: $offset) {
      id
      name
      country
      status
      avatar
      slug
    }
  }
`;

export const LOAD_EVENTS_SELECT = gql`
  query Events($limit: Int!, $offset: Int!) {
    events(limit: $limit, offset: $offset) {
      id
      name
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
      guestOfHonours
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

export const LOAD_EVENTS_STATUSES = gql`
  query eventsStatuses {
    eventsStatuses
  }
`;
