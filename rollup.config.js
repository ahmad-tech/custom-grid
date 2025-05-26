import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { readFileSync } from "fs";
import postcss from "rollup-plugin-postcss";
import alias from "@rollup/plugin-alias";
import { babel } from "@rollup/plugin-babel";
import path from "path";

const pkg = JSON.parse(
  readFileSync(new URL("./package.json", import.meta.url))
);

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
  ],
  plugins: [
    alias({
      entries: [
        { find: "@", replacement: path.resolve("src") },
        { find: "@lib", replacement: path.resolve("src/lib") },
        { find: "@components", replacement: path.resolve("src/components") },
        { find: "@types", replacement: path.resolve("src/types") },
      ],
    }),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    postcss({
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: true,
      inlineSources: true,
      resolveJsonModule: true,
      exclude: ["node_modules", "dist"],
    }),
  ],
};
