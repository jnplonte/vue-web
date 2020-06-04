import { Component, Mixins } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoggerMixin } from '@/mixins/logger/logger';

@Component({
  name: 'SignInView',
  components: {},
})

export default class SignInView extends Mixins(HelperMixin, LoggerMixin) {
  created(): void {
    console.log('init');
  }
}
