import { PokemonList } from '@/features/pokemons/components/pokemon-list/PokemonList';
import { PokemonHeader } from '@/features/pokemons/components/PokemonHeader';
import { PokemonSearch } from '@/features/pokemons/components/PokemonSearch';

import type { Pokemon } from '@/types/pokemon';

interface HomePageProps {
  pokemons: Pokemon[];
}

export const HomePage = ({ pokemons }: HomePageProps) => {
  return (
    <>
      <PokemonHeader />
      <PokemonSearch />
      <div className="container mx-auto">
        <PokemonList pokemons={pokemons} />
      </div>
    </>
  );
};
