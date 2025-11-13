import axios from 'axios';
import { GraphQLError, print } from 'graphql';

import { API_ROUTES } from '@/consts/apiRoutes';
import { GetPokemon, GetPokemons } from '@/server/graphql/modules/pokemon/remote/queries';

const resolvers = {
  Query: {
    pokemon: async (_: unknown, { where }: { where: { id: { _eq: number } } }) => {
      try {
        const response = await axios.post(
          API_ROUTES.POKEAPI,
          {
            query: print(GetPokemon),
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
          throw new GraphQLError(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        }

        return result.data?.pokemon?.[0] ?? null;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new GraphQLError(`Failed to fetch pokemon: ${error.response?.statusText || error.message}`);
        }
        throw new GraphQLError(`Failed to fetch pokemon: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
            query: print(GetPokemons),
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
          throw new GraphQLError(`GraphQL errors: ${JSON.stringify(result.errors)}`);
        }

        const pokemons = result.data?.pokemon || [];

        return pokemons;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new GraphQLError(`Failed to fetch pokemons: ${error.response?.statusText || error.message}`);
        }
        throw new GraphQLError(`Failed to fetch pokemons: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },
  },
};

export default resolvers;
