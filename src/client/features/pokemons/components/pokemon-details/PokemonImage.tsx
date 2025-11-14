'use client';

import Image from 'next/image';

import type { Pokemon } from '@/client/types/pokemon';

interface PokemonImageProps {
  pokemon: Pokemon;
}

export const PokemonImage = ({ pokemon }: PokemonImageProps) => {
  return (
    <div className="relative bg-[#F2F2F2] w-full  flex items-center justify-center">
      <Image src={pokemon.pokemonsprites[0].sprites.front_default} alt={pokemon.name} width={512} height={512} />
    </div>
  );
};

