import path from "path";
import tsconfig from "../tsconfig.json" assert { type: "json" };
import esbuild from "esbuild";

const __dirname = path.resolve();

const outdir = path.resolve(__dirname, tsconfig.compilerOptions.outDir);

esbuild
  .build({
    entryPoints: [path.resolve(__dirname, "lib", "index.ts")],
    format: "esm",
    target: "esnext",
    platform: "node",
    outfile: path.resolve(outdir, "index.js"),
    bundle: true,
    minify: true,
    external: ["webpack", "ws", "child_process", "fs", "path"]
  })
  .catch((error) => {
    console.error("Build failed:", error);
    process.exit(1);
  });
