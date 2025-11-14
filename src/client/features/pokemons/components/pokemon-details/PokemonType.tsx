'use client';

import { PokemonDetailTypeChip } from '@/client/features/pokemons/components/PokemonDetailTypeChip';

import type { Pokemon } from '@/client/types/pokemon';

interface PokemonTypeProps {
  pokemon: Pokemon;
}

export const PokemonType = ({ pokemon }: PokemonTypeProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-2xl">Type</h4>
      <ul className="flex flex-wrap gap-2">
        {pokemon.pokemontypes.map(({ type }) => (
          <li key={type.id} className="text-gray-500">
            <PokemonDetailTypeChip typeName={type.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
