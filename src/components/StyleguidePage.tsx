import { StyleguideHeader } from "./StyleguideHeader";
import { ColorPaletteSection } from "./ColorPaletteSection";
import { SemanticColorsSection } from "./SemanticColorsSection";

export function StyleguidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-6 py-12 bg-pr">
        <StyleguideHeader />
        <ColorPaletteSection />
        <SemanticColorsSection />
      </div>
    </div>
  );
}
