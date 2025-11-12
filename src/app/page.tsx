import gql from 'graphql-tag';

import client from '@/lib/apolloClient';
import { HomePage } from '@/pages/HomePage';

import type { Pokemon } from '@/types/pokemon';

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: number; limit?: number }> }) {
  const { page = 1, limit = 10 } = await searchParams;

  const { data } = await client.query<{ pokemons: Pokemon[] }>({
    query: gql`
      query GetPokemons($limit: Int!, $offset: Int!) {
        pokemons(limit: $limit, offset: $offset) {
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
    variables: { limit: Number(limit), offset: Number(page) * Number(limit) },
  });

  return (
    <div>
      <HomePage pokemons={data?.pokemons || []} />
    </div>
  );
}
