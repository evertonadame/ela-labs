import { defineConfig } from "tsup";

const inWatchMode = process.argv.includes("--watch");

export default defineConfig({
  clean: !inWatchMode,
  entry: ["./src/index.tsx", "./src/index.css"],
  format: ["esm", "cjs"],
  watch: inWatchMode,
  dts: true,
  silent: true,
  external: ["react", "react-dom", "react/jsx-runtime", "@ela-labs/core"],
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
