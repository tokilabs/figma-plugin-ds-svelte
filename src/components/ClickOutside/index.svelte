<script lang="ts">
	/**
	 * @module ClickOutside
	 */

	import { createEventDispatcher } from "svelte";

	/**
	 * A list of HTMLElements that are to be excluded from the clickoutside event.
	 * @type {HTMLElement[]}
	 */
	export let exclude: HTMLElement[] = [];

	let child: HTMLElement;

	/**
	 * Dispatches the 'clickoutside' event. The 'clickoutside' event is dispatched when a click occurs outside
	 * of the child element and not on any of the excluded elements.
	 */
	const dispatch = createEventDispatcher<{
		clickoutside: { originalEvent: MouseEvent };
	}>();

	/**
	 * Checks whether a click event target is among the excluded elements or the child element.
	 *
	 * @param {EventTarget | null} target - The event target to check
	 * @returns {boolean} - Returns true if the event target is among the excluded elements or the child element, else false
	 */
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

	/**
	 * Handles the click event on the body and dispatches the 'clickoutside' event
	 * if the click event target is not among the excluded elements or the child element.
	 *
	 * @param {MouseEvent} event - The click event
	 */
	function onClickOutside(event: MouseEvent) {
		if (!isExcluded(event.target)) {
			dispatch("clickoutside", { originalEvent: event });
		}
	}
</script>

<svelte:body on:click={onClickOutside} />

<!-- 
  @component ClickOutside * This component dispatches a `clickoutside` event
when a click is made outside the child element * and not on any of the excluded
elements. * * The child element is defined by the `slot` and the excluded
elements can be defined via the `exclude` prop. 
 -->
<div bind:this={child}>
	<slot />
</div>
