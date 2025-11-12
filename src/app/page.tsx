import gql from 'graphql-tag';

import client from '@/lib/apolloClient';
import { HomePage } from '@/pages/HomePage';

import type { Pokemon } from '@/types/pokemon';

const ALLOWED_LIMITS = [10, 20, 50] as const;

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: number; limit?: number }> }) {
  const params = await searchParams;
  let { page = 1, limit = 10 } = params;

  // Validate and sanitize limit
  const limitNum = Number(limit);
  limit = ALLOWED_LIMITS.includes(limitNum as (typeof ALLOWED_LIMITS)[number]) ? limitNum : 10;

  // Validate and sanitize page
  const pageNum = Number(page);
  page = pageNum > 0 ? pageNum : 1;

  // Calculate offset (page 1 should start at offset 0)
  const offset = (page - 1) * limit;

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
    variables: { limit, offset },
  });

  return (
    <div>
      <HomePage pokemons={data?.pokemons || []} currentPage={page} limit={limit} />
    </div>
  );
}
