'use client';

import gql from 'graphql-tag';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import client from '@/lib/apolloClient';

import type { CustomPokemon } from '@prisma/generated/prisma/client';

interface Props {
  pokemons: CustomPokemon[];
}

export const CustomPokemonsPage = ({ pokemons }: Props) => {
  const router = useRouter();

  const DELETE_MUTATION = gql`
    mutation DeleteCustom($id: Int!) {
      deleteCustomPokemon(id: $id) {
        id
      }
    }
  `;

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this custom pokemon?')) return;
    await client.mutate({ mutation: DELETE_MUTATION, variables: { id } });
    router.refresh();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Custom Pokemons</h1>
        <Link href="/pokemons/custom/new" className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
          Add Custom Pokemon
        </Link>
      </div>
      <div className="py-10">
        <div className="flex flex-wrap gap-x-4 gap-y-8">
          {pokemons.map((p) => (
            <div key={p.id} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="relative bg-[#F2F2F2] w-48 h-48 flex items-center justify-center">
                  <img src={p.imagePath} alt={p.name} className="max-h-48 max-w-48 object-contain" />
                </div>
                <span className="text-sm text-gray-500">#{p.id}</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{p.name}</h3>
                <div className="flex gap-2">
                  <Link
                    className="rounded border border-gray-300 px-2 py-1 text-sm hover:bg-gray-50"
                    href={`/pokemons/custom/${p.id}/edit`}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700"
                    type="button">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          {pokemons.length === 0 && <div className="text-sm text-gray-500">No custom pokemons yet.</div>}
        </div>
      </div>
    </div>
  );
};
