import Link from 'next/link';

export const PokemonHeader = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pokedex</h1>
          <Link
            href="/pokemons/custom/new"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 cursor-pointer">
            Add Custom Pokemon
          </Link>
        </div>
      </div>
    </header>
  );
};
