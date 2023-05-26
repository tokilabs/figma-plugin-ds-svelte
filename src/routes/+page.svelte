<script>
	//This is a simple app playground to test components and their markup

	// Global CSS
	import "../figma_app.min.css?inline";
	import "../global.css?inline";

	//Components
	import Button from "../lib/components/Button/index.svelte";
	import Checkbox from "../lib/components/Checkbox/index.svelte";
	import Switch from "../lib/components/Switch/index.svelte";
	// import Disclosure from "../lib/components/Disclosure/index.svelte";
	// import DisclosureItem from "../lib/components/DisclosureItem/index.svelte";
	import Icon from "../lib/components/Icon/index.svelte";
	import IconButton from "../lib/components/IconButton/index.svelte";
	import Input from "../lib/components/Input/index.svelte";
	import Label from "../lib/components/Label/index.svelte";
	import OnboardingTip from "../lib/components/OnboardingTip/index.svelte";
	import Radio from "../lib/components/Radio/index.svelte";
	import Section from "../lib/components/Section/index.svelte";
	// import SelectMenu from "../lib/components/SelectMenu/index.svelte";
	import Textarea from "../lib/components/Textarea/index.svelte";
	import Type from "../lib/components/Type/index.svelte";

	//Icons
	import IconAdjust from "../lib/icons/adjust.svelte";
	import IconAlert from "../lib/icons/alert.svelte";
	import IconAngle from "../lib/icons/angle.svelte";
	import IconArrowLeftRight from "../lib/icons/arrow-left-right.svelte";
	import IconUpDown from "../lib/icons/arrow-up-down.svelte";
	import IconAutoLayoutHorizontal from "../lib/icons/auto-layout-horizontal.svelte";
	import IconAutoLayoutVertical from "../lib/icons/auto-layout-vertical.svelte";
	import IconBack from "../lib/icons/back.svelte";
	import IconBlendEmpty from "../lib/icons/blend-empty.svelte";
	import IconBlend from "../lib/icons/blend.svelte";
	import IconBreak from "../lib/icons/break.svelte";
	import IconCaretDown from "../lib/icons/caret-down.svelte";
	import IconCaretLeft from "../lib/icons/caret-left.svelte";
	import IconCaretRight from "../lib/icons/caret-right.svelte";
	import IconCaretUp from "../lib/icons/caret-up.svelte";
	import IconCheck from "../lib/icons/check.svelte";
	import IconClose from "../lib/icons/close.svelte";
	import IconComponent from "../lib/icons/component.svelte";
	import IconCornerRadius from "../lib/icons/corner-radius.svelte";
	import IconCorners from "../lib/icons/corners.svelte";
	import IconDistributeHorizontalSpacing from "../lib/icons/distribute-horizontal-spacing.svelte";
	import IconDistributeVerticalSpacing from "../lib/icons/distribute-vertical-spacing.svelte";
	import IconDraft from "../lib/icons/draft.svelte";
	import IconEffects from "../lib/icons/effects.svelte";
	import IconEllipses from "../lib/icons/ellipses.svelte";
	import IconEyedropper from "../lib/icons/eyedropper.svelte";
	import IconForward from "../lib/icons/forward.svelte";
	import IconFrame from "../lib/icons/frame.svelte";
	import IconGroup from "../lib/icons/group.svelte";
	import IconHidden from "../lib/icons/hidden.svelte";
	import IconHorizontalPadding from "../lib/icons/horizontal-padding.svelte";
	import IconHyperlink from "../lib/icons/hyperlink.svelte";
	import IconImage from "../lib/icons/image.svelte";
	import IconInstance from "../lib/icons/instance.svelte";
	import IconKey from "../lib/icons/key.svelte";
	import IconLayoutAlignBottom from "../lib/icons/layout-align-bottom.svelte";
	import IconAlignHorizontalCenters from "../lib/icons/layout-align-horizontal-centers.svelte";
	import IconAlignLeft from "../lib/icons/layout-align-left.svelte";
	import IconAlignRight from "../lib/icons/layout-align-right.svelte";
	import IconAlignTop from "../lib/icons/layout-align-top.svelte";
	import IconAlignVerticalCenters from "../lib/icons/layout-align-vertical-centers.svelte";
	import IconLayoutGridColumns from "../lib/icons/layout-grid-columns.svelte";
	import IconLayoutGridRows from "../lib/icons/layout-grid-rows.svelte";
	import IconLayoutGridUniform from "../lib/icons/layout-grid-uniform.svelte";
	import IconLibrary from "../lib/icons/library.svelte";
	import IconLinkBroken from "../lib/icons/link-broken.svelte";
	import IconLinkConnected from "../lib/icons/link-connected.svelte";
	import IconListDetailed from "../lib/icons/list-detailed.svelte";
	import IconListTile from "../lib/icons/list-tile.svelte";
	import IconList from "../lib/icons/list.svelte";
	import IconLockOff from "../lib/icons/lock-off.svelte";
	import IconLockOn from "../lib/icons/lock-on.svelte";
	import IconMinus from "../lib/icons/minus.svelte";
	import IconPlay from "../lib/icons/play.svelte";
	import IconPlus from "../lib/icons/plus.svelte";
	import IconRandom from "../lib/icons/random.svelte";
	import IconRecent from "../lib/icons/recent.svelte";
	import IconResizeToFit from "../lib/icons/resize-to-fit.svelte";
	import IconResolveFilled from "../lib/icons/resolve-filled.svelte";
	import IconResolve from "../lib/icons/resolve.svelte";
	import IconReverse from "../lib/icons/reverse.svelte";
	import IconSearchLarge from "../lib/icons/search-large.svelte";
	import IconSearch from "../lib/icons/search.svelte";
	import IconSettings from "../lib/icons/settings.svelte";
	import IconShare from "../lib/icons/share.svelte";
	import IconSmiley from "../lib/icons/smiley.svelte";
	import IconSortAlphaAsc from "../lib/icons/sort-alpha-asc.svelte";
	import IconSortAlphaDsc from "../lib/icons/sort-alpha-dsc.svelte";
	import IconSortTopBottom from "../lib/icons/sort-top-bottom.svelte";
	import IconSpacing from "../lib/icons/spacing.svelte";
	import IconSpinner from "../lib/icons/spinner.svelte";
	import IconStarOff from "../lib/icons/star-off.svelte";
	import IconStarOn from "../lib/icons/star-on.svelte";
	import IconStrokeWeight from "../lib/icons/stroke-weight.svelte";
	import IconStyles from "../lib/icons/styles.svelte";
	import IconSwap from "../lib/icons/swap.svelte";
	import IconTheme from "../lib/icons/theme.svelte";
	import IconTidyUpGrid from "../lib/icons/tidy-up-grid.svelte";
	import IconTidyUpListHorizontal from "../lib/icons/tidy-up-list-horizontal.svelte";
	import IconTidyUpListVertical from "../lib/icons/tidy-up-list-vertical.svelte";
	import IconTimer from "../lib/icons/timer.svelte";
	import IconTrash from "../lib/icons/trash.svelte";
	import IconVerticalPadding from "../lib/icons/vertical-padding.svelte";
	import IconVisible from "../lib/icons/visible.svelte";
	import IconWarningLarge from "../lib/icons/warning-large.svelte";
	import IconWarning from "../lib/icons/warning.svelte";

	//var to store the selected value of our radio button group
	var radioValue = "a";

	//Arrays for select menu
	//example without a selected item
	let menuItemsExample0;

	//this function dynamically updates the first empty select menu example with data
	function populateMenu() {
		menuItemsExample0 = [
			{
				id: 1,
				value: "item1",
				label: "Menu item 1",
				group: null,
				selected: true
			},
			{
				id: 2,
				value: "item2",
				label: "Menu item 2 ",
				group: null,
				selected: false
			}
		];
	}

	let menuItemsExample1 = [
		{
			id: 1,
			value: "item1",
			label: "Menu item 1",
			group: null,
			selected: false
		},
		{
			id: 1,
			value: "item2",
			label: "Menu item 2 ",
			group: null,
			selected: false
		},
		{
			id: 1,
			value: "item3",
			label: "Menu item 3",
			group: null,
			selected: false
		},
		{
			id: 1,
			value: "item4",
			label: "Menu item 4",
			group: null,
			selected: false
		}
	];
	//example with an initial selection
	let menuItemsExample2 = [
		{
			id: 1,
			value: "item1",
			label: "Menu item 1",
			group: null,
			selected: false
		},
		{
			id: 1,
			value: "item2",
			label: "Menu item 2 ",
			group: null,
			selected: true
		},
		{
			id: 1,
			value: "item3",
			label: "Menu item 3",
			group: null,
			selected: false
		},
		{
			id: 1,
			value: "item4",
			label: "Menu item 4",
			group: null,
			selected: false
		}
	];
	//example with option groups (we will show the labels with a prop)
	let menuItemsExample3 = [
		{
			id: 1,
			value: "item1",
			label: "Granny Smith",
			group: "Apples",
			selected: false
		},
		{
			id: 1,
			value: "item2",
			label: "Honey Crisp ",
			group: "Apples",
			selected: true
		},
		{
			id: 1,
			value: "item3",
			label: "Blood",
			group: "Oranges",
			selected: false
		},
		{
			id: 1,
			value: "item4",
			label: "Valencia",
			group: "Oranges",
			selected: false
		}
	];
	//example with an initial selection and option groups
	let menuItemsExample4 = [
		{
			id: 1,
			value: "item1",
			label: "Passthrough",
			group: "group1",
			selected: true
		},
		{
			id: 1,
			value: "item2",
			label: "Normal ",
			group: "group1",
			selected: false
		},
		{
			id: 1,
			value: "item3",
			label: "Darken",
			group: "group2",
			selected: false
		},
		{
			id: 1,
			value: "item4",
			label: "Multiply",
			group: "group2",
			selected: false
		},
		{
			id: 1,
			value: "item4",
			label: "Color Burn",
			group: "group2",
			selected: false
		}
	];
