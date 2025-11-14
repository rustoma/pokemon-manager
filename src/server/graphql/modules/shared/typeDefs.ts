import { gql } from 'graphql-tag';

const typeDefs = gql`
  scalar JSON

  input pokemon_bool_exp {
    id: Int_comparison_exp
  }

  input Int_comparison_exp {
    _eq: Int
    _neq: Int
    _gt: Int
    _gte: Int
    _lt: Int
    _lte: Int
  }

  input String_comparison_exp {
    _ilike: String
  }

  input PokemonOrder {
    name: SortingOrder
    height: SortingOrder
    weight: SortingOrder
  }

  enum SortingOrder {
    asc
    desc
  }

  input PokemonFilter {
    name: String
    minHeight: Int
    maxHeight: Int
    minWeight: Int
    maxWeight: Int
  }
`;

export default typeDefs;
