<script lang="ts">
	import { SvelteComponent, onMount } from "svelte";
	import { createEventDispatcher } from "svelte";
	import ClickOutside from "./../ClickOutside/index.svelte";
	import SelectItem from "./../SelectItem/index.svelte";
	import SelectDivider from "./../SelectDivider/index.svelte";
	import Icon from "./../Icon/index.svelte";

	/**
	 * Icon name to be displayed.
	 * @type {typeof SvelteComponent|null}
	 */
	export let iconName: typeof SvelteComponent | null = null;

	/**
	 * Icon text to be displayed.
	 * @type {string|null}
	 */
	export let iconText: string | null = null;

	/**
	 * If true, component will be disabled.
	 * @type {boolean}
	 */
	export let disabled = false;

	/**
	 * If true, MacOS blink style will be applied.
	 * @type {boolean}
	 */
	export let macOSBlink = false;

	/**
	 * List of items to be displayed in the select menu. Each item in the array is an object with
	 * properties `id` (number), `label` (any), `selected` (boolean, optional), and `group` (string, optional).
	 * @type {Array.<{id: number, label: any, selected?: boolean, group?: string}>}
	 */
	export let menuItems: {
		id: number;
		label: any;
		value: any;
		selected?: boolean;
		group?: string;
	}[] = [];

	/**
	 * Text to be displayed when no item is selected.
	 * @type {string}
	 */
	export let placeholder = "Please make a selection.";

	/**
	 * The current selection. This should be an object from your array with properties `id` and `label`.
	 * @type {{id: string|number, label: any}|null}
	 */
	export let value: { id: string | number; label: any };

	/**
	 * Show option group labels
	 * @type {boolean}
	 */
	export let showGroupLabels = false;

	/**
	 * Css classes to be applied to the component.
	 */
	export { className as class };

	const dispatch = createEventDispatcher();
	let className = "";
	let menuWrapper;
	let menuButton: HTMLButtonElement;
	let menuList: HTMLUListElement;
	$: menuItems, updateSelectedAndIds();

	//FUNCTIONS

	//assign id's to the input array
	onMount(async () => {
		updateSelectedAndIds();
	});

	/**
	 * This function runs every time the menuItems array is updated
	 * it will auto assign ids and keep the value var updated
	 */
	function updateSelectedAndIds() {
		if (menuItems) {
			menuItems.forEach((item, index) => {
				//update id
				item["id"] = index;
				//update selection
				if (item.selected === true) {
					value = item;
				}
			});
		}
		//set placeholder
		if (menuItems.length <= 0) {
			placeholder = "There are no items to select";
			disabled = true;
		} else {
			placeholder = "Please make a selection";
			disabled = false;
		}
	}

	function removeHighlight(event: MouseEvent) {
		let target = event.target as HTMLElement;
		let items = Array.from(target.parentNode?.children || []) as HTMLElement[];

		items.forEach((item: HTMLElement) => {
			item.blur();
			item.classList.remove("highlight");
		});
	}

	function hideMenu() {
		(menuList as HTMLElement).classList.add("hidden");
	}

	function showMenu() {
		(menuList as HTMLElement).classList.remove("hidden");
	}

	function setMenuTopPosition(topPos: number) {
		(menuList as HTMLElement).style.top = -Math.abs(topPos) + "px";
	}

	function focusItem(itemId: string | number) {
		let item = (menuList as HTMLElement).querySelector(`[itemId="${itemId}"]`);
		(item as HTMLElement)?.focus();
	}

	function deselectItem(itemId: number) {
		menuItems[itemId].selected = false;
	}

	function selectItem(itemId: number) {
		menuItems[itemId].selected = true;
		updateSelectedAndIds();
		dispatch("change", menuItems[itemId]);
	}

	function blinkAndClose(
		event: MouseEvent,
		itemId: number,
		interval: number,
		times: number
	) {
		//blink the background
		for (var i = 0; i < times; i++) {
			setTimeout(function () {
				(event.target as HTMLElement).classList.toggle("blink");
			}, i * interval);
		}
		//delay closing the menu
		setTimeout(function () {
			hideMenu(); //hide the menu
		}, interval * times + 40);
	}

	function calculateTopPosition(id: string | number) {
		let selectedItem = (menuList as HTMLElement).querySelector(
			`[itemId="${id}"]`
		);
		let parentTop = (menuList as HTMLElement).getBoundingClientRect().top;
		let itemTop = selectedItem?.getBoundingClientRect().top;

		if (itemTop !== undefined) {
			let topPos = itemTop - parentTop - 3;
			setMenuTopPosition(topPos);
		}
	}
	function handleSelection(itemId: number): void {
		// remove current selection if there is one
		if (value) {
			let currentItemId =
				typeof value.id === "number" ? value.id : parseInt(value.id);
			deselectItem(currentItemId);
		}
		selectItem(itemId);
	}

	function handleMenuButtonClick(): void {
		let topPos = 0;

		showMenu();
		if (value) {
			let id = value.id;
			focusItem(id);

			// calculate distance from top to position the dropdown menu
			calculateTopPosition(id);
		} else {
			setMenuTopPosition(0);
			focusItem(0);
		}

		// update size and position based on plugin UI
		resizeAndPosition();
	}

	function handleMenuItemClick(event: MouseEvent): void {
		// find selected item in array
		let itemId = parseInt(
			(event.target as HTMLElement).getAttribute("itemId") || "0"
		);

		handleSelection(itemId);

		if (macOSBlink) {
			blinkAndClose(event, itemId, 70, 4);
		} else {
			hideMenu(); // hide the menu
			(menuButton as HTMLElement).classList.remove("selected"); // remove selected state from button
		}
	}

	function menuClick(event: MouseEvent): void {
		resetMenuProperties();

		if (!event.target) {
			hideMenu();
		} else if ((event.target as HTMLElement).contains(menuButton as Node)) {
			handleMenuButtonClick();
		} else if ((menuList as HTMLElement).contains(event.target as Node)) {
			handleMenuItemClick(event);
		}
	}

	// this function ensures that the select menu
	// fits inside the plugin viewport
	// if its too big, it will resize it and enable a scrollbar
	// if its off screen it will shift the position
	function resizeAndPosition() {
		//set the max height of the menu based on plugin/iframe window
		let maxMenuHeight = window.innerHeight - 16;
		let menuHeight = menuList.offsetHeight;
		let menuResized = false;

		if (menuHeight > maxMenuHeight) {
			menuList.style.height = maxMenuHeight + "px";
			menuResized = true;
		}

		//lets adjust the position of the menu if its cut off from viewport
		let bounding = menuList.getBoundingClientRect();
		let parentBounding = menuButton.getBoundingClientRect();

		if (bounding.top < 0) {
			menuList.style.top = -Math.abs(parentBounding.top - 8) + "px";
		}
		if (
			bounding.bottom >
			(window.innerHeight || document.documentElement.clientHeight)
		) {
			let minTop = -Math.abs(
				parentBounding.top - (window.innerHeight - menuHeight - 8)
			);
			let newTop = -Math.abs(bounding.bottom - window.innerHeight + 16);
			if (menuResized) {
				menuList.style.top = -Math.abs(parentBounding.top - 8) + "px";
			} else if (newTop > minTop) {
				menuList.style.top = minTop + "px";
			} else {
				menuList.style.top = newTop + "px";
			}
		}
	}
	function resetMenuProperties() {
		menuList.style.height = "auto";
		menuList.style.top = "0px";
	}
