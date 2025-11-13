import { gql } from 'graphql-tag';

export const PokemonCore = gql`
  fragment PokemonCore on pokemon {
    id
    name
    height
    weight
    pokemonsprites {
      id
      sprites
    }
    pokemontypes {
      type {
        id
        name
      }
    }
  }
`;
