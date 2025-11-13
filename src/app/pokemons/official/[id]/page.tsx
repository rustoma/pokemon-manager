import gql from 'graphql-tag';
import { notFound } from 'next/navigation';

import client from '@/lib/apolloClient';
import { PokemonPage } from '@/pages/PokemonPage';

import type { Pokemon } from '@/types/pokemon';

export default async function OfficialPokemonsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const numericId = Number(id);

  const { data } = await client.query<{
    pokemon: Pokemon | null;
    prev: { id: number; name: string } | null;
    next: { id: number; name: string } | null;
  }>({
    query: gql`
      query GetPokemon($id: Int!, $prevId: Int!, $nextId: Int!) {
        pokemon(where: { id: { _eq: $id } }) {
          id
          name
          pokemonsprites {
            id
            sprites
          }
          pokemongameindices {
            version {
              name
              id
            }
          }
          pokemonabilities {
            ability {
              abilitynames {
                id
                name
              }
            }
          }
          pokemontypes {
            type {
              id
              name
            }
          }
        }
        prev: pokemon(where: { id: { _eq: $prevId } }) {
          id
          name
        }
        next: pokemon(where: { id: { _eq: $nextId } }) {
          id
          name
        }
      }
    `,
    variables: { id: numericId, prevId: numericId - 1, nextId: numericId + 1 },
  });

  if (!data?.pokemon) {
    notFound();
  }

  return <PokemonPage pokemon={data.pokemon} prev={data.prev} next={data.next} />;
}
