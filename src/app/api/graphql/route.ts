import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import axios from 'axios';
import bcrypt from 'bcrypt';
import { print } from 'graphql';
import { gql } from 'graphql-tag';
import GraphQLJSON from 'graphql-type-json';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { API_ROUTES } from '@/consts/apiRoutes';
import prisma from '@/lib/prisma';
import { customPokemonCreateSchema, customPokemonUpdateSchema } from '@/schemas/customPokemon';

import type { NextRequest } from 'next/server';

const typeDefs = gql`
  scalar JSON

  input pokemon_bool_exp {
    id: Int_comparison_exp
  }

  input Int_comparison_exp {
    _eq: Int
    _neq: Int
    _gt: Int
    _gte: Int
    _lt: Int
    _lte: Int
  }

  input String_comparison_exp {
    _ilike: String
  }

  input PokemonOrder {
    name: SortingOrder
    height: SortingOrder
    weight: SortingOrder
  }

  enum SortingOrder {
    asc
    desc
  }

  input PokemonFilter {
    name: String_comparison_exp
    minHeight: Int
    maxHeight: Int
    minWeight: Int
    maxWeight: Int
  }

  type CustomPokemon {
    id: Int
    name: String
    height: Int
    weight: Int
    imagePath: String
  }

  type Query {
    hello: String
    pokemons(limit: Int = 10, offset: Int = 0, order_by: PokemonOrder = { name: asc }, filter: PokemonFilter): [Pokemon]
    pokemon(where: pokemon_bool_exp!): Pokemon
    customPokemons: [CustomPokemon!]!
    customPokemon(id: Int!): CustomPokemon
  }

  type Mutation {
    signup(email: String!, password: String!): String
    login(email: String!, password: String!): String
    createCustomPokemon(name: String!, height: Int!, weight: Int!, imagePath: String!): CustomPokemon
    updateCustomPokemon(id: Int!, name: String!, height: Int!, weight: Int!, imagePath: String!): CustomPokemon
    deleteCustomPokemon(id: Int!): CustomPokemon
  }

  type Pokemon {
    id: Int
    name: String
    height: Int
    weight: Int
    pokemonsprites: [PokemonSprite]
    pokemongameindices: [PokemonGameIndex]
    pokemonabilities: [PokemonAbility]
    pokemontypes: [PokemonType]
  }

  type PokemonSprite {
    id: Int
    sprites: JSON!
  }

  type PokemonGameIndex {
    version: Version
  }

  type PokemonAbility {
    ability: Ability
  }
  type Ability {
    abilitynames: [AbilityName]
  }
  type AbilityName {
    id: Int
    name: String
  }
  type Version {
    name: String
    id: Int
  }
  type PokemonType {
    type: Type
  }

  type Type {
    id: Int
    name: String
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
    customPokemons: async () => {
      const items = await prisma.customPokemon.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return items;
    },
    customPokemon: async (_: unknown, { id }: { id: number }) => {
      const item = await prisma.customPokemon.findUnique({ where: { id } });
      return item;
    },
    pokemon: async (_: unknown, { where }: { where: { id: { _eq: number } } }) => {
      const query = gql`
        query GetPokemon($where: pokemon_bool_exp!, $limit: Int!) {
          pokemon(where: $where, limit: $limit) {
            id
            name
            height
            weight
            pokemongameindices {
              version {
                name
                id
              }
            }
            pokemonsprites {
              id
              sprites
            }
            pokemontypes {
              type {
                id
                name
              }
            }
            pokemonabilities {
              ability {
                abilitynames {
                  id
                  name
                  language {
                    name
                    id
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await axios.post(
          API_ROUTES.POKEAPI,
          {
            query: print(query),
            variables: { where, limit: 1 },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const result = response.data;

        if (result.errors) {
          throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        }

        return result.data?.pokemon?.[0] ?? null;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Failed to fetch pokemon: ${error.response?.statusText || error.message}`);
        }
        throw new Error(`Failed to fetch pokemon: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
    pokemons: async (
      _: unknown,
      {
        limit = 10,
        offset = 0,
        order_by,
        filter,
      }: {
        limit?: number;
        offset?: number;
        order_by?: { name?: 'asc' | 'desc'; height?: 'asc' | 'desc'; weight?: 'asc' | 'desc' };
        filter?: { name?: string; minHeight?: number; maxHeight?: number; minWeight?: number; maxWeight?: number };
      },
    ) => {
      const query = gql`
        query GetPokemons($limit: Int!, $offset: Int!, $order_by: [pokemon_order_by!], $where: pokemon_bool_exp) {
          pokemon(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
            id
            name
            height
            weight
            pokemonsprites {
              id
              sprites
            }
            pokemontypes {
              type {
                id
                name
              }
            }
          }
        }
      `;

      try {
        const remoteOrderBy = order_by ? Object.entries(order_by).map(([key, value]) => ({ [key]: value })) : undefined;
        const remoteWhere: Record<string, unknown> = {};
        if (filter?.name) {
          remoteWhere.name = { _ilike: `%${filter.name}%` };
        }
        if (filter?.minHeight != null || filter?.maxHeight != null) {
          const height: Record<string, number> = {};
          if (filter.minHeight != null) height._gte = filter.minHeight;
          if (filter.maxHeight != null) height._lte = filter.maxHeight;
          remoteWhere.height = height;
        }
        if (filter?.minWeight != null || filter?.maxWeight != null) {
          const weight: Record<string, number> = {};
          if (filter.minWeight != null) weight._gte = filter.minWeight;
          if (filter.maxWeight != null) weight._lte = filter.maxWeight;
          remoteWhere.weight = weight;
        }
        const where = Object.keys(remoteWhere).length > 0 ? remoteWhere : undefined;
        const response = await axios.post(
          API_ROUTES.POKEAPI,
          {
            query: print(query),
            variables: { limit, offset, order_by: remoteOrderBy, where },
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        const result = response.data;

        if (result.errors) {
          throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        }

        const pokemons = result.data?.pokemon || [];

        return pokemons;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(`Failed to fetch pokemons: ${error.response?.statusText || error.message}`);
        }
        throw new Error(`Failed to fetch pokemons: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
  Mutation: {
    createCustomPokemon: async (
      _: unknown,
      { name, height, weight, imagePath }: { name: string; height: number; weight: number; imagePath: string },
    ) => {
      const parsed = customPokemonCreateSchema.parse({ name, height, weight, imagePath });
      const customPokemon = await prisma.customPokemon.create({
        data: parsed,
      });
      return customPokemon;
    },
    updateCustomPokemon: async (
      _: unknown,
      {
        id,
        name,
        height,
        weight,
        imagePath,
      }: { id: number; name: string; height: number; weight: number; imagePath: string },
    ) => {
      const parsed = customPokemonUpdateSchema.parse({ id, name, height, weight, imagePath });
      const customPokemon = await prisma.customPokemon.update({
        where: { id },
        data: { name: parsed.name, height: parsed.height, weight: parsed.weight, imagePath: parsed.imagePath },
      });
      return customPokemon;
    },
    deleteCustomPokemon: async (_: unknown, { id }: { id: number }) => {
      const customPokemon = await prisma.customPokemon.delete({
        where: { id },
      });
      return customPokemon;
    },
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

      if (!JWT_SECRET) {
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
