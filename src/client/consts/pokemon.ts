interface TypeColor {
  bg: string;
  fg: string;
}

export const TYPE_COLORS: Record<string, TypeColor> = {
  normal: { bg: '#A8A77A', fg: '#000000' },
  fire: { bg: '#EE8130', fg: '#000000' },
  water: { bg: '#6390F0', fg: '#FFFFFF' },
  electric: { bg: '#F7D02C', fg: '#000000' },
  grass: { bg: '#7AC74C', fg: '#000000' },
  ice: { bg: '#96D9D6', fg: '#000000' },
  fighting: { bg: '#C22E28', fg: '#FFFFFF' },
  poison: { bg: '#A33EA1', fg: '#FFFFFF' },
  ground: { bg: '#E2BF65', fg: '#000000' },
  flying: { bg: '#A98FF3', fg: '#000000' },
  psychic: { bg: '#F95587', fg: '#FFFFFF' },
  bug: { bg: '#A6B91A', fg: '#000000' },
  rock: { bg: '#B6A136', fg: '#000000' },
  ghost: { bg: '#735797', fg: '#FFFFFF' },
  dragon: { bg: '#6F35FC', fg: '#FFFFFF' },
  dark: { bg: '#705746', fg: '#FFFFFF' },
  steel: { bg: '#B7B7CE', fg: '#000000' },
  fairy: { bg: '#D685AD', fg: '#000000' },
};
