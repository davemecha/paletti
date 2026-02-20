export interface Shade {
  label: string;
  bgClass: string;
}

interface ColorScaleProps {
  name: string;
  subtitle?: string;
  shades: Shade[];
}

export function ColorScale({ name, subtitle, shades }: ColorScaleProps) {
  return (
    <div className="mb-10">
      <h3 className="mb-1">{name}</h3>
      {subtitle && <p className="text-foreground-muted mb-4 text-sm">{subtitle}</p>}
      <div className="grid grid-cols-6 gap-2 lg:grid-cols-12">
        {shades.map((shade) => (
          <div key={shade.label}>
            <div className={`aspect-square rounded-lg shadow-sm ${shade.bgClass}`} />
            <span className="text-foreground-muted mt-1.5 block text-center text-xs">{shade.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
