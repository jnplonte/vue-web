import Vue from 'vue';
import { Getter, Mutation } from 'vuex-class';

import { Component } from 'vue-property-decorator';

@Component
export class LoadingMixin extends Vue {
  // @Getter('loading', { namespace: 'common' }) $loading;
  // @Mutation('SET_LOADING', { namespace: 'common' }) $setLoading;

  // get loading() {
  //   return this.$loading;
  // }

  // set loading(val: boolean) {
  //   this.$setLoading(val);
  // }

  protected loading: boolean = false;
}
