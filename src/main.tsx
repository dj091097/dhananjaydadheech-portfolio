import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom CSS variables to match the design reference
const style = document.createElement('style');
style.textContent = `
  :root {
    --primary: 210 29% 24%;
    --primary-foreground: 0 0% 100%;
    
    --secondary: 204 70% 53%;
    --secondary-foreground: 0 0% 100%;
    
    --accent: 35 90% 51%;
    --accent-foreground: 0 0% 100%;
    
    --background: 210 15% 94%;
    --foreground: 210 29% 24%;
    
    --muted: 200 15% 83%;
    --muted-foreground: 0 0% 50%;
    
    --card: 0 0% 100%;
    --card-foreground: 210 29% 24%;
    
    --popover: 0 0% 100%;
    --popover-foreground: 210 29% 24%;
    
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    
    --ring: 210 29% 24%;
    --radius: 0.5rem;
    
    --chart-1: 204 70% 53%;
    --chart-2: 35 90% 51%;
    --chart-3: 145 63% 49%;
    --chart-4: 0 84% 60%;
    --chart-5: 245 58% 51%;
  }

  body {
    font-family: 'Open Sans', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Montserrat', sans-serif;
  }

  .font-mono {
    font-family: 'Roboto Mono', monospace;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
