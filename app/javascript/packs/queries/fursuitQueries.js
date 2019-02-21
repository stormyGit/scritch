import gql from "graphql-tag";

export const LOAD_FURSUITS = gql`
  query Fursuits(
    $name: String
    $fursuitSpecy: ID
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
      slug
      makers {
        name
      }
      fursuitSpecy {
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
      creationYear
      fursuitLegType {
        name
      }
      fursuitSpecy {
        name
      }
      fursuitStyle {
        name
      }
      makers {
        name
      }
      media {
        id
        slug
        title
        description
        picture
        thumbnail
        width
        height
        completion
        createdAt
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
