import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Query {
    pokemons(limit: Int = 10, offset: Int = 0, order_by: PokemonOrder = { name: asc }, filter: PokemonFilter): [Pokemon]
    pokemon(where: pokemon_bool_exp!): Pokemon
  }

  type Pokemon {
    id: Int
    name: String
    height: Int
    weight: Int
    pokemonsprites: [PokemonSprite]
    pokemongameindices: [PokemonGameIndex]
    pokemonabilities: [PokemonAbility]
    pokemontypes: [PokemonType]
  }

  type PokemonSprite {
    id: Int
    sprites: JSON!
  }

  type PokemonGameIndex {
    version: Version
  }

  type PokemonAbility {
    ability: Ability
  }
  type Ability {
    abilitynames: [AbilityName]
  }
  type AbilityName {
    id: Int
    name: String
  }
  type Version {
    name: String
    id: Int
  }
  type PokemonType {
    type: Type
  }

  type Type {
    id: Int
    name: String
  }
`;

export default typeDefs;
