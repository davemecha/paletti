import { ThemeToggle } from './ThemeToggle';

export function StyleguideHeader() {
  return (
    <header className="mb-12">
      <h1 className="mb-1">Styleguide</h1>
      <p className="text-foreground-muted">Design system and component documentation for paletti</p>
      <ThemeToggle />
    </header>
  );
}
