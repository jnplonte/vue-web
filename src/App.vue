<template>
  <v-app class="app">
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script lang="ts">
  import '@/hooks.tsx';

  import { Getter, Mutation, Action } from 'vuex-class';
  import { Component, Mixins, Watch } from 'vue-property-decorator';

  import { LoadingMixin } from '@/mixins/loading/loading';

  import { MainLayout, MinimalLayout } from '@/layouts';

  @Component({
    name: 'App',
    components: {
      'main-layout': MainLayout,
      'minimal-layout': MinimalLayout,
    },
  })

  export default class App extends Mixins(LoadingMixin) {
    @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;

    defaultLayout: string = 'minimal';
    loading: boolean = true;

    created(): void {
      if (this.$isLogIn) {
        this.loading = false;
      } else {
        this.loading = false;
      }
    }

    get layout(): string {
      return (this.$route.meta.layout || this.defaultLayout) + '-layout';
    }
  }
</script>
