export const CLIENT_ROUTES = {
  HOME: () => '/',
  CUSTOM_POKEMONS: () => '/pokemons/custom',
  CUSTOM_POKEMON_NEW: () => '/pokemons/custom/new',
  CUSTOM_POKEMON_EDIT: (id: string) => `/pokemons/custom/${id}/edit`,
  POKEMON_DETAIL: (id: number) => `/pokemons/official/${id}`,
};
