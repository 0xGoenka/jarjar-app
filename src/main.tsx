import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./globals.css";
import "./assets/font/PublicPixel.ttf";
import { ThemeProvider } from "@/components/theme-provider";
import { ServicesProvider } from "@/domain/core/services";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ServicesProvider>
        <App />
      </ServicesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
