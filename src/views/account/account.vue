<template>
	<div class="account-container" :class="{ 'd-none': loading }">
		<v-container fluid>
			<v-tabs v-model="selectedTab" grow>
				<v-tab v-for="item in tabItems" :key="item" :ripple="false">
					{{ $t(`account.${item}`) }}
				</v-tab>
			</v-tabs>

			<v-tabs-items v-model="selectedTab">
				<v-tab-item v-for="item in tabItems" :key="item">
					<v-card flat height="100%">
						<v-card-title>{{ $t(`account.${item}`) }}</v-card-title>
						<v-card-text>
							<component :ref="`${item}Component`" :is="item" />
						</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-container>
	</div>
</template>

<script src="./account.script.ts" lang="ts"></script>
<style src="./account.style.scss" lang="scss" scoped></style>
