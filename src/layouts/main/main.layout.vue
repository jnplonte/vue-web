<template>
  <div>
    <div class="main" :class="{ 'is-login': $isLogIn, 'is-logout': !$isLogIn }">
      <topbar @openNav="handleOpenNav" @signOut="handleSignOut"/>
      <sidebar @openNav="handleOpenNav" :open-nav-value="openNavValue"/>
      <v-content app class="main-container">
        <div v-if="loading" class="loader-container">
          <v-progress-circular :size="70" :width="7" color="indigo" indeterminate ></v-progress-circular>
        </div>
        <slot />
      </v-content>
      <custom-footer/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Getter, Mutation, Action } from 'vuex-class';
  import { Component, Mixins } from 'vue-property-decorator';

  import { Topbar, Sidebar, Footer } from './components';

  import { LoadingMixin } from '@/mixins/loading/loading';

  @Component({
    name: 'MainLayout',
    components: {
      'topbar': Topbar,
      'sidebar': Sidebar,
      'custom-footer': Footer,
    },
  })

  export default class MainLayout extends Mixins(LoadingMixin) {
    @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;
    @Action('logOutUser', { namespace: 'authentication' }) $logOutUser;

    @Action('setNotificationData', { namespace: 'siteInformation' }) $setNotificationData;

    openNav: boolean = false;

    handleOpenNav(val: boolean  = false): void {
      this.openNav = val;
    }

    get openNavValue(): boolean {
      return this.openNav;
    }

    handleSignOut() {
      this.$logOutUser();

      this.$setNotificationData({ type: 'success', message: this.$i18n.t('success.logout') });
      this.$router.push({ path: '/' });
    }
  }
</script>
