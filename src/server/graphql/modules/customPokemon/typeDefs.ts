import { gql } from 'graphql-tag';

const typeDefs = gql`
  type CustomPokemon {
    id: Int
    name: String
    height: Int
    weight: Int
    imagePath: String
  }

  extend type Query {
    customPokemons: [CustomPokemon!]!
    customPokemon(id: Int!): CustomPokemon
  }

  extend type Mutation {
    createCustomPokemon(name: String!, height: Int!, weight: Int!, imagePath: String!): CustomPokemon
    updateCustomPokemon(id: Int!, name: String!, height: Int!, weight: Int!, imagePath: String!): CustomPokemon
    deleteCustomPokemon(id: Int!): CustomPokemon
  }
`;

export default typeDefs;
