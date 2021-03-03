<template>
	<div class="user-container" :class="{ 'd-none': loading }">
		<v-row>
			<v-col cols="8" sm="4">
				<search-input @refreshData="handleRefresh" :placeholder="$t('form.search')"></search-input>
			</v-col>
			<v-col cols="4" sm="8">
				<user-toolbar @refreshData="handleRefresh"></user-toolbar>
			</v-col>
			<v-col cols="12">
				<user-table
					@refreshData="handleRefresh"
					:data="users"
					:pagination="paginations"
					:limit="apiParams['limit']"
				></user-table>
			</v-col>
		</v-row>
	</div>
</template>

<script src="./user.script.ts" lang="ts"></script>
<style src="./user.style.scss" lang="scss" scoped></style>
