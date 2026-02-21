import { useCallback, useState } from 'react';
import { ColorSwatch } from './ColorSwatch';
import { SemanticPalettePicker } from './SemanticPalettePicker';

const SEMANTIC_KEYS = [
  'background',
  'background-subtle',
  'foreground',
  'foreground-muted',
  'primary',
  'secondary',
  'accent',
  'border',
] as const;

type SemanticKey = (typeof SEMANTIC_KEYS)[number];

const LABELS: Record<SemanticKey, string> = {
  background: 'Background',
  'background-subtle': 'Background Subtle',
  foreground: 'Foreground',
  'foreground-muted': 'Foreground Muted',
  primary: 'Primary',
  secondary: 'Secondary',
  accent: 'Accent',
  border: 'Border',
};

const BG_CLASS: Record<SemanticKey, string> = {
  background: 'bg-background',
  'background-subtle': 'bg-background-subtle',
  foreground: 'bg-foreground',
  'foreground-muted': 'bg-foreground-muted',
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  border: 'bg-border',
};

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function setCssVar(name: string, value: string): void {
  document.documentElement.style.setProperty(name, value);
}

function readMappings(): Record<string, string> {
  const m: Record<string, string> = {};
  for (const mode of ['light', 'dark'] as const) {
    for (const key of SEMANTIC_KEYS) {
      m[`${mode}-${key}`] = getCssVar(`--${mode}-${key}`);
    }
  }
  return m;
}

interface ActivePicker {
  mode: 'light' | 'dark';
  key: SemanticKey;
}

function SemanticGrid({
  mode,
  mappings,
  activePicker,
  onSwatchClick,
  onSelect,
  onClose,
}: {
  mode: 'light' | 'dark';
  mappings: Record<string, string>;
  activePicker: ActivePicker | null;
  onSwatchClick: (mode: 'light' | 'dark', key: SemanticKey) => void;
  onSelect: (mode: 'light' | 'dark', key: SemanticKey, value: string) => void;
  onClose: () => void;
}) {
  return (
    <div className={`${mode} bg-background-subtle text-foreground mb-8 rounded-xl p-6`}>
      <h4 className="mb-4">{mode === 'light' ? 'Light' : 'Dark'} Mode Colors</h4>
      <div className="grid grid-cols-4 gap-4">
        {SEMANTIC_KEYS.map((key) => {
          const isOpen = activePicker?.mode === mode && activePicker.key === key;
          return (
            <div key={key} className="relative">
              <ColorSwatch
                label={LABELS[key]}
                bgClass={BG_CLASS[key]}
                onClick={() => onSwatchClick(mode, key)}
                isActive={isOpen}
              />
              {isOpen && (
                <SemanticPalettePicker
                  currentValue={mappings[`${mode}-${key}`] ?? ''}
                  onSelect={(value) => onSelect(mode, key, value)}
                  onClose={onClose}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function SemanticColorsSection() {
  const [mappings, setMappings] = useState(readMappings);
  const [activePicker, setActivePicker] = useState<ActivePicker | null>(null);

  const handleSwatchClick = useCallback((mode: 'light' | 'dark', key: SemanticKey) => {
    setActivePicker((prev) => (prev?.mode === mode && prev.key === key ? null : { mode, key }));
  }, []);

  const handleSelect = useCallback((mode: 'light' | 'dark', key: SemanticKey, value: string) => {
    const varName = `--${mode}-${key}`;
    setCssVar(varName, value);
    setMappings((prev) => ({ ...prev, [`${mode}-${key}`]: value }));
    setActivePicker(null);
  }, []);

  const handleClose = useCallback(() => setActivePicker(null), []);

  return (
    <section className="mb-16">
      <h2 className="mb-8">Semantic Colors</h2>
      <SemanticGrid
        mode="light"
        mappings={mappings}
        activePicker={activePicker}
        onSwatchClick={handleSwatchClick}
        onSelect={handleSelect}
        onClose={handleClose}
      />
      <SemanticGrid
        mode="dark"
        mappings={mappings}
        activePicker={activePicker}
        onSwatchClick={handleSwatchClick}
        onSelect={handleSelect}
        onClose={handleClose}
      />
    </section>
  );
}
