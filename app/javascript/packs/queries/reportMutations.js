import gql from "graphql-tag";

export const CREATE_REPORT = gql`
  mutation createReport($input: CreateReportInput!) {
    createReport(input: $input) {
      report {
        id
      }
    }
  }
`;

export const CREATE_COMMENT_REPORT = gql`
  mutation createCommentReport($input: CreateCommentReportInput!) {
    createCommentReport(input: $input) {
      report {
        id
      }
    }
  }
`;

export const CREATE_MEDIUM_REPORT = gql`
  mutation createMediumReport($input: CreateMediumReportInput!) {
    createMediumReport(input: $input) {
      report {
        id
      }
    }
  }
`;

export const CREATE_TECH_REPORT = gql`
  mutation createTechReport($input: CreateTechReportInput!) {
    createTechReport(input: $input) {
      report {
        id
      }
    }
  }
`;

export const CREATE_TAG_REPORT = gql`
  mutation createTagReport($input: CreateTagReportInput!) {
    createTagReport(input: $input) {
      report {
        id
      }
    }
  }
`;
