'use client';

import { PokemonDescription } from '@/client/features/pokemons/components/pokemon-details/PokemonDescription';
import { PokemonImage } from '@/client/features/pokemons/components/pokemon-details/PokemonImage';
import { PokemonInfo } from '@/client/features/pokemons/components/pokemon-details/PokemonInfo';
import { PokemonName } from '@/client/features/pokemons/components/pokemon-details/PokemonName';
import { PokemonNav } from '@/client/features/pokemons/components/pokemon-details/PokemonNav';
import { PokemonStats } from '@/client/features/pokemons/components/pokemon-details/PokemonStats';
import { PokemonType } from '@/client/features/pokemons/components/pokemon-details/PokemonType';
import { PokemonVersions } from '@/client/features/pokemons/components/pokemon-details/PokemonVersions';
import { PokemonWeaknesses } from '@/client/features/pokemons/components/pokemon-details/PokemonWeaknesses';

import type { Pokemon } from '@/client/types/pokemon';

interface PokemonPageProps {
  pokemon: Pokemon;
  prev?: { id: number; name: string } | null;
  next?: { id: number; name: string } | null;
}

export const PokemonPage = ({ pokemon, prev, next }: PokemonPageProps) => {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <PokemonNav prev={prev} next={next} />
      <div className="container mx-auto">
        <PokemonName pokemon={pokemon} />
        <div className="flex gap-4 mt-10">
          <div className="w-1/2 flex flex-col gap-4">
            <PokemonImage pokemon={pokemon} />
            <PokemonStats />
          </div>
          <div className="w-1/2 flex flex-col gap-10">
            <PokemonDescription />
            <PokemonVersions pokemon={pokemon} />

            <PokemonInfo pokemon={pokemon} />
            <PokemonType pokemon={pokemon} />
            <PokemonWeaknesses pokemon={pokemon} />
          </div>
        </div>
      </div>
    </div>
  );
};
