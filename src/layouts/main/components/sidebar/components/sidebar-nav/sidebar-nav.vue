<template>
	<v-list class="sidebar-nav-component px-4">
		<v-list-item
			link
			v-for="(page, indx) in pageList"
			:key="indx"
			:class="{ active: path === page.name }"
			:to="page.href"
		>
			<v-list-item-action>
				<v-icon>{{ page.icon }}</v-icon>
			</v-list-item-action>
			<v-list-item-content>
				<v-list-item-title class="text-left">{{ page.title }}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
	</v-list>
</template>

<script src="./sidebar-nav.component.ts" lang="ts"></script>
<style src="./sidebar-nav.style.scss" lang="scss" scoped></style>
