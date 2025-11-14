import { Pagination } from '@/client/features/pokemons/components/Pagination';
import { PokemonList } from '@/client/features/pokemons/components/pokemon-list/PokemonList';
import { PokemonAdvanceFilters } from '@/client/features/pokemons/components/PokemonAdvanceFilters';
import { PokemonHeader } from '@/client/features/pokemons/components/PokemonHeader';
import { PokemonSearch } from '@/client/features/pokemons/components/PokemonSearch';
import { PokemonSort } from '@/client/features/pokemons/components/PokemonSort';
import { SurpriseMeButton } from '@/client/features/pokemons/components/SurpriseMeButton';

import type { Pokemon } from '@/client/types/pokemon';

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
        <SurpriseMeButton />
        <PokemonSort />
      </div>
      <div className="container mx-auto">
        <PokemonList pokemons={pokemons} />
        <Pagination currentPage={currentPage} limit={limit} />
      </div>
    </>
  );
};
