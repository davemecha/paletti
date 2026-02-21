import { useCallback, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

const SHADE_LABELS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '1000', '1100'] as const;

interface PaletteConfigProps {
  label: string;
  cssPrefix: 'primary' | 'secondary';
}

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function setCssVar(name: string, value: string): void {
  document.documentElement.style.setProperty(name, value);
}

export function PaletteConfig({ label, cssPrefix }: PaletteConfigProps) {
  const [baseColor, setBaseColor] = useState(() => getCssVar(`--color-${cssPrefix}-base`));
  const [hexInput, setHexInput] = useState(() => getCssVar(`--color-${cssPrefix}-base`));
  const [baseStep, setBaseStep] = useState(() => Number(getCssVar(`--${cssPrefix}-base-step`)));
  const [stepL, setStepL] = useState(() => Number(getCssVar(`--step-l-${cssPrefix}`)));
  const [stepC, setStepC] = useState(() => Number(getCssVar(`--step-c-${cssPrefix}`)));

  const applyBaseColor = useCallback(
    (color: string) => {
      setBaseColor(color);
      setHexInput(color);
      setCssVar(`--color-${cssPrefix}-base`, color);
    },
    [cssPrefix],
  );

  const handleHexInput = useCallback(
    (value: string) => {
      setHexInput(value);
      if (/^#[0-9a-f]{6}$/i.test(value)) {
        setBaseColor(value.toLowerCase());
        setCssVar(`--color-${cssPrefix}-base`, value);
      }
    },
    [cssPrefix],
  );

  const handleBaseStep = useCallback(
    (step: number) => {
      setBaseStep(step);
      setCssVar(`--${cssPrefix}-base-step`, String(step));
    },
    [cssPrefix],
  );

  const handleStepL = useCallback(
    (value: number) => {
      setStepL(value);
      setCssVar(`--step-l-${cssPrefix}`, String(value));
    },
    [cssPrefix],
  );

  const handleStepC = useCallback(
    (value: number) => {
      setStepC(value);
      setCssVar(`--step-c-${cssPrefix}`, String(value));
    },
    [cssPrefix],
  );

  return (
    <div className="border-border/40 bg-background-subtle rounded-lg border p-5">
      <h4 className="mb-4 text-lg font-semibold">{label}</h4>

      {/* Base color picker */}
      <div className="mb-5">
        <span className="text-foreground-muted mb-1.5 block text-xs font-medium">Base Color</span>
        <HexColorPicker color={baseColor} onChange={applyBaseColor} style={{ width: '100%' }} />
        <input
          type="text"
          value={hexInput}
          onChange={(e) => handleHexInput(e.target.value)}
          spellCheck={false}
          className="border-border bg-background mt-2 w-full rounded border px-3 py-1.5 font-mono text-sm"
        />
      </div>

      {/* Base step */}
      <div className="mb-5">
        <span className="text-foreground-muted mb-1.5 block text-xs font-medium">
          Base Step &mdash; {SHADE_LABELS[baseStep - 1]}
        </span>
        <input
          type="range"
          min={1}
          max={SHADE_LABELS.length}
          step={1}
          value={baseStep}
          onChange={(e) => handleBaseStep(e.target.valueAsNumber)}
          className="w-full"
        />
        <div className="relative mt-1 h-4">
          {SHADE_LABELS.map((s, i) => {
            const frac = i / (SHADE_LABELS.length - 1);
            const thumbOffset = 8;
            return (
              <span
                key={s}
                className="text-foreground-muted absolute -translate-x-1/2 text-[10px] leading-none"
                style={{ left: `calc(${frac * 100}% + ${(1 - 2 * frac) * thumbOffset}px)` }}
              >
                {s}
              </span>
            );
          })}
        </div>
      </div>

      {/* Step L (lightness) */}
      <div className="mb-5">
        <span className="text-foreground-muted mb-1.5 block text-xs font-medium">Lightness Step</span>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0.02}
            max={0.12}
            step={0.001}
            value={stepL}
            onChange={(e) => handleStepL(e.target.valueAsNumber)}
            className="flex-1"
          />
          <input
            type="number"
            min={0.02}
            max={0.12}
            step={0.001}
            value={stepL}
            onChange={(e) => {
              if (!Number.isNaN(e.target.valueAsNumber)) handleStepL(e.target.valueAsNumber);
            }}
            className="border-border bg-background w-20 rounded border px-2 py-1 text-right font-mono text-sm"
          />
        </div>
      </div>

      {/* Step C (chroma) */}
      <div>
        <span className="text-foreground-muted mb-1.5 block text-xs font-medium">Chroma Step</span>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={-0.05}
            max={0.05}
            step={0.001}
            value={stepC}
            onChange={(e) => handleStepC(e.target.valueAsNumber)}
            className="flex-1"
          />
          <input
            type="number"
            min={-0.05}
            max={0.05}
            step={0.001}
            value={stepC}
            onChange={(e) => {
              if (!Number.isNaN(e.target.valueAsNumber)) handleStepC(e.target.valueAsNumber);
            }}
            className="border-border bg-background w-20 rounded border px-2 py-1 text-right font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
}
