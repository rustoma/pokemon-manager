import { PokemonListItem } from '@/client/features/pokemons/components/pokemon-list/PokemonListItem';

import type { Pokemon } from '@/client/types/pokemon';

interface PokemonListProps {
  pokemons: Pokemon[];
}
export const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-8 py-10">
      {pokemons.length === 0 && <div className="text-sm text-gray-500">No pokemons found.</div>}
      {pokemons.map((pokemon) => (
        <PokemonListItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};
