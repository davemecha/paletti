import { useState } from 'react';
import { PaletteConfig } from './PaletteConfig';

type PaletteId = 'primary' | 'secondary';

export function PaletteSettings() {
  const [expanded, setExpanded] = useState<PaletteId>('primary');

  return (
    <div className="flex flex-col gap-2">
      <PaletteConfig
        label="Primary"
        cssPrefix="primary"
        isExpanded={expanded === 'primary'}
        onToggle={() => setExpanded((prev) => (prev === 'primary' ? 'secondary' : 'primary'))}
      />
      <PaletteConfig
        label="Secondary"
        cssPrefix="secondary"
        isExpanded={expanded === 'secondary'}
        onToggle={() => setExpanded((prev) => (prev === 'secondary' ? 'primary' : 'secondary'))}
      />
    </div>
  );
}
