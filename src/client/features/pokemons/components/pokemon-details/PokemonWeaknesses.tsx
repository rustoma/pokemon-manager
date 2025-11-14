'use client';

import { PokemonDetailTypeChip } from '@/client/features/pokemons/components/PokemonDetailTypeChip';

import type { Pokemon } from '@/client/types/pokemon';

interface PokemonWeaknessesProps {
  pokemon: Pokemon;
}

export const PokemonWeaknesses = ({ pokemon }: PokemonWeaknessesProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-2xl">Weaknesses</h4>
      <ul className="flex flex-wrap gap-2">
        {/* TODO: Add weaknesses */}
        {pokemon.pokemontypes.map(({ type }) => (
          <li key={type.id} className="text-gray-500">
            <PokemonDetailTypeChip typeName={type.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};
