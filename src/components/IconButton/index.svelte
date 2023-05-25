<script lang="ts">
	import type { SvelteComponent } from "svelte";
	import Icon from "./../Icon/index.svelte";

	export let iconName: typeof SvelteComponent | null = null;
	export let iconText: string | null = null;
	export let selected = false;
	export let spin = false;
	export let tabindex = 0;
	export { className as class };

	let className = "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	on:click
	class:selected
	class={className}
	{tabindex}
>
	{#if selected === true}
		<Icon
			{iconName}
			{iconText}
			{spin}
			color="--figma-color-icon-onbrand"
		/>
	{:else}
		<Icon
			{iconName}
			{iconText}
			{spin}
			color="--figma-color-icon"
		/>
	{/if}
</div>

<style>
	div {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		width: var(--size-medium);
		height: var(--size-medium);
		border-radius: var(--border-radius-small);
		border: 2px solid transparent;
	}
	div:hover {
		background: var(--figma-color-bg-hover);
	}
	div:active,
	div:focus {
		border: 2px solid var(--figma-color-border-brand-strong);
		outline: none;
	}

	.selected {
		background-color: var(--figma-color-bg-selected-strong);
	}
	.selected:hover {
		background-color: var(--figma-color-bg-selected-strong);
	}
	.selected:active,
	.selected:focus {
		border: 2px solid var(--figma-color-border-selected-strong);
	}
</style>
