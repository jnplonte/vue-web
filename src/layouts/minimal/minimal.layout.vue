<template>
	<div>
		<div class="main" :class="{ 'is-login': $isLogIn, 'is-logout': !$isLogIn }">
			<topbar v-if="$isLogIn" />
			<v-main app class="minimal-container">
				<slot />
			</v-main>
		</div>
	</div>
</template>

<script lang="ts">
import { Getter } from 'vuex-class';
import { Vue, Component } from 'vue-property-decorator';

import { Topbar } from './components';

@Component({
	name: 'MainLayout',
	components: {
		topbar: Topbar,
	},
})
export default class MainLayout extends Vue {
	@Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;
}
</script>
