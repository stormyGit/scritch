import gql from "graphql-tag";

export const LOAD_FURSUITS = gql`
  query Fursuits(
    $name: String
    $speciesIds: [ID]
    $hybridSearch: Boolean
    $uuid: ID
    $filter: String
    $fursuitLegType: ID
    $fursuitStyle: ID
    $fursuitBuild: ID
    $fursuitPadding: ID
    $fursuitFingers: ID
    $fursuitGender: ID
    $fursuitColor: String
    $fursuitEyes: String
    $exclude: [ID!]
    $maker: ID
    $userId: ID
    $limit: Int!
    $offset: Int!
  ) {
    fursuits(
      name: $name
      speciesIds: $speciesIds
      hybridSearch: $hybridSearch
      uuid: $uuid
      filter: $filter
      fursuitLegType: $fursuitLegType
      fursuitStyle: $fursuitStyle
      fursuitBuild: $fursuitBuild
      fursuitPadding: $fursuitPadding
      fursuitFingers: $fursuitFingers
      fursuitGender: $fursuitGender
      fursuitColor: $fursuitColor
      fursuitEyes: $fursuitEyes
      maker: $maker
      exclude: $exclude
      userId: $userId
      limit: $limit
      offset: $offset
    ) {
      id
      name
      creationYear
      avatar
      slug
      makers {
        name
      }
      isHybrid
      species {
        id
        name
      }
    }
  }
`;

export const LOAD_FURSUIT = gql`
  query Fursuit($id: ID!) {
    fursuit(id: $id) {
      id
      name
      slug
      mediaCount
      followersCount
      likesCount
      favesCount
      claimed
      claimRejected
      possessed
      followed
      bio
      avatar
      creationYear
      fursuitLegType {
        id
        name
        picture
      }
      species {
        id
        name
      }
      isHybrid
      fursuitBuild {
        id
        name
        picture
      }
      fursuitGender {
        id
        name
        picture
      }
      fursuitPadding {
        id
        name
        picture
      }
      fursuitFinger {
        id
        name
      }
      fursuitStyle {
        id
        name
        picture
      }
      baseColor
      eyesColor
      makers {
        id
        name
        slug
      }
      users {
        id
        public
        slug
        name
      }
    }
  }
`;

export const LOAD_LEG_TYPES = gql`
  query fursuitLegTypes {
    fursuitLegTypes {
      id
      name
    }
  }
`;

export const LOAD_STYLES = gql`
  query fursuitStyles {
    fursuitStyles {
      id
      name
    }
  }
`;

export const LOAD_SPECIES = gql`
  query species {
    species {
      id
      name
    }
  }
`;

export const LOAD_PADDINGS = gql`
  query fursuitPaddings {
    fursuitPaddings {
      id
      name
    }
  }
`;

export const LOAD_FINGERS = gql`
  query fursuitFingers {
    fursuitFingers {
      id
      name
    }
  }
`;

export const LOAD_BUILDS = gql`
  query fursuitBuilds {
    fursuitBuilds {
      id
      name
    }
  }
`;

export const LOAD_GENDERS = gql`
  query fursuitGenders {
    fursuitGenders {
      id
      name
    }
  }
`;
