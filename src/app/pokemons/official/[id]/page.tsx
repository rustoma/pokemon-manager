import { notFound } from 'next/navigation';

import { GET_POKEMON_WITH_NEIGHBORS } from '@/client/graphql/pokemon/queries';
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
    query: GET_POKEMON_WITH_NEIGHBORS,
    variables: { id: numericId, prevId: numericId - 1, nextId: numericId + 1 },
  });

  if (!data?.pokemon) {
    notFound();
  }

  return <PokemonPage pokemon={data.pokemon} prev={data.prev} next={data.next} />;
}
