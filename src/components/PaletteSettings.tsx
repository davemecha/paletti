import { PaletteConfig } from './PaletteConfig';

export function PaletteSettings() {
  return (
    <section className="mb-16">
      <h2 className="mb-8">Palette Settings</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <PaletteConfig label="Primary" cssPrefix="primary" />
        <PaletteConfig label="Secondary" cssPrefix="secondary" />
      </div>
    </section>
  );
}
