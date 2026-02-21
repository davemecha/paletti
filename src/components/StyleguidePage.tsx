import { useState } from 'react';
import { StyleguideHeader } from './StyleguideHeader';
import { PaletteSettings } from './PaletteSettings';
import { ColorPaletteSection } from './ColorPaletteSection';
import { SemanticColorsSection } from './SemanticColorsSection';

export function StyleguidePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="bg-background text-foreground flex min-h-screen">
      {/* Sidebar wrapper — negative margin slides it off-screen when collapsed */}
      <div className={`shrink-0 transition-[margin] duration-300 ease-in-out ${sidebarOpen ? '' : '-ml-80'}`}>
        <div className="sticky top-0 flex h-screen w-80 flex-col">
          <div className="border-border/40 bg-background-subtle flex h-full flex-col border-r">
            <div className="border-border/40 flex items-center justify-between border-b px-4 py-3">
              <span className="text-foreground-muted text-xs font-semibold tracking-wider uppercase">Settings</span>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <PaletteSettings />
            </div>
          </div>

          {/* Toggle tab — always visible, anchored to the sidebar's right edge */}
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="border-border/40 bg-background-subtle text-foreground-muted hover:text-foreground absolute top-3 left-full z-10 rounded-r-md border-t border-r border-b px-1.5 py-2 text-xs transition-colors"
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          >
            {sidebarOpen ? '«' : '»'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <main className="min-w-0 flex-1">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <StyleguideHeader />
          <ColorPaletteSection />
          <SemanticColorsSection />
        </div>
      </main>
    </div>
  );
}