</script>

<!-- <ClickOutside on:clickoutside={handleClickOutside}> -->
<!-- The following properties were removed 
    
            {disabled}
            {placeholder}
            {showGroupLabels}
            {macOSBlink}

-->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div on:click={menuClick}>
	<div
		on:change
		on:focus
		on:blur
		bind:this={menuWrapper}
		class="wrapper {className}"
	>
		<button
			bind:this={menuButton}
			on:click={menuClick}
			{disabled}
		>
			{#if iconName}
				<span class="icon"
					><Icon
						{iconName}
						color="black3"
					/></span
				>
			{:else if iconText}
				<span class="icon"
					><Icon
						{iconText}
						color="black3"
					/></span
				>
			{/if}

			{#if value}
				<span class="label">{value.label}</span>
			{:else}
				<span class="placeholder">{placeholder}</span>
			{/if}

			{#if !disabled}
				<span class="caret">
					<svg
						width="8"
						height="8"
						viewBox="0 0 8 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M3.64645 5.35359L0.646454 2.35359L1.35356 1.64648L4.00001 4.29293L6.64645 1.64648L7.35356 2.35359L4.35356 5.35359L4.00001 5.70714L3.64645 5.35359Z"
							fill="black"
						/>
					</svg>
				</span>
			{/if}
		</button>

		<ul
			class="menu hidden"
			bind:this={menuList}
		>
			{#if menuItems && menuItems.length > 0}
				{#each menuItems as item, i}
					{#if i === 0}
						{#if item.group && showGroupLabels}
							<SelectDivider label>{item.group}</SelectDivider>
						{/if}
					{:else if i > 0 && item.group && menuItems[i - 1].group != item.group}
						{#if showGroupLabels}
							<SelectDivider />
							<SelectDivider label>{item.group}</SelectDivider>
						{:else}
							<SelectDivider />
						{/if}
					{/if}
					<SelectItem
						on:click={menuClick}
						on:mouseenter={removeHighlight}
						itemId={item.id}
						bind:selected={item.selected}>{item.label}</SelectItem
					>
				{/each}
			{/if}
		</ul>
	</div>
</div>

<!-- </ClickOutside> -->

<style>
	.wrapper {
		position: relative;
	}

	button {
		display: flex;
		align-items: center;
		border: 1px solid transparent;
		height: 30px;
		width: 100%;
		margin: 1px 0 1px 0;
		padding: 4px var(--size-xxsmall) 0px var(--size-xxsmall);
		overflow-y: hidden;
		border-radius: var(--border-radius-small);
		background-color: var(--white);
	}
	button:hover,
	button:active {
		border-color: var(--black1);
	}
	button:hover .placeholder {
		color: var(--black8);
	}
	button:hover .caret svg path,
	button:focus .caret svg path {
		fill: var(--black8);
	}
	button:hover .caret,
	button:focus .caret {
		margin-left: auto;
	}
	button:focus {
		border: 1px solid var(--blue);
		outline: 1px solid var(--blue);
		outline-offset: -2px;
		padding-left: calc(var(--size-xxsmall) + 1px);
	}
	button:focus .placeholder {
		color: var(--black8);
	}
	button:disabled .label {
		color: var(--black3);
	}
	button:disabled:hover {
		justify-content: flex-start;
		border-color: transparent;
	}
	button:disabled:hover .placeholder {
		color: var(--black3);
	}
	button:disabled:hover .caret svg path {
		fill: var(--black3);
	}
	button * {
		pointer-events: none;
	}

	.label,
	.placeholder {
		font-size: var(--font-size-xsmall);
		font-weight: var(--font-weight-normal);
		letter-spacing: var(--font-letter-spacing-neg-xsmall);
		line-height: var(--line-height);
		color: var(--figma-color-text);
		margin-right: 6px;
		margin-top: -3px;
		white-space: nowrap;
		overflow-x: hidden;
		text-overflow: ellipsis;
	}

	.placeholder {
		color: var(--figma-color-text-tertiary);
	}

	.caret {
		display: block;
		margin-top: -1px;
	}

	.caret svg path {
		fill: var(--figma-color-icon-tertiary);
	}

	.icon {
		margin-left: -8px;
		margin-top: -2px;
		margin-right: 0;
	}

	.menu {
		position: absolute;
		top: 32px;
		left: 0;
		width: 100%;
		background-color: var(--color-bg-menu);
		box-shadow: var(--shadow-hud);
		padding: var(--size-xxsmall) 0 var(--size-xxsmall) 0;
		border-radius: var(--border-radius-small);
		margin: 0;
		z-index: 50;
		overflow-x: overlay;
		overflow-y: auto;
	}
	.menu::-webkit-scrollbar {
		width: 12px;
		background-color: transparent;
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=);
		background-repeat: repeat;
		background-size: 100% auto;
	}
	.menu::-webkit-scrollbar-track {
		border: solid 3px transparent;
		-webkit-box-shadow: inset 0 0 10px 10px transparent;
		box-shadow: inset 0 0 10px 10px transparent;
	}
	.menu::-webkit-scrollbar-thumb {
		border: solid 3px transparent;
		border-radius: 6px;
		-webkit-box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
		box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
	}
</style>
