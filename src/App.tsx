import { ThemeProvider } from "./components/ThemeProvider";
import { StyleguidePage } from "./components/StyleguidePage";

export default function App() {
  return (
    <ThemeProvider>
      <StyleguidePage />
    </ThemeProvider>
  );
}
