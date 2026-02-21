interface ColorSwatchProps {
  label: string;
  bgClass: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function ColorSwatch({ label, bgClass, onClick, isActive }: ColorSwatchProps) {
  return (
    <div className="relative">
      <div
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
        onClick={onClick}
        onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
        className={`ring-border/15 h-24 rounded-lg ring-1 ${bgClass} ${onClick ? 'hover:ring-foreground/30 cursor-pointer transition-shadow hover:ring-2' : ''} ${isActive ? 'ring-foreground ring-2' : ''}`}
      />
      <p className="font-heading mt-2 text-sm font-semibold">{label}</p>
    </div>
  );
}
