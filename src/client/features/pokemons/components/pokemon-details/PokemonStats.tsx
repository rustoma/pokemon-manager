'use client';

import { StatItem } from '@/client/features/pokemons/components/StatItem';

export const PokemonStats = () => {
  return (
    <div className="flex flex-col gap-4 bg-[#A4A4A4] p-4 rounded-md">
      <p>Stats:</p>
      <div>
        <div className="grid grid-cols-6 gap-2">
          <StatItem statName="HP" statValue={1} />
          <StatItem statName="Attack" statValue={5} />
          <StatItem statName="Defense" statValue={2} />
        </div>
      </div>
    </div>
  );
};
