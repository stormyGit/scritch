import gql from "graphql-tag";

export const LOAD_FURSUITS = gql`
  query Fursuits(
    $name: String
    $fursuitSpecy: ID
    $hybridSpecy: [String]
    $fursuitLegType: ID
    $fursuitStyle: ID
    $fursuitBuild: ID
    $fursuitPadding: ID
    $fursuitFingers: ID
    $fursuitColor: String
    $fursuitEyes: String
    $exclude: [ID!]
    $maker: ID
    $limit: Int!
    $offset: Int!
  ) {
    fursuits(
      name: $name
      fursuitSpecy: $fursuitSpecy
      hybridSpecy: $hybridSpecy
      fursuitLegType: $fursuitLegType
      fursuitStyle: $fursuitStyle
      fursuitBuild: $fursuitBuild
      fursuitPadding: $fursuitPadding
      fursuitFingers: $fursuitFingers
      fursuitColor: $fursuitColor
      fursuitEyes: $fursuitEyes
      maker: $maker
      exclude: $exclude
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
      hybridSpecies {
        id
        name
      }
      fursuitSpecy {
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
      fursuitSpecy {
        id
        name
      }
      isHybrid
      hybridSpecies {
        id
        name
      }
      fursuitBuild {
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
  query fursuitSpecies {
    fursuitSpecies {
      id
      name
    }
  }
`;

export const LOAD_HYBRID_SPECIES = gql`
  query hybridSpecies($fursuitSpecies: [String]!) {
    hybridSpecies(fursuitSpecies: $fursuitSpecies) {
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
