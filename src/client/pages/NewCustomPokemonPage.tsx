import { useCallback } from 'react';

import { useMutation } from '@apollo/client/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CLIENT_ROUTES } from '@/client/consts/clientRoutes';
import {
  CustomPokemonForm,
  type CustomPokemonFormValues,
} from '@/client/features/pokemons/components/custom/CustomPokemonForm';
import { CREATE_CUSTOM_POKEMON } from '@/client/graphql/customPokemon/mutations';

export const NewCustomPokemonPage = () => {
  const router = useRouter();
  const [createCustomPokemon, { loading, error }] = useMutation(CREATE_CUSTOM_POKEMON);

  const handleSubmit = useCallback(
    async ({ name, height, weight, imagePath }: CustomPokemonFormValues) => {
      await createCustomPokemon({
        variables: { name, height, weight, imagePath },
        onCompleted: () => {
          router.push(CLIENT_ROUTES.CUSTOM_POKEMONS());
        },
      });
    },
    [router, createCustomPokemon],
  );

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add Custom Pokemon</h1>
        <Link href={CLIENT_ROUTES.HOME()} className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
          Back
        </Link>
      </div>

      <CustomPokemonForm
        submitLabel={loading ? 'Creating...' : 'Create'}
        onSubmit={handleSubmit}
        error={error ? error.message : undefined}
      />
    </div>
  );
};
