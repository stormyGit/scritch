import gql from "graphql-tag";

export const LOAD_MAKERS_SELECT = gql`
  query makersSelect {
    makersSelect {
      id
      name
    }
  }
`;

export const LOAD_COMMISSION_STATUSES = gql`
  query commissionStatuses {
    commissionStatuses {
      id
      name
    }
  }
`;

export const LOAD_MAKERS = gql`
  query Makers(
    $name: String
    $country: String
    $region: String
    $commissionStatus: ID
    $limit: Int!
    $offset: Int!
    $isModerator: Boolean
  ) {
    makers(
      name: $name
      country: $country
      region: $region
      commissionStatus: $commissionStatus
      isModerator: $isModerator
      limit: $limit
      offset: $offset
    ) {
      id
      name
      avatar
      country
      region
      visible
      slug
    }
  }
`;

export const LOAD_MAKER = gql`
  query Maker($id: ID!, $sort: String!, $isModerator: Boolean) {
    maker(id: $id, sort: $sort, isModerator: $isModerator) {
      id
      name
      bio
      slug
      web
      country
      region
      visible
      avatar
      claimed
      claimRejected
      commissionStatus {
        id
        name
      }
      followed
      possessed
      fursuitsNumber
      user {
        id
        name
      }
      fursuits {
        id
        name
        avatar
        slug
        creationYear
        species {
          id
          name
        }
      }
    }
  }
`;

export const LOAD_MAKER_DATE = gql`
  query Maker($id: ID!, $sort: String!) {
    maker(id: $id, sort: $sort) {
      id
      name
      slug
      web
      country
      bio
      visible
      region
      avatar
      claimed
      claimRejected
      commissionStatus {
        id
        name
      }
      followed
      possessed
      fursuitsNumber
      user {
        id
        name
      }
      fursuitsByDate {
        id
        name
        avatar
        slug
        creationYear
        species {
          id
          name
        }
      }
    }
  }
`;

export const LOAD_MAKER_COUNTRIES = gql`
  query makersCountry {
    makersCountry
  }
`;

export const LOAD_MAKER_REGIONS = gql`
  query makersRegion($country: String!) {
    makersRegion(country: $country)
  }
`;
