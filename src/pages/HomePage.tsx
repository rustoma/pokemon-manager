import { ArrowPathIcon } from '@heroicons/react/24/outline';

import { Pagination } from '@/features/pokemons/components/Pagination';
import { PokemonList } from '@/features/pokemons/components/pokemon-list/PokemonList';
import { PokemonAdvanceFilters } from '@/features/pokemons/components/PokemonAdvanceFilters';
import { PokemonHeader } from '@/features/pokemons/components/PokemonHeader';
import { PokemonSearch } from '@/features/pokemons/components/PokemonSearch';
import { PokemonSort } from '@/features/pokemons/components/PokemonSort';

import type { Pokemon } from '@/types/pokemon';

interface HomePageProps {
  pokemons: Pokemon[];
  currentPage: number;
  limit: number;
}

export const HomePage = ({ pokemons, currentPage, limit }: HomePageProps) => {
  return (
    <>
      <PokemonHeader />
      <PokemonSearch />
      <PokemonAdvanceFilters />
      <div className="flex items-center gap-2 justify-between container mx-auto mt-12">
        <button className="bg-blue-400 text-white flex gap-2 items-center px-4 py-2 cursor-pointer rounded-md hover:bg-[#414141] transition-colors">
          <ArrowPathIcon className="w-4 h-4" /> Surprise Me!
        </button>
        <PokemonSort />
      </div>
      <div className="container mx-auto">
        <PokemonList pokemons={pokemons} />
        <Pagination currentPage={currentPage} limit={limit} />
      </div>
    </>
  );
};
