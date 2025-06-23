import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@styles": path.resolve(__dirname, "./src/styles"),
            "@project-types": path.resolve(__dirname, "./src/types"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@reducers": path.resolve(__dirname, "./src/reducers"),
            "@contexts": path.resolve(__dirname, "./src/contexts"),
            "@utils": path.resolve(__dirname, "./src/utils"),
        },
    },
});
