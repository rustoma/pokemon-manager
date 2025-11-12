interface PokemonTypeChipProps {
  typeName: string;
}

interface TypeColor {
  bg: string;
  fg: string;
}

const TYPE_COLORS: Record<string, TypeColor> = {
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

export const PokemonTypeChip = ({ typeName }: PokemonTypeChipProps) => {
  const normalizedTypeName = typeName.toLowerCase();
  const typeColors = TYPE_COLORS[normalizedTypeName] || { bg: '#777777', fg: '#FFFFFF' };
  const displayName = typeName.charAt(0).toUpperCase() + typeName.slice(1);

  return (
    <span
      className="inline-block px-5 text-xs font-semibold rounded-md"
      style={{
        backgroundColor: typeColors.bg,
        color: typeColors.fg,
      }}>
      {displayName}
    </span>
  );
};
