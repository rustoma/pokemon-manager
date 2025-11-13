import Link from 'next/link';

import { CLIENT_ROUTES } from '@/consts/clientRoutes';

export const PokemonHeader = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pokedex</h1>
          <Link
            href={CLIENT_ROUTES.CUSTOM_POKEMON_NEW()}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer">
            Add Custom Pokemon
          </Link>
        </div>
      </div>
    </header>
  );
};
