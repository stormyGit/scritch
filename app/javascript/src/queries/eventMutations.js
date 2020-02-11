import gql from "graphql-tag";

export const UPDATE_EVENT = gql`
  mutation updateEvent($input: UpdateEventInput!) {
    updateEvent(input: $input) {
      event {
        id
        name
        web
        country
      }
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation deleteEvent($input: DeleteEventInput!) {
    deleteEvent(input: $input) {
      event {
        id
      }
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation createEvent($input: CreateEventInput!) {
    createEvent(input: $input) {
      event {
        id
      }
    }
  }
`;

export const UPDATE_EDITION = gql`
  mutation updateEdition($input: UpdateEditionInput!) {
    updateEdition(input: $input) {
      edition {
        id
        name
        web
        country
      }
    }
  }
`;

export const DELETE_EDITION = gql`
  mutation deleteEdition($input: DeleteEditionInput!) {
    deleteEdition(input: $input) {
      edition {
        id
      }
    }
  }
`;

export const CREATE_EDITION = gql`
  mutation createEdition($input: CreateEditionInput!) {
    createEdition(input: $input) {
      edition {
        id
      }
    }
  }
`;
