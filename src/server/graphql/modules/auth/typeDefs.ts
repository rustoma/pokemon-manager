import { gql } from 'graphql-tag';

const typeDefs = gql`
  extend type Query {
    hello: String
  }

  type Mutation {
    signup(email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`;

export default typeDefs;
