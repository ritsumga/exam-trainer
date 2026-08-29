import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/exam-trainer/",
  build: { assetsInlineLimit: 0 },
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      strategies: "generateSW",
      includeAssets: ["icon.svg", "pwa-192x192.png", "pwa-512x512.png", "maskable-512x512.png"],
      manifest: {
        name: "Exam Trainer",
        short_name: "Exam Trainer",
        description: "試験に依存しないローカルファースト学習アプリ",
        lang: "ja",
        start_url: "/exam-trainer/",
        scope: "/exam-trainer/",
        display: "standalone",
        theme_color: "#0f172a",
        background_color: "#f8fafc",
        icons: [
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ]
      },
      workbox: {
        cleanupOutdatedCaches: true,
        clientsClaim: false,
        skipWaiting: false,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff2}"],
        navigateFallback: "index.html"
      }
    })
  ]
});
