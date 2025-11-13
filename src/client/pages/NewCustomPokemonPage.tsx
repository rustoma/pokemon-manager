import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CLIENT_ROUTES } from '@/client/consts/clientRoutes';
import { CustomPokemonForm } from '@/client/features/pokemons/components/custom/CustomPokemonForm';
import { CREATE_CUSTOM_POKEMON } from '@/client/graphql/customPokemon/mutations';
import client from '@/lib/apolloClient';

export const NewCustomPokemonPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
          try {
            await client.mutate({
              mutation: CREATE_CUSTOM_POKEMON,
              variables: { name, height, weight, imagePath },
            });
            router.push(CLIENT_ROUTES.CUSTOM_POKEMONS());
          } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
          }
        }}
        error={error}
      />
    </div>
  );
};
