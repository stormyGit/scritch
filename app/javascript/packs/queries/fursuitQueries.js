import gql from "graphql-tag";

export const LOAD_FURSUITS = gql`
  query Fursuits(
    $name: String
    $speciesIds: [ID]
    $hybridSearch: Boolean
    $fursuitLegType: ID
    $fursuitStyle: ID
    $fursuitBuild: ID
    $fursuitPadding: ID
    $fursuitFingers: ID
    $fursuitGenders: ID
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
      fursuitLegType: $fursuitLegType
      fursuitStyle: $fursuitStyle
      fursuitBuild: $fursuitBuild
      fursuitPadding: $fursuitPadding
      fursuitFingers: $fursuitFingers
      fursuitGenders: $fursuitGenders
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
      possessed
      followed
      avatar
      creationYear
      fursuitLegType {
        id
        name
      }
      species {
        id
        name
      }
      isHybrid
      fursuitBuild {
        id
        name
      }
      fursuitGender {
        id
        name
      }
      fursuitPadding {
        id
        name
      }
      fursuitFinger {
        id
        name
      }
      fursuitStyle {
        id
        name
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
