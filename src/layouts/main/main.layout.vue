<template>
  <v-app id="app">
    <div v-if="loading" class="loader-container"><div class="loader"></div></div>
    <div class="main" :class="{ 'is-login': $isLogIn, 'is-logout': !$isLogIn }">
      <navbar/>
      <sidebar/>
      <div class="main-container">
          <router-view :key="$route.fullPath"/>
      </div>
      <custom-footer/>
    </div>
  </v-app>
</template>

<script lang="ts">
  import { Getter, Mutation, Action } from 'vuex-class';
  import { Vue, Component } from 'vue-property-decorator';

  import { Topbar, Sidebar, Footer } from './components';

  @Component({
    name: 'MainLayout',
    components: {
      'navbar': Topbar,
      'sidebar': Sidebar,
      'custom-footer': Footer
    },
  })

  export default class MainLayout extends Vue {
    @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;

    loading: boolean = true;

    created(): void {
      if (this.$isLogIn) {
        this.loading = false;
      } else {
        this.loading = false;
      }
    }
  }
</script>
