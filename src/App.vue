<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<script lang="ts">
  import '@/hooks.ts';

  import { Getter, Mutation, Action } from 'vuex-class';
  import { Component, Mixins, Watch } from 'vue-property-decorator';

  import { LoadingMixin } from '@/mixins/loading/loading';

  @Component({
    name: 'App',
    components: {},
  })

  export default class App extends Mixins(LoadingMixin) {
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
