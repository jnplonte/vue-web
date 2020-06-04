import Vue from 'vue';

import { Component } from 'vue-property-decorator';

@Component({
  name: 'FooterComponent',
  components: {},
})

export default class FooterComponent extends Vue {
  appName: string = process.env.VUE_APP_NAME;
}
