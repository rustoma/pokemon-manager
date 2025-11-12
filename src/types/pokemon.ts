export type Pokemon = {
  id: number;
  name: string;
  pokemonsprites: {
    id: number;
    sprites: { [key: string]: string };
  }[];
};
