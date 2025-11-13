'use client';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

import { CLIENT_ROUTES } from '@/consts/clientRoutes';
import { PokemonDetailTypeChip } from '@/features/pokemons/components/PokemonDetailTypeChip';
import { StatItem } from '@/features/pokemons/components/StatItem';
import { VersionIcon } from '@/features/pokemons/components/VersionIcon';

import type { Pokemon } from '@/types/pokemon';

interface PokemonPageProps {
  pokemon: Pokemon;
  prev?: { id: number; name: string } | null;
  next?: { id: number; name: string } | null;
}

export const PokemonPage = ({ pokemon, prev, next }: PokemonPageProps) => {
  return (
    <div className="flex flex-col gap-4 pb-10">
      <div className="flex items-center justify-between gap-2">
        {prev && (
          <div className="flex flex-1 items-center gap-2 justify-start bg-[#A4A4A4] p-4">
            <Link href={CLIENT_ROUTES.POKEMON_DETAIL(prev.id)} className="flex items-center gap-2 justify-start ">
              <div className="flex items-center justify-center rounded-full bg-white p-0.5">
                <ChevronLeftIcon className="w-4 h-4" />
              </div>
              <p className="text-white text-2xl">#{prev.id}</p>
              <h4 className="text-[#363636] text-2xl">{prev.name}</h4>
            </Link>
          </div>
        )}
        {next && (
          <div className="flex flex-1 items-center gap-2 justify-end bg-[#A4A4A4] p-4">
            <Link href={CLIENT_ROUTES.POKEMON_DETAIL(next.id)} className="flex items-center gap-2 justify-end ">
              <p className="text-white text-2xl">#{next.id}</p>
              <h4 className="text-[#363636] text-2xl">{next.name}</h4>
              <div className="flex items-center justify-center rounded-full bg-white p-0.5">
                <ChevronRightIcon className="w-4 h-4" />
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-600">
          {pokemon.name} <span className="text-4xl text-gray-500 font-medium">#{pokemon.id}</span>
        </h1>
        <div className="flex gap-4 mt-10">
          <div className="w-1/2 flex flex-col gap-4">
            <div className="relative bg-[#F2F2F2] w-full  flex items-center justify-center">
              <Image src={pokemon.pokemonsprites[0].sprites.front_default} alt={pokemon.name} width={512} height={512} />
            </div>
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
          </div>
          <div className="w-1/2 flex flex-col gap-10">
            <p className="text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};
