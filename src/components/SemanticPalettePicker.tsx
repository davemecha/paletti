import { useEffect, useRef } from 'react';
import { cn } from '../lib/cn';

const PALETTES = [
  {
    name: 'Primary',
    shades: [
      'bg-primary-50',
      'bg-primary-100',
      'bg-primary-200',
      'bg-primary-300',
      'bg-primary-400',
      'bg-primary-500',
      'bg-primary-600',
      'bg-primary-700',
      'bg-primary-800',
      'bg-primary-900',
      'bg-primary-1000',
      'bg-primary-1100',
    ],
  },
  {
    name: 'Secondary',
    shades: [
      'bg-secondary-50',
      'bg-secondary-100',
      'bg-secondary-200',
      'bg-secondary-300',
      'bg-secondary-400',
      'bg-secondary-500',
      'bg-secondary-600',
      'bg-secondary-700',
      'bg-secondary-800',
      'bg-secondary-900',
      'bg-secondary-1000',
      'bg-secondary-1100',
    ],
  },
  {
    name: 'Accent',
    shades: [
      'bg-accent-50',
      'bg-accent-100',
      'bg-accent-200',
      'bg-accent-300',
      'bg-accent-400',
      'bg-accent-500',
      'bg-accent-600',
      'bg-accent-700',
      'bg-accent-800',
      'bg-accent-900',
      'bg-accent-1000',
      'bg-accent-1100',
    ],
  },
  {
    name: 'Gray',
    shades: [
      'bg-gray-50',
      'bg-gray-100',
      'bg-gray-200',
      'bg-gray-300',
      'bg-gray-400',
      'bg-gray-500',
      'bg-gray-600',
      'bg-gray-700',
      'bg-gray-800',
      'bg-gray-900',
      'bg-gray-950',
    ],
  },
];

const BW = [
  { label: 'White', value: '#fff' },
  { label: 'Black', value: '#000' },
] as const;

function toVarRef(bgClass: string): string {
  return `var(--color-${bgClass.slice(3)})`;
}

type SelectionKind = 'current' | 'other' | false;

function getSelection(value: string, currentValue: string, otherSelected: ReadonlySet<string>): SelectionKind {
  if (currentValue === value) return 'current';
  if (otherSelected.has(value)) return 'other';
  return false;
}

interface SemanticPalettePickerProps {
  currentValue: string;
  otherSelectedValues: ReadonlySet<string>;
  onSelect: (varRef: string) => void;
  onClose: () => void;
}

export function SemanticPalettePicker({
  currentValue,
  otherSelectedValues,
  onSelect,
  onClose,
}: SemanticPalettePickerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className="border-border/60 bg-background absolute z-20 mt-1 w-max rounded-lg border p-3 shadow-lg">
      {PALETTES.map((palette) => (
        <div key={palette.name} className="mb-2 flex items-center gap-2">
          <span className="text-foreground-muted w-20 shrink-0 text-[10px] font-medium">{palette.name}</span>
          <div className="flex gap-0.5">
            {palette.shades.map((bgClass) => {
              const varRef = toVarRef(bgClass);
              const selection = getSelection(varRef, currentValue, otherSelectedValues);
              return (
                <button
                  key={bgClass}
                  onClick={() => onSelect(varRef)}
                  title={bgClass.slice(3)}
                  className={cn(
                    'border-border/40 flex h-5 w-5 items-center justify-center rounded-sm border transition-transform hover:scale-125',
                    bgClass,
                  )}
                >
                  {selection && (
                    <span
                      className={cn(
                        'flex items-center justify-center rounded-full bg-black/50',
                        selection === 'current' ? 'h-4 w-4' : 'h-3 w-3',
                      )}
                    >
                      <i className={cn('ti ti-check text-white', selection === 'current' ? 'text-xs' : 'text-[8px]')} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Black & White */}
      <div className="flex items-center gap-2">
        <span className="text-foreground-muted w-20 shrink-0 text-[10px] font-medium">B / W</span>
        <div className="flex gap-0.5">
          {BW.map((entry) => {
            const selection = getSelection(entry.value, currentValue, otherSelectedValues);
            return (
              <button
                key={entry.label}
                onClick={() => onSelect(entry.value)}
                title={entry.label}
                className="border-border/40 flex h-5 w-5 items-center justify-center rounded-sm border transition-transform hover:scale-125"
                style={{ backgroundColor: entry.value }}
              >
                {selection && (
                  <span
                    className={cn(
                      'flex items-center justify-center rounded-full bg-black/50',
                      selection === 'current' ? 'h-4 w-4' : 'h-3 w-3',
                    )}
                  >
                    <i className={cn('ti ti-check text-white', selection === 'current' ? 'text-xs' : 'text-[8px]')} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
