import { ThemeToggle } from "./ThemeToggle";

export function StyleguideHeader() {
  return (
    <header className="flex items-center justify-between mb-12">
      <div>
        <h1 className="mb-1">Styleguide</h1>
        <p className="text-foreground-muted">
          Design system and component documentation for paletti
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}
