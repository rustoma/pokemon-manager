import { gql } from 'graphql-tag';

import { PokemonCore } from './fragments';

export const GetPokemons = gql`
  ${PokemonCore}
  query GetPokemons($limit: Int!, $offset: Int!, $order_by: [pokemon_order_by!], $where: pokemon_bool_exp) {
    pokemon(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
      ...PokemonCore
    }
  }
`;

export const GetPokemon = gql`
  ${PokemonCore}
  query GetPokemon($where: pokemon_bool_exp!, $limit: Int!) {
    pokemon(where: $where, limit: $limit) {
      ...PokemonCore
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
            language {
              name
              id
            }
          }
        }
      }
    }
  }
`;
