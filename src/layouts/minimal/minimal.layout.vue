<template>
  <div>
    <div class="main" :class="{ 'is-login': $isLogIn, 'is-logout': !$isLogIn }">
      <topbar v-if="$isLogIn"/>
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
      topbar: Topbar,
    },
  })

  export default class MainLayout extends Vue {
    @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;
  }
</script>
