import Vue from 'vue';

import { Component } from 'vue-property-decorator';

@Component({
  name: 'FooterComponent',
})

export default class FooterComponent extends Vue {
  companyName: string = process.env.VUE_APP_NAME;
}
