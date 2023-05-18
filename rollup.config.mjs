import svelte from "rollup-plugin-svelte";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import svg from "rollup-plugin-svg";
import postcss from "rollup-plugin-postcss";
import typescript from "@rollup/plugin-typescript";
import autoPreprocess from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

export default {
	input: "src/test.ts",
	output: {
		file: `public/components.js`,
		format: "iife",
		name: "components",
	},
	plugins: [
		svelte({
			include: ["src/**/*.svelte", "node_modules/**/src/*.svelte"],
			preprocess: autoPreprocess(),
		}),
		resolve(),
		commonjs(),
		typescript({
			declaration: true,
			declarationDir: "public",
			sourceMap: !production,
			
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
