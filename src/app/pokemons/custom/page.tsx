import gql from 'graphql-tag';

import client from '@/lib/apolloClient';
import { CustomPokemonsPage } from '@/pages/CustomPokemonsPage';

import type { CustomPokemon } from '@prisma/generated/prisma/client';

export default async function CustomPokemonsListPage() {
  const { data } = await client.query<{ customPokemons: CustomPokemon[] }>({
    query: gql`
      query CustomPokemons {
        customPokemons {
          id
          name
          height
          weight
          imagePath
        }
      }
    `,
  });

  return <CustomPokemonsPage pokemons={data?.customPokemons ?? []} />;
}
