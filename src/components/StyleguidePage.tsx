import { StyleguideHeader } from './StyleguideHeader';
import { ColorPaletteSection } from './ColorPaletteSection';
import { SemanticColorsSection } from './SemanticColorsSection';

export function StyleguidePage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="bg-pr mx-auto max-w-6xl px-6 py-12">
        <StyleguideHeader />
        <ColorPaletteSection />
        <SemanticColorsSection />
      </div>
    </div>
  );
}
