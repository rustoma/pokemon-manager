'use client';

import { VersionIcon } from '@/client/features/pokemons/components/VersionIcon';

import type { Pokemon } from '@/client/types/pokemon';

interface PokemonVersionsProps {
  pokemon: Pokemon;
}

export const PokemonVersions = ({ pokemon }: PokemonVersionsProps) => {
  return (
    <div className="flex gap-2 items-center">
      <h4 className="text-xl">Versions:</h4>
      <ul className="flex flex-wrap gap-3 items-center">
        {pokemon.pokemongameindices.map(({ version }, index) => (
          <li key={version.id}>
            <VersionIcon versionName={version.name} color={index % 2 === 0 ? 'blue' : 'red'} />
          </li>
        ))}
      </ul>
    </div>
  );
};
