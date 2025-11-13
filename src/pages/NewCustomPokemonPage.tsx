import Link from 'next/link';

import { CustomPokemonForm } from '@/features/pokemons/components/custom/CustomPokemonForm';

export const NewCustomPokemonPage = () => {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Add Custom Pokemon</h1>
        <Link href="/" className="rounded border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50">
          Back
        </Link>
      </div>

      <CustomPokemonForm submitLabel="Create" />
    </div>
  );
};
