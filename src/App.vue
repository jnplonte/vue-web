<template>
  <v-app class="app">
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script lang="ts">
  import '@/hooks.tsx';

  import Vue from 'vue';
  import { Getter } from 'vuex-class';
  import { Component } from 'vue-property-decorator';

  import { MainLayout, MinimalLayout } from '@/layouts';

  @Component({
    name: 'App',
    components: {
      'main-layout': MainLayout,
      'minimal-layout': MinimalLayout,
    },
  })

  export default class App extends Vue {
    @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;

    defaultLayout: string = 'minimal';

    get layout(): string {
      return (this.$route.meta.layout || this.defaultLayout) + '-layout';
    }
  }
</script>
