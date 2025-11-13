import gql from 'graphql-tag';

export const CREATE_CUSTOM_POKEMON = gql`
  mutation CreateCustom($name: String!, $height: Int!, $weight: Int!, $imagePath: String!) {
    createCustomPokemon(name: $name, height: $height, weight: $weight, imagePath: $imagePath) {
      id
      name
      imagePath
    }
  }
`;

export const UPDATE_CUSTOM_POKEMON = gql`
  mutation UpdateCustom($id: Int!, $name: String!, $height: Int!, $weight: Int!, $imagePath: String!) {
    updateCustomPokemon(id: $id, name: $name, height: $height, weight: $weight, imagePath: $imagePath) {
      id
      name
      imagePath
    }
  }
`;

export const DELETE_CUSTOM_POKEMON = gql`
  mutation DeleteCustom($id: Int!) {
    deleteCustomPokemon(id: $id) {
      id
    }
  }
`;
