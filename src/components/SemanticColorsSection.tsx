import { useCallback, useMemo, useState } from 'react';
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

function setCssVar(name: string, value: string): void {
  document.documentElement.style.setProperty(name, value);
}

const DEFAULT_MAPPINGS: Record<string, string> = {
  'light-background': 'var(--color-gray-100)',
  'light-background-subtle': 'var(--color-gray-200)',
  'light-foreground': 'var(--color-gray-900)',
  'light-foreground-muted': 'var(--color-gray-800)',
  'light-primary': 'var(--color-primary-700)',
  'light-secondary': 'var(--color-secondary-900)',
  'light-accent': 'var(--color-accent-600)',
  'light-border': 'var(--color-gray-400)',
  'dark-background': 'var(--color-gray-950)',
  'dark-background-subtle': 'var(--color-gray-900)',
  'dark-foreground': 'var(--color-gray-50)',
  'dark-foreground-muted': 'var(--color-gray-200)',
  'dark-primary': 'var(--color-primary-200)',
  'dark-secondary': 'var(--color-secondary-400)',
  'dark-accent': 'var(--color-accent-200)',
  'dark-border': 'var(--color-gray-500)',
};

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
  const otherSelectedValues = useMemo(() => {
    if (!activePicker || activePicker.mode !== mode) return new Set<string>();
    const s = new Set<string>();
    for (const k of SEMANTIC_KEYS) {
      if (k !== activePicker.key) {
        const v = mappings[`${mode}-${k}`];
        if (v) s.add(v);
      }
    }
    return s;
  }, [activePicker, mode, mappings]);

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
                  otherSelectedValues={otherSelectedValues}
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
  const [mappings, setMappings] = useState(DEFAULT_MAPPINGS);
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
