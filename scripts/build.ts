import path from "path";
import tsconfig from "../tsconfig.json" assert { type: "json" };
import esbuild from "esbuild";

const outdir = path.resolve(tsconfig.compilerOptions.outDir);

esbuild
  .build({
    entryPoints: [path.resolve(import.meta.dirname, "..", "lib", "index.ts")],
    format: "esm",
    target: "esnext",
    platform: "node",
    outfile: path.join(outdir, "index.js"),
    bundle: true,
    minify: true,
    external: ["webpack", "child_process", "fs", "path"]
  })
  .catch((error) => {
    console.error("Build failed: ", error);
    process.exit(1);
  });
