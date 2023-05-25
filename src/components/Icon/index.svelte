<script lang="ts">
	import type { SvelteComponent } from "svelte";

	export let iconName: typeof SvelteComponent | null = null;
	export let spin = false;
	export let iconText: string | null = null;
	export let color = "--figma-color-icon";
	export { className as class };

	let className = "";
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class:spin
	class="icon-component {className}"
	style="color: var({color}); fill: var({color})"
	on:click
>
	{#if iconText}
		{iconText}
	{:else if iconName !== null}
		<svelte:component this={iconName} />
	{/if}
</div>

<style>
	.icon-component {
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: default;
		width: var(--size-medium);
		height: var(--size-medium);
		font-family: var(--font-stack);
		font-size: var(--font-size-xsmall);
		user-select: none;
	}

	.spin {
		animation: rotating 1s linear infinite;
	}

	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	:global(.icon-component *) {
		fill: inherit;
		color: inherit;
	}
</style>
