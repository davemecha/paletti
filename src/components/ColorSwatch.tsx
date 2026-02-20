interface ColorSwatchProps {
  label: string;
  bgClass: string;
}

export function ColorSwatch({ label, bgClass }: ColorSwatchProps) {
  return (
    <div>
      <div className={`h-24 rounded-lg shadow-sm ${bgClass}`} />
      <p className="font-heading mt-2 text-sm font-semibold">{label}</p>
      <p className="text-foreground-muted text-xs">{bgClass}</p>
    </div>
  );
}
