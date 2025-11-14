'use client';

import type { Pokemon } from '@/client/types/pokemon';

interface PokemonInfoProps {
  pokemon: Pokemon;
}

export const PokemonInfo = ({ pokemon }: PokemonInfoProps) => {
  return (
    <div className="flex flex-col gap-2 bg-[#30A7D7] p-4 rounded-md">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-2">
          <h5 className="text-white">Height</h5>
          <p className="text-xl">{pokemon.height}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-white">Category</h5>
          <p className="text-xl">{pokemon.height}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-white">Weight</h5>
          <p className="text-xl">{pokemon.weight}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-white">Abilities</h5>
          <p className="text-xl">{pokemon.height}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="text-white">Gender</h5>
          <p className="text-xl">{pokemon.height}</p>
        </div>
      </div>
    </div>
  );
};
