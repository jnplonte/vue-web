<template>
	<v-app class="app">
		<notification />
		<component :is="layout">
			<router-view />
		</component>
		<v-btn v-scroll="onScroll" v-show="fab" fab small dark fixed bottom right color="primary" @click="toTop">
			<v-icon>mdi-chevron-up</v-icon>
		</v-btn>
	</v-app>
</template>

<script lang="ts">
import '@/hooks.ts';

import Vue from 'vue';
import { Getter, Action } from 'vuex-class';
import { Component } from 'vue-property-decorator';

import { MainLayout, MinimalLayout } from '@/layouts';
import { Notification } from '@/components';

@Component({
	name: 'App',
	components: {
		'main-layout': MainLayout,
		'minimal-layout': MinimalLayout,
		notification: Notification,
	},
})
export default class App extends Vue {
	@Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;

	defaultLayout: string = 'minimal';

	fab: boolean = false;

	get layout(): string {
		return (this.$route.meta.layout || this.defaultLayout) + '-layout';
	}

	onScroll($event) {
		if (typeof window === 'undefined') {
			return;
		}

		const top = window.pageYOffset || $event.target.scrollTop || 0;
		this.fab = top > 20;
	}

	toTop() {
		this.$vuetify.goTo(0);
	}
}
</script>
