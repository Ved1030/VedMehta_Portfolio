interface ProficiencyDotsProps {
  level: number;
  color: string;
}

function getLevelLabel(level: number): string {
  if (level >= 85) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  return 'Learning';
}

function getFilledDots(level: number): number {
  if (level >= 90) return 5;
  if (level >= 80) return 4;
  if (level >= 70) return 3;
  if (level >= 60) return 2;
  return 1;
}

export default function ProficiencyDots({ level, color }: ProficiencyDotsProps) {
  const filled = getFilledDots(level);
  const label = getLevelLabel(level);

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full transition-all duration-500"
            style={{
              backgroundColor: i < filled ? color : 'rgba(255,255,255,0.1)',
              boxShadow: i < filled ? `0 0 8px ${color}60` : 'none',
            }}
          />
        ))}
      </div>
      <span
        className="text-[11px] font-semibold uppercase tracking-wider"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
