import { defineConfig } from "tsup";

const inWatchMode = process.argv.includes("--watch");

export default defineConfig({
  clean: !inWatchMode,
  entry: ["./src/index.ts"],
  format: ["esm", "cjs"],
  watch: inWatchMode,
  external: ["react", "react-dom", "react/jsx-runtime"],
  dts: true,
  silent: true,
  bundle: true,
  sourcemap: !inWatchMode,
  splitting: false,
  minify: !inWatchMode,
  metafile: !inWatchMode,
  onSuccess() {
    return new Promise((resolve) => {
      resolve(console.log("Build completed successfully!"));
    });
  },
  outDir: "dist",
  target: "esnext",
});
