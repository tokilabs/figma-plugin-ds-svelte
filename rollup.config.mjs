import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import svg from "rollup-plugin-svg";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import autoPreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: "src/index.ts",
	output: {
		file: `public/components.js`,
		format: "iife",
		name: "components",
	},
	plugins: [
		svelte({
			// Only compile your local source files
			include: [
				"src/**/*.svelte",
				"node_modules/svelte-click-outside/src/*.svelte",
			],
			preprocess: autoPreprocess(),
		}),
		resolve({
			// Helps prevent bundling the same package multiple times
			dedupe: ["svelte"],
		}),
		commonjs(),
		typescript({
			declaration: true,
			declarationDir: "public",
			sourceMap: !production,
			include: ["src/**/*.ts", "ambient.d.ts"],
		}),
		svg(),
		postcss({
			plugins: [],
		}),
		!production && serve("public"),
		!production && livereload("public"),
	],
	watch: {
		clearScreen: false,
	},
};
