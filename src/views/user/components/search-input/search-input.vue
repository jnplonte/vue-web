<template>
	<div class="search-input-component">
		<v-text-field
			v-model="searchValue"
			:label="$t('form.search')"
			hide-details
			solo
			@keydown.enter="handleSearch"
		></v-text-field>
		<v-btn color="primary" class="floating-btn" @click.native.prevent="handleSearch"
			><v-icon left>mdi-magnify</v-icon> {{ $t('user.search') }}</v-btn
		>
	</div>
</template>

<script src="./search-input.component.ts" lang="ts"></script>
<style src="./search-input.style.scss" lang="scss" scoped></style>
