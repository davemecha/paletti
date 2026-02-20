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
      {subtitle && (
        <p className="text-sm text-foreground-muted mb-4">{subtitle}</p>
      )}
      <div className="grid grid-cols-6 lg:grid-cols-12 gap-2">
        {shades.map((shade) => (
          <div key={shade.label}>
            <div className={`aspect-square rounded-lg shadow-sm ${shade.bgClass}`} />
            <span className="block text-xs text-foreground-muted text-center mt-1.5">
              {shade.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
