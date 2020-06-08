import { Component, Mixins } from 'vue-property-decorator';
import { LoadingMixin } from '@/mixins/loading/loading';

@Component({
  name: 'AccountView',
  components: {},
})

export default class AccountView extends Mixins(LoadingMixin) {}