</script>

<div
	class="wrapper"
	style="background-color: var(--figma-color-bg)"
>
	<h1>Figma Plugin UI Svelte</h1>

	<section>
		<h2>Buttons</h2>

		<div class="mb-xsmall">
			<h3>Primary</h3>
			<div class="flex row">
				<Button class="mr-xxsmall">Label</Button>
				<Button
					disabled
					class="mr-xxsmall">Label</Button
				>
				<Button
					destructive
					class="mr-xxsmall">Label</Button
				>
				<Button
					destructive
					disabled>Label</Button
				>
			</div>
		</div>

		<div class="mb-xsmall">
			<h3>Secondary</h3>
			<div class="flex row">
				<Button
					variant="secondary"
					class="mr-xxsmall">Label</Button
				>
				<Button
					variant="secondary"
					disabled
					class="mr-xxsmall">Label</Button
				>
				<Button
					variant="secondary"
					destructive
					class="mr-xxsmall">Label</Button
				>
				<Button
					variant="secondary"
					destructive
					disabled
					class="mr-xxsmall">Label</Button
				>
			</div>
		</div>

		<div>
			<h3>Tertiary</h3>
			<div class="flex row">
				<Button
					variant="tertiary"
					class="mr-xxsmall">Label</Button
				>
				<Button
					variant="tertiary"
					disabled
					class="mr-xxsmall">Label</Button
				>
				<Button
					variant="tertiary"
					destructive
					class="mr-xxsmall">Label</Button
				>
				<Button
					variant="tertiary"
					destructive
					disabled
					class="mr-xxsmall">Label</Button
				>
			</div>
		</div>
	</section>

	<section>
		<h2>Checkboxes</h2>
		<Checkbox>Label</Checkbox>
		<Checkbox checked>Label</Checkbox>
		<Checkbox disabled>Label</Checkbox>
		<Checkbox
			checked
			disabled>Label</Checkbox
		>
	</section>

	<section>
		<h2>Switches</h2>
		<Switch>Label</Switch>
		<Switch checked>Label</Switch>
		<Switch disabled>Label</Switch>
		<Switch
			checked
			disabled>Label</Switch
		>
	</section>

	<section>
		<h2>Radio buttons</h2>
		<Radio
			bind:group={radioValue}
			value="a"
			>Label Label with really long text content Label with really really really
			really long text content Label with really long text content Label with
			really long text content</Radio
		>
		<Radio
			bind:group={radioValue}
			value="b">Label</Radio
		>
		<Radio
			bind:group={radioValue}
			value="c"
			disabled>Label</Radio
		>
	</section>

	<section>
		<h2>Disclosure panels</h2>
		<!-- <Disclosure>
			<DisclosureItem
				title="Item 1"
				open>Content here</DisclosureItem
			>
			<DisclosureItem title="Item 2">Content here</DisclosureItem>
			<DisclosureItem title="Item 3">Content here</DisclosureItem>
		</Disclosure> -->
	</section>

	<section>
		<h2>Icon</h2>
		<h3>Icons and props</h3>
		<caption class="mb-xsmall"
			>You can import and pass an SVG string to the iconName prop, or you can
			display text inside an icon by passing a string including a character to
			the iconText prop. You can pass the name of any color from the Figma DS to
			the color prop (ex: color="red", color="purple4"). Icons can also accept
			the spin prop. The IconButton, Input, and OnboardingTip all make use of
			the Icon component and can accept its props.</caption
		>
		<div class="flex row mb-xsmall">
			<Icon
				iconName={IconVisible}
				color="black"
			/>
			<Icon
				iconName={IconVisible}
				color="black8"
			/>
			<Icon
				iconName={IconVisible}
				color="black3"
			/>
			<Icon
				iconName={IconVisible}
				color="blue"
			/>
			<Icon
				iconName={IconVisible}
				color="purple"
			/>
			<Icon
				iconName={IconVisible}
				color="yellow"
			/>
			<Icon
				iconName={IconVisible}
				color="red"
			/>
			<Icon
				iconName={IconVisible}
				color="green"
			/>
			<Icon iconText="W" />
			<Icon
				iconText="H"
				color="black3"
			/>
			<Icon
				iconText="#"
				color="blue"
			/>
			<Icon
				iconText="@"
				color="red"
			/>
			<Icon
				iconText="→"
				color="blue"
				spin
			/>
			<Icon
				iconName={IconSpinner}
				spin
			/>
		</div>
		<h3>Icons</h3>
		<div class="flex row flex-wrap">
			<Icon iconName={IconAdjust} />
			<Icon iconName={IconAlert} />
			<Icon iconName={IconAngle} />
			<Icon iconName={IconArrowLeftRight} />
			<Icon iconName={IconUpDown} />
			<Icon iconName={IconAutoLayoutHorizontal} />
			<Icon iconName={IconAutoLayoutVertical} />
			<Icon iconName={IconBack} />
			<Icon iconName={IconBlendEmpty} />
			<Icon iconName={IconBlend} />
			<Icon iconName={IconBreak} />
			<Icon iconName={IconCaretDown} />
			<Icon iconName={IconCaretLeft} />
			<Icon iconName={IconCaretRight} />
			<Icon iconName={IconCaretUp} />
			<Icon iconName={IconCheck} />
			<Icon iconName={IconClose} />
			<Icon iconName={IconComponent} />
			<Icon iconName={IconCornerRadius} />
			<Icon iconName={IconCorners} />
			<Icon iconName={IconDistributeHorizontalSpacing} />
			<Icon iconName={IconDistributeVerticalSpacing} />
			<Icon iconName={IconDraft} />
			<Icon iconName={IconEffects} />
			<Icon iconName={IconEllipses} />
			<Icon iconName={IconEyedropper} />
			<Icon iconName={IconForward} />
			<Icon iconName={IconFrame} />
			<Icon iconName={IconGroup} />
			<Icon iconName={IconHidden} />
			<Icon iconName={IconHorizontalPadding} />
			<Icon iconName={IconHyperlink} />
			<Icon iconName={IconImage} />
			<Icon iconName={IconInstance} />
			<Icon iconName={IconKey} />
			<Icon iconName={IconLayoutAlignBottom} />
			<Icon iconName={IconAlignHorizontalCenters} />
			<Icon iconName={IconAlignLeft} />
			<Icon iconName={IconAlignRight} />
			<Icon iconName={IconAlignTop} />
			<Icon iconName={IconAlignVerticalCenters} />
			<Icon iconName={IconLayoutGridColumns} />
			<Icon iconName={IconLayoutGridRows} />
			<Icon iconName={IconLayoutGridUniform} />
			<Icon iconName={IconLibrary} />
			<Icon iconName={IconLinkBroken} />
			<Icon iconName={IconLinkConnected} />
			<Icon iconName={IconListDetailed} />
			<Icon iconName={IconListTile} />
			<Icon iconName={IconList} />
			<Icon iconName={IconLockOff} />
			<Icon iconName={IconLockOn} />
			<Icon iconName={IconMinus} />
			<Icon iconName={IconPlay} />
			<Icon iconName={IconPlus} />
			<Icon iconName={IconRandom} />
			<Icon iconName={IconRecent} />
			<Icon iconName={IconResizeToFit} />
			<Icon iconName={IconResolveFilled} />
			<Icon iconName={IconResolve} />
			<Icon iconName={IconReverse} />
			<Icon iconName={IconSearchLarge} />
			<Icon iconName={IconSearch} />
			<Icon iconName={IconSettings} />
			<Icon iconName={IconShare} />
			<Icon iconName={IconSmiley} />
			<Icon iconName={IconSortAlphaAsc} />
			<Icon iconName={IconSortAlphaDsc} />
			<Icon iconName={IconSortTopBottom} />
			<Icon iconName={IconSpacing} />
			<Icon iconName={IconSpinner} />
			<Icon iconName={IconStarOff} />
			<Icon iconName={IconStarOn} />
			<Icon iconName={IconStrokeWeight} />
			<Icon iconName={IconStyles} />
			<Icon iconName={IconSwap} />
			<Icon iconName={IconTheme} />
			<Icon iconName={IconTidyUpGrid} />
			<Icon iconName={IconTidyUpListHorizontal} />
			<Icon iconName={IconTidyUpListVertical} />
			<Icon iconName={IconTimer} />
			<Icon iconName={IconTrash} />
			<Icon iconName={IconVerticalPadding} />
			<Icon iconName={IconVisible} />
			<Icon iconName={IconWarningLarge} />
			<Icon iconName={IconWarning} />
		</div>
	</section>

	<section>
		<h2>Icon Button</h2>
		<div class="flex row">
			<IconButton
				iconName={IconVisible}
				class="mr-xxsmall"
			/>
			<IconButton
				iconName={IconVisible}
				selected
				class="mr-xxsmall"
			/>
			<IconButton iconText="@" />
		</div>
	</section>

	<section>
		<h2>Input</h2>
		<Input
			placeholder="This is an example with a placeholder"
			class="mb-xsmall"
		/>
		<Input
			value="This is an example with a value"
			class="mb-xsmall"
		/>
		<Input
			value="This is an example with a value but also disabled"
			disabled
			class="mb-xsmall"
		/>
		<Input
			value="This is an example with a forced border"
			borders
			class="mb-xsmall"
		/>
		<Input
			value="This is an invalid example"
			class="mb-xsmall"
			invalid={true}
		/>
		<Input
			iconName={IconVisible}
			value="This is an example with a value and an icon"
			class="mb-xsmall"
		/>
		<Input
			iconText="W"
			value="This is an example with a value and a text icon, for example a width input"
		/>
	</section>

	<section>
		<h2>Labels and sections</h2>
		<Label>Label goes here</Label>
		<Section>Section header goes here</Section>
	</section>

	<section>
		<h2>Onboarding Tip</h2>
		<OnboardingTip iconName={IconStyles}
			>To create a style, select a layer and click on the style icon in the
			inspector panel</OnboardingTip
		>
	</section>

	<section>
		<h2>Select Menu</h2>
		<div class="flex row">
			<!-- <SelectMenu
				bind:menuItems={menuItemsExample0}
				class="mb-xsmall"
			/> -->
			<Button
				variant="secondary"
				class="mr-xxsmall mb-xsmall"
				on:click={populateMenu}>Populate menu</Button
			>
		</div>

		<!-- <SelectMenu
			placeholder="Please make a selection"
			bind:menuItems={menuItemsExample1}
			class="mb-xsmall"
		/>
		<SelectMenu
			bind:menuItems={menuItemsExample2}
			class="mb-xsmall"
		/>
		<SelectMenu
			bind:menuItems={menuItemsExample3}
			showGroupLabels
			class="mb-xsmall"
		/>
		<SelectMenu
			bind:menuItems={menuItemsExample4}
			iconName={IconBlend}
		/> -->
	</section>

	<section>
		<h2>Textarea</h2>
		<Textarea
			placeholder="Enter some text"
			class="mb-xsmall"
		/>
		<Textarea
			class="mb-xsmall"
			value="Initial value"
		/>
		<Textarea
			value="Text area with a value that is disabled"
			disabled
		/>
	</section>

	<section>
		<h2>Type</h2>
		<div class="flex row">
			<div
				class="p-xsmall mr-xxsmall"
				style="border: 1px solid var(--black1)"
			>
				<div class="mb-xxsmall">
					<Type>UI11 &mdash; size: xsmall, weight: normal, inverse: false</Type>
					<Type size="small"
						>UI12 &mdash; size: small, weight: normal, inverse: false</Type
					>
					<Type size="large"
						>UI13 &mdash; size: large, weight: normal, inverse: false</Type
					>
					<Type size="xlarge"
						>UI14 &mdash; size: xlarge, weight: normal, inverse: false</Type
					>
				</div>

				<div class="mb-xxsmall">
					<Type weight="medium"
						>UI1 &mdash; size: xsmall, weight: medium, inverse: false</Type
					>
					<Type
						size="small"
						weight="medium"
						>UI2 &mdash; size: small, weight: medium, inverse: false</Type
					>
					<Type
						size="large"
						weight="medium"
						>UI3 &mdash; size: large, weight: medium, inverse: false</Type
					>
					<Type
						size="xlarge"
						weight="medium"
						>UI4 &mdash; size: xlarge, weight: medium, inverse: false</Type
					>
				</div>

				<Type weight="bold"
					>UI1 &mdash; size: xsmall, weight: bold, inverse: false</Type
				>
				<Type
					size="small"
					weight="bold"
					>UI2 &mdash; size: small, weight: bold, inverse: false</Type
				>
				<Type
					size="large"
					weight="bold"
					>UI3 &mdash; size: large, weight: bold, inverse: false</Type
				>
				<Type
					size="xlarge"
					weight="bold"
					>UI4 &mdash; size: xlarge, weight: bold, inverse: false</Type
				>
			</div>

			<div
				class="p-xsmall"
				style="background-color: var(--black)"
			>
				<div class="mb-xxsmall">
					<Type inverse
						>UI1 &mdash; size: xsmall, weight: normal, inverse: true</Type
					>
					<Type
						size="small"
						inverse>UI2 &mdash; size: small, weight: normal, inverse: true</Type
					>
					<Type
						size="large"
						inverse>UI3 &mdash; size: large, weight: normal, inverse: true</Type
					>
					<Type
						size="xlarge"
						inverse
						>UI4 &mdash; size: xlarge, weight: normal, inverse: true</Type
					>
				</div>

				<div class="mb-xxsmall">
					<Type
						weight="medium"
						inverse
						>UI1 &mdash; size: xsmall, weight: medium, inverse: true</Type
					>
					<Type
						size="small"
						weight="medium"
						inverse>UI2 &mdash; size: small, weight: medium, inverse: true</Type
					>
					<Type
						size="large"
						weight="medium"
						inverse>UI3 &mdash; size: large, weight: medium, inverse: true</Type
					>
					<Type
						size="xlarge"
						weight="medium"
						inverse
						>UI4 &mdash; size: xlarge, weight: medium, inverse: true</Type
					>
				</div>

				<Type
					weight="bold"
					inverse>UI1 &mdash; size: xsmall, weight: bold, inverse: true</Type
				>
				<Type
					size="small"
					weight="bold"
					inverse>UI2 &mdash; size: small, weight: bold, inverse: true</Type
				>
				<Type
					size="large"
					weight="bold"
					inverse>UI3 &mdash; size: large, weight: bold, inverse: true</Type
				>
				<Type
					size="xlarge"
					weight="bold"
					inverse>UI4 &mdash; size: xlarge, weight: bold, inverse: true</Type
				>
			</div>
		</div>
	</section>
</div>

<style>
	.wrapper {
		padding: 24px;
	}

	h1 {
		font-size: 24px;
		padding: 0;
		margin: 0 0 24px 0;
	}

	h2 {
		font-size: 16px;
		padding: 0;
		margin: 0 0 16px 0;
	}

	h3 {
		font-weight: normal;
		font-size: 12px;
		padding: 0;
		margin: 0 0 8px 0;
	}

	caption {
		font-size: 11px;
		color: var(--black3);
		display: block;
		text-align: left;
	}

	section {
		border-bottom: 1px solid var(--black);
		padding-bottom: var(--size-medium);
		margin-bottom: var(--size-medium);
	}
	section:last-child {
		border-bottom: 1px solid transparent;
		margin-bottom: 0px;
	}
</style>
