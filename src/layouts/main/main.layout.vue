<template>
  <div>
    <div v-if="loading" class="loader-container"><div class="loader"></div></div>
    <div class="main" :class="{ 'is-login': $isLogIn, 'is-logout': !$isLogIn }">
      <topbar @openNav="handleOpenNav"/>
      <sidebar @openNav="handleOpenNav" :open-nav-value="openNavValue"/>
      <v-content class="main-container">
        <slot />
      </v-content>
      <custom-footer/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Getter, Mutation, Action } from 'vuex-class';
  import { Vue, Component } from 'vue-property-decorator';

  import { Topbar, Sidebar, Footer } from './components';

  @Component({
    name: 'MainLayout',
    components: {
      'topbar': Topbar,
      'sidebar': Sidebar,
      'custom-footer': Footer
    },
  })

  export default class MainLayout extends Vue {
    @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;

    openNav: boolean = false;
    loading: boolean = true;

    created(): void {
      if (this.$isLogIn) {
        this.loading = false;
      } else {
        this.loading = false;
      }
    }

    handleOpenNav(val: boolean  = false): void {
      this.openNav = val;
    }

    get openNavValue(): boolean {
      return this.openNav;
    }
  }
</script>
