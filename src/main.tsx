import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { seedDemoAccountIfNeeded } from "./lib/seedDemoData";

// Inject demo account on first load
seedDemoAccountIfNeeded();

createRoot(document.getElementById("root")!).render(<App />);
