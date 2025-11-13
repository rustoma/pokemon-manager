import gql from 'graphql-tag';

import { PokemonCore } from '@/client/graphql/pokemon/fragments';

export const GET_POKEMONS = gql`
  ${PokemonCore}
  query GetPokemons($limit: Int!, $offset: Int!, $order_by: PokemonOrder, $filter: PokemonFilter) {
    pokemons(limit: $limit, offset: $offset, order_by: $order_by, filter: $filter) {
      ...PokemonCore
    }
  }
`;

export const GET_POKEMON_WITH_NEIGHBORS = gql`
  query GetPokemon($id: Int!, $prevId: Int!, $nextId: Int!) {
    pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      pokemonsprites {
        id
        sprites
      }
      pokemongameindices {
        version {
          name
          id
        }
      }
      pokemonabilities {
        ability {
          abilitynames {
            id
            name
          }
        }
      }
      pokemontypes {
        type {
          id
          name
        }
      }
    }
    prev: pokemon(where: { id: { _eq: $prevId } }) {
      id
      name
    }
    next: pokemon(where: { id: { _eq: $nextId } }) {
      id
      name
    }
  }
`;
