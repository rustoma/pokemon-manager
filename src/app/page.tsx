import gql from 'graphql-tag';
import Image from 'next/image';

import client from '@/lib/apolloClient';

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
        }
      }
    `,
    variables: { limit: Number(limit), offset: Number(page) * Number(limit) },
  });

  return (
    <div>
      {data?.pokemons.map((pokemon) => (
        <div key={pokemon.id}>
          <h1>{pokemon.name}</h1>
          <Image src={pokemon.pokemonsprites[0].sprites.front_default} alt={pokemon.name} width={100} height={100} />
        </div>
      ))}
    </div>
  );
}
