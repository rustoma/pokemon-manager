import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import bcrypt from 'bcrypt';
import { gql } from 'graphql-tag';
import GraphQLJSON from 'graphql-type-json';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { API_ROUTES } from '@/consts/apiRoutes';
import prisma from '@/lib/prisma';

import type { NextRequest } from 'next/server';

const typeDefs = gql`
  scalar JSON

  type Query {
    hello: String
    pokemons(limit: Int = 10, offset: Int = 0): [Pokemon]
  }

  type Mutation {
    signup(email: String!, password: String!): String
    login(email: String!, password: String!): String
  }

  type Pokemon {
    id: Int
    name: String
    pokemonsprites: [PokemonSprite]
  }

  type PokemonSprite {
    id: Int
    sprites: JSON!
  }
`;

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    hello: (_: unknown, __: unknown, context: { user: { email: string } | null }) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }
      return `Hello, ${context.user.email}`;
    },
    pokemons: async (_: unknown, { limit = 10, offset = 0 }: { limit?: number; offset?: number }) => {
      const query = `
        query GetPokemons($limit: Int!, $offset: Int!) {
          pokemon(limit: $limit, offset: $offset) {
            id
            name
            pokemonsprites {
              id
              sprites
            }
          }
        }
      `;

      try {
        const response = await fetch(API_ROUTES.POKEAPI, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { limit, offset },
          }),
        });

        if (!response.ok) {
          throw new Error(`PokeAPI request failed: ${response.statusText}`);
        }

        const result = await response.json();

        if (result.errors) {
          throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        }

        const pokemons = result.data?.pokemon || [];

        return pokemons;
      } catch (error) {
        throw new Error(`Failed to fetch pokemons: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  Mutation: {
    signup: async (_: unknown, { email, password }: { email: string; password: string }) => {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const SALT_ROUNDS = 10;
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });

      const JWT_SECRET = process.env.JWT_SECRET ?? '';

      if (JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    },
    login: async (_: unknown, { email, password }: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('Invalid credentials');
      }

      const JWT_SECRET = process.env.JWT_SECRET ?? '';

      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '1h',
      });

      return token;
    },
  },
};

const context = async (req: NextRequest) => {
  const token = req.headers.get('authorization') ?? '';

  try {
    if (token) {
      const JWT_SECRET = process.env.JWT_SECRET ?? '';

      if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not set');
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      return { user: decoded };
    }
  } catch {
    return { user: null };
  }
  return { user: null };
};

const apolloServer = new ApolloServer<{ user?: { email: string } }>({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, { context });

export { handler as GET, handler as POST };
