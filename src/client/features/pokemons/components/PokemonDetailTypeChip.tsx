import { TYPE_COLORS } from '@/client/consts/pokemon';

interface PokemonDetailTypeChipProps {
  typeName: string;
}

export const PokemonDetailTypeChip = ({ typeName }: PokemonDetailTypeChipProps) => {
  const normalizedTypeName = typeName.toLowerCase();
  const typeColors = TYPE_COLORS[normalizedTypeName] || { bg: '#777777', fg: '#FFFFFF' };
  const displayName = typeName.charAt(0).toUpperCase() + typeName.slice(1);

  return (
    <span
      className="inline-block px-5 rounded-md"
      style={{
        backgroundColor: typeColors.bg,
        color: typeColors.fg,
      }}>
      {displayName}
    </span>
  );
};
