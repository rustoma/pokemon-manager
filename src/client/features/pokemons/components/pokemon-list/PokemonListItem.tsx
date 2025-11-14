import Image from 'next/image';
import Link from 'next/link';

import { CLIENT_ROUTES } from '@/client/consts/clientRoutes';
import { PokemonTypeChip } from '@/client/features/pokemons/components/PokemonTypeChip';

import type { Pokemon } from '@/client/types/pokemon';

interface PokemonListItemProps {
  pokemon: Pokemon;
}

export const PokemonListItem = ({ pokemon }: PokemonListItemProps) => {
  return (
    <Link href={CLIENT_ROUTES.POKEMON_DETAIL(pokemon.id)}>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          {pokemon.pokemonsprites[0].sprites.front_default && (
            <div className="relative bg-[#F2F2F2] w-48 h-48 flex items-center justify-center">
              <Image src={pokemon.pokemonsprites[0].sprites.front_default} alt={pokemon.name} width={200} height={200} />
            </div>
          )}
          <span className="text-sm text-gray-500">#{pokemon.id}</span>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">{pokemon.name}</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.pokemontypes.map(({ type }: { type: { id: number; name: string } }) => (
              <PokemonTypeChip key={type.id} typeName={type.name} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
