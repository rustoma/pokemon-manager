import gql from 'graphql-tag';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CLIENT_ROUTES } from '@/consts/clientRoutes';
import { CustomPokemonForm } from '@/features/pokemons/components/custom/CustomPokemonForm';
import client from '@/lib/apolloClient';

export const NewCustomPokemonPage = () => {
  const router = useRouter();

  const CREATE_CUSTOM = gql`
    mutation CreateCustom($name: String!, $height: Int!, $weight: Int!, $imagePath: String!) {
      createCustomPokemon(name: $name, height: $height, weight: $weight, imagePath: $imagePath) {
        id
        name
        imagePath
      }
    }
  `;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add Custom Pokemon</h1>
        <Link href={CLIENT_ROUTES.HOME()} className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
          Back
        </Link>
      </div>

      <CustomPokemonForm
        submitLabel="Create"
        onSubmit={async ({ name, height, weight, imagePath }) => {
          await client.mutate({
            mutation: CREATE_CUSTOM,
            variables: { name, height, weight, imagePath },
          });
          router.push(CLIENT_ROUTES.CUSTOM_POKEMONS());
        }}
      />
    </div>
  );
};
