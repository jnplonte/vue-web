import { Component, Mixins } from 'vue-property-decorator';
import { LoadingMixin } from '@/mixins/loading/loading';

@Component({
  name: 'UserView',
  components: {},
})

export default class UserView extends Mixins(LoadingMixin) {}
