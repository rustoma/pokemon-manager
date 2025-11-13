'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { UPDATE_CUSTOM_POKEMON } from '@/client/graphql/customPokemon/mutations';
import { CLIENT_ROUTES } from '@/consts/clientRoutes';
import { CustomPokemonForm } from '@/features/pokemons/components/custom/CustomPokemonForm';
import client from '@/lib/apolloClient';

type CustomPokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  imagePath: string;
};

export const EditCustomPokemonPage = ({ pokemon }: { pokemon: CustomPokemon | null }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
        submitLabel="Save"
        defaultValues={{
          name: pokemon.name,
          height: pokemon.height,
          weight: pokemon.weight,
          imagePath: pokemon.imagePath,
        }}
        onSubmit={async ({ name, height, weight, imagePath }) => {
          try {
            await client.mutate({
              mutation: UPDATE_CUSTOM_POKEMON,
              variables: { id: pokemon.id, name, height, weight, imagePath },
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
