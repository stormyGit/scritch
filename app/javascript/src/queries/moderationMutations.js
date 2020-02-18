import gql from "graphql-tag";

export const UPDATE_MODERATOR = gql`
  mutation updateModerator($input: UpdateModeratorInput!) {
    updateModerator(input: $input) {
      moderator {
        id
        capabilities
      }
    }
  }
`;

export const CREATE_MODERATOR = gql`
  mutation createModerator($input: CreateModeratorInput!) {
    createModerator(input: $input) {
      moderator {
        name
        telegramId
      }
    }
  }
`;

export const DELETE_MODERATOR = gql`
  mutation deleteModerator($input: DeleteModeratorInput!) {
    deleteModerator(input: $input) {
      moderator {
        id
      }
    }
  }
`;

export const UPDATE_ANNOUNCEMENT = gql`
  mutation updateAnnouncement($input: UpdateAnnouncementInput!) {
    updateAnnouncement(input: $input) {
      announcement {
        id
        title
        body
      }
    }
  }
`;

export const CREATE_ANNOUNCEMENT = gql`
  mutation createAnnouncement($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
      announcement {
        title
        body
      }
    }
  }
`;

export const DELETE_ANNOUNCEMENT = gql`
  mutation deleteAnnouncement($input: DeleteAnnouncementInput!) {
    deleteAnnouncement(input: $input) {
      announcement {
        id
      }
    }
  }
`;

export const REMOVE_SUSPENSION = gql`
  mutation removeSuspension($input: RemoveSuspensionInput!) {
    removeSuspension(input: $input) {
      suspendedUser {
        id
      }
    }
  }
`;

export const ACCEPT_CLAIM = gql`
  mutation acceptClaim($input: AcceptClaimInput!) {
    acceptClaim(input: $input) {
      claim {
        id
      }
    }
  }
`;

export const REJECT_CLAIM = gql`
  mutation rejectClaim($input: RejectClaimInput!) {
    rejectClaim(input: $input) {
      claim {
        id
      }
    }
  }
`;

export const ACCEPT_MAKER_CLAIM = gql`
  mutation acceptMakerClaim($input: AcceptMakerClaimInput!) {
    acceptMakerClaim(input: $input) {
      makerClaim {
        id
      }
    }
  }
`;

export const REJECT_MAKER_CLAIM = gql`
  mutation rejectMakerClaim($input: RejectMakerClaimInput!) {
    rejectMakerClaim(input: $input) {
      makerClaim {
        id
      }
    }
  }
`;

export const REJECT_FURSUIT_REQUEST = gql`
  mutation rejectFursuitRequest($input: RejectFursuitRequestInput!) {
    rejectFursuitRequest(input: $input) {
      fursuitRequest {
        id
      }
    }
  }
`;

export const REJECT_MAKER_REQUEST = gql`
  mutation rejectMakerRequest($input: RejectMakerRequestInput!) {
    rejectMakerRequest(input: $input) {
      makerRequest {
        id
      }
    }
  }
`;

export const REJECT_EVENT_REQUEST = gql`
  mutation rejectEventRequest($input: RejectEventRequestInput!) {
    rejectEventRequest(input: $input) {
      eventRequest {
        id
      }
    }
  }
`;

export const ACCEPT_SERIOUS_VIOLATION = gql`
  mutation acceptSeriousViolation($input: AcceptSeriousViolationInput!) {
    acceptSeriousViolation(input: $input) {
      errors
    }
  }
`;

export const ACCEPT_MINOR_VIOLATION = gql`
  mutation acceptMinorViolation($input: AcceptMinorViolationInput!) {
    acceptMinorViolation(input: $input) {
      errors
    }
  }
`;

export const REJECT_NOT_WORTH_REPORTING = gql`
  mutation rejectNotWorthReporting($input: RejectNotWorthReportingInput!) {
    rejectNotWorthReporting(input: $input) {
      errors
    }
  }
`;

export const DELETE_TICKET = gql`
  mutation deleteTicket($input: DeleteTicketInput!) {
    deleteTicket(input: $input) {
      errors
    }
  }
`;
