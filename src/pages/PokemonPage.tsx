import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

import type { Pokemon } from '@/types/pokemon';

interface PokemonPageProps {
  pokemon: Pokemon;
  prev?: { id: number; name: string } | null;
  next?: { id: number; name: string } | null;
}

export const PokemonPage = ({ pokemon, prev, next }: PokemonPageProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        {prev && (
          <Link href={`/pokemons/official/${prev.id}`} className="flex items-center gap-2">
            <ArrowLeftIcon className="w-4 h-4" />
            <p>#{prev.id}</p>
            <h4>{prev.name}</h4>
          </Link>
        )}
        {next && (
          <Link href={`/pokemons/official/${next.id}`} className="flex items-center gap-2">
            <ArrowRightIcon className="w-4 h-4" />
            <p>#{next.id}</p>
            <h4>{next.name}</h4>
          </Link>
        )}
      </div>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">{pokemon.name}</h1>
        <div className="flex gap-4">
          <div className="w-1/2">
            <div className="relative bg-[#F2F2F2] w-96 h-96 flex items-center justify-center">
              <Image src={pokemon.pokemonsprites[0].sprites.front_default} alt={pokemon.name} width={384} height={384} />
            </div>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <h4>Versions:</h4>
            <ul className="flex flex-wrap gap-2">
              {pokemon.pokemongameindices.map(({ version }) => (
                <li key={version.id}>{version.name}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 bg-[#30A7D7] p-4 rounded-md">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-2">
                  <h5>Height</h5>
                  <p>{pokemon.height}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h5>Weight</h5>
                  <p>{pokemon.weight}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
