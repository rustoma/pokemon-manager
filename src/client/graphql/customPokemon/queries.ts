import gql from 'graphql-tag';

export const GET_CUSTOM_POKEMONS = gql`
  query CustomPokemons {
    customPokemons {
      id
      name
      height
      weight
      imagePath
    }
  }
`;

export const GET_CUSTOM_POKEMON = gql`
  query CustomPokemon($id: Int!) {
    customPokemon(id: $id) {
      id
      name
      height
      weight
      imagePath
    }
  }
`;
