'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { CLIENT_ROUTES } from '@/client/consts/clientRoutes';
import { useUser } from '@/client/features/auth/hooks/useUser';

export const PokemonHeader = () => {
  const { isAuthenticated, signInDemoUser, signOut } = useUser();
  const pathname = usePathname();

  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link href={CLIENT_ROUTES.HOME()} className="text-2xl font-bold">
            Pokedex
          </Link>
          <div className="flex items-center gap-2">
            {pathname !== CLIENT_ROUTES.CUSTOM_POKEMONS() && (
              <Link
                href={CLIENT_ROUTES.CUSTOM_POKEMONS()}
                className="rounded bg-white px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer">
                Custom Pokemons
              </Link>
            )}
            {isAuthenticated ? (
              <Link
                href={CLIENT_ROUTES.CUSTOM_POKEMON_NEW()}
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer">
                Add Custom Pokemon
              </Link>
            ) : (
              <button
                onClick={signInDemoUser}
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 cursor-pointer">
                Sign In
              </button>
            )}
            {isAuthenticated && (
              <button onClick={signOut} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 cursor-pointer">
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
