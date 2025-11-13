interface StatItemProps {
  statName: string;
  statValue: number;
}

export const StatItem = ({ statName, statValue }: StatItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 15 }).map((_, index) => {
        const isFilled = index >= 15 - statValue;
        return <span key={index} className={`w-full h-2 ${isFilled ? 'bg-blue-400' : 'bg-white'}`} />;
      })}
      <h5 className="text-sm font-bold text-center">{statName}</h5>
    </div>
  );
};
