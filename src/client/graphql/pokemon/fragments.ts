import gql from 'graphql-tag';

export const PokemonCore = gql`
  fragment PokemonCore on Pokemon {
    id
    name
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
