import Vue from 'vue';
import { Getter, Action } from 'vuex-class';

import { Component } from 'vue-property-decorator';

@Component
export class LoadingMixin extends Vue {
  @Getter('loading', { namespace: 'siteInformation' }) $loading;
  @Action('setLoading', { namespace: 'siteInformation' }) $setLoading;

  get loading() {
    return this.$loading;
  }

  set loading(val: boolean) {
    this.$setLoading(val);
  }
}
