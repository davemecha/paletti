import { useState } from 'react';
import { PaletteConfig } from './PaletteConfig';

type PaletteId = 'primary' | 'secondary' | 'accent';

export function PaletteSettings() {
  const [expanded, setExpanded] = useState<PaletteId>('primary');

  const toggle = (id: PaletteId) => () => {
    setExpanded((prev) => (prev === id ? prev : id));
  };

  return (
    <div className="flex flex-col gap-2">
      <PaletteConfig
        label="Primary"
        cssPrefix="primary"
        isExpanded={expanded === 'primary'}
        onToggle={toggle('primary')}
      />
      <PaletteConfig
        label="Secondary"
        cssPrefix="secondary"
        isExpanded={expanded === 'secondary'}
        onToggle={toggle('secondary')}
      />
      <PaletteConfig label="Accent" cssPrefix="accent" isExpanded={expanded === 'accent'} onToggle={toggle('accent')} />
    </div>
  );
}
