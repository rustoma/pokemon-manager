import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { print } from 'graphql';
import { gql } from 'graphql-tag';
import GraphQLJSON from 'graphql-type-json';

import { buildContext } from '@/server/graphql/context';
import authResolvers from '@/server/graphql/modules/auth/resolvers';
import authTypeDefs from '@/server/graphql/modules/auth/typeDefs';
import customPokemonResolvers from '@/server/graphql/modules/customPokemon/resolvers';
import customPokemonTypeDefs from '@/server/graphql/modules/customPokemon/typeDefs';
import pokemonResolvers from '@/server/graphql/modules/pokemon/resolvers';
import pokemonTypeDefs from '@/server/graphql/modules/pokemon/typeDefs';
import sharedTypeDefs from '@/server/graphql/modules/shared/typeDefs';

import type { NextRequest } from 'next/server';

const typeDefs = gql`
  ${print(pokemonTypeDefs)}
  ${print(authTypeDefs)}
  ${print(customPokemonTypeDefs)}
  ${print(sharedTypeDefs)}
`;

// Shallow-merge resolvers per module
const { Query: pokemonQuery } = pokemonResolvers as { Query: Record<string, unknown> };
const { Query: authQuery, Mutation: authMutation } = authResolvers as {
  Query: Record<string, unknown>;
  Mutation: Record<string, unknown>;
};
const { Query: customQuery, Mutation: customMutation } = customPokemonResolvers as {
  Query: Record<string, unknown>;
  Mutation: Record<string, unknown>;
};

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    ...pokemonQuery,
    ...authQuery,
    ...customQuery,
  },
  Mutation: {
    ...authMutation,
    ...customMutation,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: buildContext,
});
