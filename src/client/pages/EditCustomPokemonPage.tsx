'use client';

import { useCallback } from 'react';

import { useMutation } from '@apollo/client/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CLIENT_ROUTES } from '@/client/consts/clientRoutes';
import {
  CustomPokemonForm,
  type CustomPokemonFormValues,
} from '@/client/features/pokemons/components/custom/CustomPokemonForm';
import { UPDATE_CUSTOM_POKEMON } from '@/client/graphql/customPokemon/mutations';

type CustomPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  imagePath: string;
};

export const EditCustomPokemonPage = ({ pokemon }: { pokemon: CustomPokemon | null }) => {
  const router = useRouter();
  const [updateCustomPokemon, { loading, error }] = useMutation(UPDATE_CUSTOM_POKEMON);

  const handleSubmit = useCallback(
    async ({ name, height, weight, imagePath }: CustomPokemonFormValues) => {
      if (!pokemon) return;

      await updateCustomPokemon({
        variables: { id: pokemon.id, name, height, weight, imagePath },
        onCompleted: () => {
          router.push(CLIENT_ROUTES.CUSTOM_POKEMONS());
        },
      });
    },
    [pokemon, router, updateCustomPokemon],
  );

  if (!pokemon) {
    return (
      <div className="container mx-auto max-w-3xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Edit Custom Pokemon</h1>
          <Link
            href={CLIENT_ROUTES.CUSTOM_POKEMONS()}
            className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
            Back
          </Link>
        </div>
        <p className="text-gray-600">Not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Custom Pokemon</h1>
        <Link
          href={CLIENT_ROUTES.CUSTOM_POKEMONS()}
          className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
          Back
        </Link>
      </div>

      <CustomPokemonForm
        submitLabel={loading ? 'Saving...' : 'Save'}
        defaultValues={{
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          imagePath: pokemon.imagePath,
        }}
        onSubmit={handleSubmit}
        error={error ? error.message : undefined}
      />
    </div>
  );
};
