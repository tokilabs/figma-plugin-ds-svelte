<script lang="ts" context="module">
	// Define the type for menu items
	export type MenuItem = {
		id: string;
		value: string;
		label: string;
		group: null;
		selected: boolean;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import ClickOutside from 'svelte-click-outside';
	import SelectItem from './../SelectItem/index.svelte';
	import SelectDivider from './../SelectDivider/index.svelte';
	import Icon from './../Icon/index.svelte';

	// TODO: Add a keytrap so when the user press esc on a open SelectMenu it closes it, instead of closing the modal

	export let iconName: string | null = null;
	export let iconText: string | null = null;
	export let disabled: boolean = false;
	export let macOSBlink: boolean = false;
	export let menuItems: MenuItem[] = [];
	export let placeholder: string = 'Please make a selection.';
	export let selectedItem: MenuItem | null = null;
	export let showGroupLabels: boolean = false;
	let className: string = '';
	export { className as class };

	const dispatch = createEventDispatcher();
	// let groups = checkGroups();
	let menuWrapper: HTMLElement;
	let menuButton: HTMLElement;
	let menuList: HTMLElement;

	// Define the onMount function
	onMount(async () => {
		updateSelectedAndIds();
	});

	$: {
		console.clear();
		updateSelectedAndIds();
		console.log('SelectMenu:: Got Menu Items: ', menuItems);
	}

	function updateSelectedAndIds(): void {
		updateSelection();
		updateDisabledState();
	}

	function updateSelection() {
		if (menuItems) {
			menuItems.forEach((item) => {
				if (item.selected === true) {
					selectedItem = item;
				}
			});
		}
	}

	function updateDisabledState() {
		if (menuItems.length <= 0) {
			disabled = true;
		} else {
			disabled = false;
		}
	}

	function checkGroups(): boolean {
		let groupCount = 0;
		if (menuItems) {
			menuItems.forEach((item) => {
				if (item.group != null) {
					groupCount++;
				}
			});
			return groupCount === menuItems.length;
		}
		return false;
	}

	function removeHighlight(event: Event): void {
		let items = Array.from(
			(event.target as HTMLElement)?.parentNode?.children || []
		) as HTMLElement[];
		items.forEach((item: HTMLElement) => {
			item.blur();
			item.classList.remove('highlight');
		});
	}

	function menuClick(event: MouseEvent): void {
		if (disabled) {
			return;
		}
		resetMenuProperties();

		if (!event.target) {
			hideMenu();
		} else if ((event.target as Node).contains(menuButton)) {
			handleMenuButtonClick(event);
		} else if (menuList.contains(event.target as Node)) {
			handleMenuItemClick(event);
		}
	}

	function hideMenu() {
		menuList.classList.add('hidden');
	}

	function handleMenuButtonClick(event: MouseEvent): void {
		if (selectedItem) {
			showMenuForSelectedItem();
		} else {
			showMenuForFirstItem();
		}
	}

	function showMenuForSelectedItem(): void {
		menuList.classList.remove('hidden');

		if (selectedItem) {
			let itemIndex = menuItems.indexOf(selectedItem);
			let selectedItemElement = menuList.children[itemIndex];
			(selectedItemElement as HTMLElement).focus(); // Set focus to the currently selected item

			// Calculate distance from top so that we can position the dropdown menu
			let parentTop = menuList.getBoundingClientRect().top;
			let itemTop = (selectedItemElement as HTMLElement).getBoundingClientRect().top;
			let topPos = itemTop - parentTop - 3;
			menuList.style.top = -Math.abs(topPos) + 'px';

			// Update size and position based on plugin UI
			resizeAndPosition();
		}
	}

	function showMenuForFirstItem(): void {
		menuList.classList.remove('hidden');
		menuList.style.top = '0px';
		let firstItem = menuList.querySelector(':first-child');
		if (firstItem) {
			(firstItem as HTMLElement).focus();
		}

		// Update size and position based on plugin UI
		resizeAndPosition();
	}

	function handleMenuItemClick(event: MouseEvent): void {
		// Find selected item in array
		let itemIndex = Array.from(menuList.children).indexOf(event.target as HTMLElement);

		// Remove current selection if there is one
		removeCurrentSelection();

		menuItems[itemIndex].selected = true; // Select current item
		updateSelectedAndIds();
		dispatch('change', menuItems[itemIndex]);

		if (macOSBlink) {
			blinkBackground(event);
		} else {
			hideMenu();
			menuButton.classList.remove('selected'); // Remove selected state from button
		}
	}

	function removeCurrentSelection(): void {
		if (selectedItem) {
			let selectedIndex = menuItems.indexOf(selectedItem);
			if (selectedIndex !== -1) {
				menuItems[selectedIndex].selected = false;
			}
		}
	}

	function blinkBackground(event: MouseEvent): void {
		var x = 4;
		var interval = 70;

		// Blink the background
		for (var i = 0; i < x; i++) {
			setTimeout(function () {
				(event.target as HTMLElement).classList.toggle('blink');
			}, i * interval);
		}
		// Delay closing the menu
		setTimeout(function () {
			menuList.classList.add('hidden'); // Hide the menu
		}, interval * x + 40);
	}

	function resizeAndPosition(): void {
		adjustMenuHeight();
		adjustMenuPosition();
	}

	function adjustMenuHeight(): void {
		// Set the max height of the menu based on plugin/iframe window
		let maxMenuHeight = window.innerHeight - 16;
		let menuHeight = menuList.offsetHeight;

		if (menuHeight > maxMenuHeight) {
			menuList.style.height = maxMenuHeight + 'px';
		}
	}

	function adjustMenuPosition(): void {
		// Let's adjust the position of the menu if it's cut off from viewport
		let bounding = menuList.getBoundingClientRect();
		let parentBounding = menuButton.getBoundingClientRect();

		if (bounding.top < 0) {
			menuList.style.top = -Math.abs(parentBounding.top - 8) + 'px';
		}
		if (bounding.bottom > (window.innerHeight || document.documentElement.clientHeight)) {
			let minTop = -Math.abs(parentBounding.top - (window.innerHeight - menuList.offsetHeight - 8));
			let newTop = -Math.abs(bounding.bottom - window.innerHeight + 16);

			if (menuList.style.height !== 'auto') {
				menuList.style.top = -Math.abs(parentBounding.top - 8) + 'px';
			} else if (newTop > minTop) {
				menuList.style.top = minTop + 'px';
			} else {
				menuList.style.top = newTop + 'px';
			}
		}
	}
	function resetMenuProperties(): void {
		menuList.style.height = 'auto';
		menuList.style.top = '0px';
	}
</script>

<ClickOutside on:clickoutside={menuClick}>
	<div
		on:change
		on:focus
		on:blur
		bind:this={menuWrapper}
		{disabled}
		class:disabled
		class:placeholder
		class:showGroupLabels
		class:macOSBlink
		class="wrapper {className}"
	>
		<button bind:this={menuButton} on:click={menuClick} class:disabled>
			{#if iconName}
				<span class="icon"><Icon {iconName} color="black3" /></span>
			{:else if iconText}
				<span class="icon"><Icon {iconText} color="black3" /></span>
			{/if}

			{#if selectedItem}
				<span class="label">{selectedItem.label}</span>
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

		<ul class="menu hidden" bind:this={menuList}>
			{#if menuItems && menuItems.length > 0}
				{#each menuItems as item, i (item.id)}
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
</ClickOutside>

<style lang="scss">
	.wrapper {
		position: relative;
	}

	button {
		display: flex;
		align-items: center;
		border: 1px solid transparent;
		height: 30px;
		width: 100%;
		margin: 1px 0;
		padding: 4px var(--size-xxsmall) 0;
		overflow: hidden;
		overflow-y: hidden;
		border-radius: var(--border-radius-small);
		background-color: var(--white);

		&:hover,
		&:active {
			border-color: var(--black1);

			.placeholder {
				color: var(--black8);
			}

			.caret svg path {
				fill: var(--black8);
			}

			.caret {
				margin-left: auto;
			}
		}

		&:focus {
			border: 1px solid var(--blue);
			outline: 1px solid var(--blue);
			outline-offset: -2px;
			padding-left: calc(var(--size-xxsmall) + 1px);

			.placeholder {
				color: var(--black8);
			}
		}

		&:disabled {
			.label {
				color: var(--black3);
			}

			&:hover {
				justify-content: flex-start;
				border-color: transparent;

				.placeholder {
					color: var(--black3);
				}

				.caret svg path {
					fill: var(--black3);
				}
			}
		}
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
		text-overflow: ellipsis;
	}

	.placeholder {
		color: var(--figma-color-text-tertiary);
	}

	.caret {
		display: block;
		margin-top: -1px;

		svg path {
			fill: var(--figma-color-icon-tertiary);
		}
	}

	.icon {
		margin: -2px 0 0 -8px;
	}

	.menu {
		position: absolute;
		top: 32px;
		left: 0;
		width: 100%;
		background-color: var(--color-bg-menu);
		box-shadow: var(--shadow-hud);
		padding: var(--size-xxsmall) 0;
		border-radius: var(--border-radius-small);
		margin: 0;
		z-index: 50;
		overflow: hidden;

		&::-webkit-scrollbar {
			width: 12px;
			background-color: transparent;
			background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=);
			background-repeat: repeat;
			background-size: 100% auto;
		}

		&::-webkit-scrollbar-track {
			border: solid 3px transparent;
			-webkit-box-shadow: inset 0 0 10px 10px transparent;
			box-shadow: inset 0 0 10px 10px transparent;
		}

		&::-webkit-scrollbar-thumb {
			border: solid 3px transparent;
			border-radius: 6px;
			-webkit-box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
			box-shadow: inset 0 0 10px 10px rgba(255, 255, 255, 0.4);
		}
	}
</style>
