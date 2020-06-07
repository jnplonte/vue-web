import { Component, Mixins } from 'vue-property-decorator';
import { LoadingMixin } from '@/mixins/loading/loading';

@Component({
  name: 'DashboardView',
  components: {},
})

export default class DashboardView extends Mixins(LoadingMixin) {}
