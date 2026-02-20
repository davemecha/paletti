interface ColorSwatchProps {
  label: string;
  bgClass: string;
}

export function ColorSwatch({ label, bgClass }: ColorSwatchProps) {
  return (
    <div>
      <div className={`h-24 rounded-lg shadow-sm ${bgClass}`} />
      <p className="mt-2 text-sm font-semibold font-heading">{label}</p>
      <p className="text-xs text-foreground-muted">{bgClass}</p>
    </div>
  );
}
