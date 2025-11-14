'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { CLIENT_ROUTES } from '@/client/consts/clientRoutes';
import { useUser } from '@/client/features/auth/hooks/useUser';
import { DELETE_CUSTOM_POKEMON } from '@/client/graphql/customPokemon/mutations';
import client from '@/lib/apolloClient';

import type { CustomPokemon } from '@prisma/generated/prisma/client';

interface Props {
  pokemons: CustomPokemon[];
}

export const CustomPokemonsPage = ({ pokemons }: Props) => {
  const router = useRouter();
  const { isAuthenticated, signOut, signInDemoUser } = useUser();
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this custom pokemon?')) return;
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      await client.mutate({ mutation: DELETE_CUSTOM_POKEMON, variables: { id } });
      router.refresh();
    } catch (error) {
      console.error('Failed to delete pokemon:', error);
      setDeletingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Custom Pokemons</h1>
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Link
              href={CLIENT_ROUTES.CUSTOM_POKEMON_NEW()}
              className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700">
              Add Custom Pokemon
            </Link>
          )}
          {isAuthenticated ? (
            <button onClick={signOut} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 cursor-pointer">
              Sign Out
            </button>
          ) : (
            <button
              onClick={signInDemoUser}
              className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 cursor-pointer">
              Sign In
            </button>
          )}
        </div>
      </div>
      <div className="py-10">
        <div className="flex flex-wrap gap-x-4 gap-y-8">
          {pokemons.map((p) => (
            <div key={p.id} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <div className="relative bg-[#F2F2F2] w-48 h-48 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.imagePath} alt={p.name} className="max-h-48 max-w-48 object-contain" />
                </div>
                <span className="text-sm text-gray-500">#{p.id}</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{p.name}</h3>
                {isAuthenticated && (
                  <div className="flex gap-2">
                    <Link
                      className="rounded border border-gray-300 px-2 py-1 text-sm hover:bg-gray-50"
                      href={CLIENT_ROUTES.CUSTOM_POKEMON_EDIT(p.id.toString())}>
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deletingIds.has(p.id)}
                      className="rounded bg-red-600 px-2 py-1 text-sm text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      type="button">
                      {deletingIds.has(p.id) ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {pokemons.length === 0 && <div className="text-sm text-gray-500">No custom pokemons yet.</div>}
        </div>
      </div>
    </div>
  );
};
