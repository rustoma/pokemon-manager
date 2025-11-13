import gql from 'graphql-tag';

import client from '@/lib/apolloClient';
import { EditCustomPokemonPage } from '@/pages/EditCustomPokemonPage';

type CustomPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  imagePath: string;
};

export default async function EditCustomPokemon({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const numericId = Number(id);

  const result = await client.query<{ customPokemon: CustomPokemon | null }>({
    query: gql`
      query CustomPokemon($id: Int!) {
        customPokemon(id: $id) {
          id
          name
          height
          weight
          imagePath
        }
      }
    `,
    variables: { id: numericId },
  });

  return <EditCustomPokemonPage pokemon={result.data?.customPokemon ?? null} />;
}
