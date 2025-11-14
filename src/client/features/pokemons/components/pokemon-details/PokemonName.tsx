'use client';

import type { Pokemon } from '@/client/types/pokemon';

interface PokemonNameProps {
  pokemon: Pokemon;
}

export const PokemonName = ({ pokemon }: PokemonNameProps) => {
  return (
    <h1 className="text-4xl font-bold text-center text-gray-600">
      {pokemon.name} <span className="text-4xl text-gray-500 font-medium">#{pokemon.id}</span>
    </h1>
  );
};

