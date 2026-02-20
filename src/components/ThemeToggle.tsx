import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="bg-background-subtle text-foreground hover:bg-border fixed top-6 right-6 z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg shadow-md transition-colors"
    >
      <i className={`ti ${isDark ? 'ti-sun' : 'ti-moon'} text-xl`} />
    </button>
  );
}
