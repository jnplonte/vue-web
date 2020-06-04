import { Component, Mixins } from 'vue-property-decorator';
import { LoadingMixin } from '@/mixins/loading/loading';
import { TranslationMixin } from '@/mixins/translation/translation';

@Component({
  name: 'DashboardView',
  components: {},
})

export default class DashboardView extends Mixins(LoadingMixin, TranslationMixin) {
  created(): void {
    this.loading = false;
  }
}
