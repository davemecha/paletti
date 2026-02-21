import { useEffect, useState } from 'react';
import { ColorScale, type Shade } from './ColorScale';

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function readBaseSteps(): { primary: number; secondary: number; accent: number } {
  return {
    primary: Number(getCssVar('--primary-base-step')),
    secondary: Number(getCssVar('--secondary-base-step')),
    accent: Number(getCssVar('--accent-base-step')),
  };
}

const primaryShades: Shade[] = [
  { label: '50', bgClass: 'bg-primary-50' },
  { label: '100', bgClass: 'bg-primary-100' },
  { label: '200', bgClass: 'bg-primary-200' },
  { label: '300', bgClass: 'bg-primary-300' },
  { label: '400', bgClass: 'bg-primary-400' },
  { label: '500', bgClass: 'bg-primary-500' },
  { label: '600', bgClass: 'bg-primary-600' },
  { label: '700', bgClass: 'bg-primary-700' },
  { label: '800', bgClass: 'bg-primary-800' },
  { label: '900', bgClass: 'bg-primary-900' },
  { label: '1000', bgClass: 'bg-primary-1000' },
  { label: '1100', bgClass: 'bg-primary-1100' },
];

const secondaryShades: Shade[] = [
  { label: '50', bgClass: 'bg-secondary-50' },
  { label: '100', bgClass: 'bg-secondary-100' },
  { label: '200', bgClass: 'bg-secondary-200' },
  { label: '300', bgClass: 'bg-secondary-300' },
  { label: '400', bgClass: 'bg-secondary-400' },
  { label: '500', bgClass: 'bg-secondary-500' },
  { label: '600', bgClass: 'bg-secondary-600' },
  { label: '700', bgClass: 'bg-secondary-700' },
  { label: '800', bgClass: 'bg-secondary-800' },
  { label: '900', bgClass: 'bg-secondary-900' },
  { label: '1000', bgClass: 'bg-secondary-1000' },
  { label: '1100', bgClass: 'bg-secondary-1100' },
];

const accentShades: Shade[] = [
  { label: '50', bgClass: 'bg-accent-50' },
  { label: '100', bgClass: 'bg-accent-100' },
  { label: '200', bgClass: 'bg-accent-200' },
  { label: '300', bgClass: 'bg-accent-300' },
  { label: '400', bgClass: 'bg-accent-400' },
  { label: '500', bgClass: 'bg-accent-500' },
  { label: '600', bgClass: 'bg-accent-600' },
  { label: '700', bgClass: 'bg-accent-700' },
  { label: '800', bgClass: 'bg-accent-800' },
  { label: '900', bgClass: 'bg-accent-900' },
  { label: '1000', bgClass: 'bg-accent-1000' },
  { label: '1100', bgClass: 'bg-accent-1100' },
];

export function ColorPaletteSection() {
  const [steps, setSteps] = useState(readBaseSteps);

  useEffect(() => {
    const handler = () => setSteps(readBaseSteps());
    window.addEventListener('palette-step-change', handler);
    return () => window.removeEventListener('palette-step-change', handler);
  }, []);

  return (
    <section className="mb-16">
      <h2 className="mb-8">Color Palette</h2>
      <ColorScale
        name="Primary Color Scale"
        subtitle="Shades from 50 (lightest) to 1100 (darkest)"
        shades={primaryShades}
        highlightIndex={steps.primary - 1}
      />
      <ColorScale
        name="Secondary Color Scale"
        subtitle="Shades from 50 (lightest) to 1100 (darkest)"
        shades={secondaryShades}
        highlightIndex={steps.secondary - 1}
      />
      <ColorScale
        name="Accent Color Scale"
        subtitle="Shades from 50 (lightest) to 1100 (darkest)"
        shades={accentShades}
        highlightIndex={steps.accent - 1}
      />
    </section>
  );
}
