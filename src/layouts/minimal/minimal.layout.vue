<template>
  <v-app id="app">
    <div v-if="loading" class="loader-container"><div class="loader"></div></div>
    <div class="main" :class="{ 'is-login': $isLogIn, 'is-logout': !$isLogIn }">
      <topbar/>
      <div class="minimal-container">
        <router-view :key="$route.fullPath"/>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
  import { Getter, Mutation, Action } from 'vuex-class';
  import { Vue, Component } from 'vue-property-decorator';

  import { Topbar } from './components';

  @Component({
    name: 'MainLayout',
    components: {
      'topbar': Topbar,
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
