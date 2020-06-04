<template>
  <div>
    <div v-if="loading" class="loader-container"><div class="loader"></div></div>
    <div class="main" :class="{ 'is-login': $isLogIn, 'is-logout': !$isLogIn }">
      <topbar/>
      <v-content class="minimal-container">
        <slot />
      </v-content>
    </div>
  </div>
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
