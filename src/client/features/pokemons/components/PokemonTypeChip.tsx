import { TYPE_COLORS } from '@/client/consts/pokemon';

interface PokemonTypeChipProps {
  typeName: string;
}

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
