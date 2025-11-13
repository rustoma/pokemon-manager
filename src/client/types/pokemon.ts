export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemonsprites: {
    id: number;
    sprites: { [key: string]: string };
  }[];
  pokemongameindices: {
    version: {
      id: number;
      name: string;
    };
  }[];
  pokemonabilities: {
    ability: {
      abilitynames: {
        id: number;
        name: string;
      }[];
    };
  }[];
  pokemontypes: {
    type: {
      id: number;
      name: string;
    };
  }[];
};
