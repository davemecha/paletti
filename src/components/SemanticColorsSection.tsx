import { ColorSwatch } from "./ColorSwatch";

const THEME_COLORS = [
  { label: "Primary", bgClass: "bg-primary" },
  { label: "Secondary", bgClass: "bg-secondary" },
  { label: "Accent", bgClass: "bg-accent" },
];

const SURFACE_COLORS = [
  { label: "Background", bgClass: "bg-background" },
  { label: "Background Subtle", bgClass: "bg-background-subtle" },
  { label: "Foreground", bgClass: "bg-foreground" },
  { label: "Foreground Muted", bgClass: "bg-foreground-muted" },
];

function SemanticGrid({ mode }: { mode: "light" | "dark" }) {
  return (
    <div className={`${mode} bg-background-subtle text-foreground rounded-xl p-6 mb-8`}>
      <h4 className="mb-4">{mode === "light" ? "Light" : "Dark"} Mode Colors</h4>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {THEME_COLORS.map((color) => (
          <ColorSwatch key={color.label} {...color} />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {SURFACE_COLORS.map((color) => (
          <ColorSwatch key={color.label} {...color} />
        ))}
      </div>
    </div>
  );
}

export function SemanticColorsSection() {
  return (
    <section className="mb-16">
      <h2 className="mb-8">Semantic Colors</h2>
      <SemanticGrid mode="light" />
      <SemanticGrid mode="dark" />
    </section>
  );
}
