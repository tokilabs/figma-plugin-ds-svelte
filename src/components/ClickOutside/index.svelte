<script lang="ts">
	import { createEventDispatcher } from "svelte";

	export let exclude: HTMLElement[] = [];

	let child: HTMLElement;

	const dispatch = createEventDispatcher<{
		clickoutside: { originalEvent: MouseEvent };
	}>();

	function isExcluded(target: EventTarget | null): boolean {
		let parent: EventTarget | null = target;

		while (parent) {
			if (exclude.includes(parent as HTMLElement) || parent === child) {
				return true;
			}

			parent = (parent as HTMLElement).parentNode;
		}

		return false;
	}

	function onClickOutside(event: MouseEvent) {
		if (!isExcluded(event.target)) {
			dispatch("clickoutside", { originalEvent: event });
		}
	}
</script>

<svelte:body on:click={onClickOutside} />
<div bind:this={child}>
	<slot />
</div>
