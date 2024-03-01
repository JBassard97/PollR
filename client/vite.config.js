import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// ! Uncomment later
// import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // ! Update and uncomment to add PWA functionality
    // VitePWA({
    //   manifest: {
    //     name: "Your App Name",
    //     short_name: "App",
    //     start_url: "/",
    //     display: "standalone",
    //     background_color: "#ffffff",
    //     theme_color: "#000000",
    //     icons: [
    //       {
    //         src: "/icons/icon-192x192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/icons/icon-512x512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //     ],
    //   },
    // }),
  ],
  server: {
    port: 3000,
    open: true,
    proxy: {
      "/graphql": {
        target: "http://localhost:3001",
        secure: false,
        changeOrigin: true,
      },
    },
  },
});
