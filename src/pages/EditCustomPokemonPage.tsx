'use client';

import gql from 'graphql-tag';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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

  const UPDATE_CUSTOM = gql`
    mutation UpdateCustom($id: Int!, $name: String!, $height: Int!, $weight: Int!, $imagePath: String!) {
      updateCustomPokemon(id: $id, name: $name, height: $height, weight: $weight, imagePath: $imagePath) {
        id
        name
        imagePath
      }
    }
  `;

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
          await client.mutate({
            mutation: UPDATE_CUSTOM,
            variables: { id: pokemon.id, name, height, weight, imagePath },
          });
          router.push(CLIENT_ROUTES.CUSTOM_POKEMONS());
        }}
      />
    </div>
  );
};
