import { Pagination } from '@/features/pokemons/components/Pagination';
import { PokemonList } from '@/features/pokemons/components/pokemon-list/PokemonList';
import { PokemonHeader } from '@/features/pokemons/components/PokemonHeader';
import { PokemonSearch } from '@/features/pokemons/components/PokemonSearch';

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
      <div className="container mx-auto">
        <PokemonList pokemons={pokemons} />
        <Pagination currentPage={currentPage} limit={limit} />
      </div>
    </>
  );
};
