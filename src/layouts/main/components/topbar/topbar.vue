<template>
	<div class="topbar-component">
		<v-app-bar class="app-header" dark app color="indigo" :clipped-left="!isSmall">
			<v-app-bar-nav-icon class="d-inline-block d-sm-none" @click.stop="openNav" />
			<router-link :to="homePage">
				<v-img class="mr-2 img d-inline-block" :src="appLogo" max-height="35" max-width="35" contain></v-img>
				<v-toolbar-title class="d-none d-sm-inline-block title">{{ appName }}</v-toolbar-title>
			</router-link>

			<v-spacer></v-spacer>

			<v-menu left bottom>
				<template v-slot:activator="{ on }">
					<v-btn text v-on="on">
						<v-icon>mdi-translate</v-icon>
						<h3 class="ml-1 hidden-sm-and-down">{{ $i18n.locale }}</h3>
						<v-icon class="hidden-sm-and-down" right>mdi-menu-down</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item @click="setLang('en')">
						<v-list-item-title class="text-left">ENGLISH</v-list-item-title>
					</v-list-item>
					<v-list-item @click="setLang('tg')">
						<v-list-item-title class="text-left">TAGALOG</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>

			<v-menu left bottom>
				<template v-slot:activator="{ on }">
					<v-btn icon v-on="on">
						<v-icon>mdi-account-circle</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item to="/account">
						<v-list-item-title class="text-left">{{ $t('menu.account') }}</v-list-item-title>
					</v-list-item>
					<v-list-item @click="signOut">
						<v-list-item-title class="text-left">{{ $t('menu.signOut') }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-app-bar>
	</div>
</template>

<script src="./topbar.component.ts" lang="ts"></script>
<style src="./topbar.style.scss" lang="scss" scoped></style>
