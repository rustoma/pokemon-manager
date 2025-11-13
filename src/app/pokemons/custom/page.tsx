import { GET_CUSTOM_POKEMONS } from '@/client/graphql/customPokemon/queries';
import client from '@/lib/apolloClient';
import { CustomPokemonsPage } from '@/pages/CustomPokemonsPage';

import type { CustomPokemon } from '@prisma/generated/prisma/client';

export default async function CustomPokemonsListPage() {
  const { data } = await client.query<{ customPokemons: CustomPokemon[] }>({
    query: GET_CUSTOM_POKEMONS,
  });

  return <CustomPokemonsPage pokemons={data?.customPokemons ?? []} />;
}
