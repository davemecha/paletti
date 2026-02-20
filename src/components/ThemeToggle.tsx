import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="fixed top-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-lg
                 bg-background-subtle text-foreground shadow-md
                 hover:bg-border transition-colors cursor-pointer"
    >
      <i className={`ti ${isDark ? "ti-sun" : "ti-moon"} text-xl`} />
    </button>
  );
}
