import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { AuthProvider } from "./providers/auth-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";

import { ThemeProvider } from "./providers/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { LiveCartProvider } from "./providers/live-cart-provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <ThemeProvider>
          <LiveCartProvider>
            <AuthProvider>
              <App />
              <Toaster />
            </AuthProvider>
          </LiveCartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
