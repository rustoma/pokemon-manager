import gql from 'graphql-tag';

import client from '@/lib/apolloClient';
import { HomePage } from '@/pages/HomePage';

import type { Pokemon } from '@/types/pokemon';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: number;
    limit?: number;
    sort?: string;
    minHeight?: string;
    maxHeight?: string;
    minWeight?: string;
    maxWeight?: string;
    name?: string;
  }>;
}) {
  const params = await searchParams;
  const { page = 1, limit = 10, sort, minHeight, maxHeight, minWeight, maxWeight, name } = params;

  const order_by = sort ? { [sort]: 'asc' } : undefined;

  const filter: {
    minHeight?: number;
    maxHeight?: number;
    minWeight?: number;
    maxWeight?: number;
    name?: string;
  } = {};
  if (minHeight) filter.minHeight = Number.parseInt(minHeight, 10);
  if (maxHeight) filter.maxHeight = Number.parseInt(maxHeight, 10);
  if (minWeight) filter.minWeight = Number.parseInt(minWeight, 10);
  if (maxWeight) filter.maxWeight = Number.parseInt(maxWeight, 10);
  if (name) filter.name = name;

  const hasFilter = Object.keys(filter).length > 0;

  const offset = (page - 1) * limit;

  const { data } = await client.query<{ pokemons: Pokemon[] }>({
    query: gql`
      query GetPokemons($limit: Int!, $offset: Int!, $order_by: PokemonOrder, $filter: PokemonFilter) {
        pokemons(limit: $limit, offset: $offset, order_by: $order_by, filter: $filter) {
          id
          name
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
    `,
    variables: { limit, offset, order_by, filter: hasFilter ? filter : undefined },
  });

  return (
    <div>
      <HomePage pokemons={data?.pokemons || []} currentPage={page} limit={limit} />
    </div>
  );
}
