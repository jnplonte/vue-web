import { Component, Mixins } from 'vue-property-decorator';
import { LoadingMixin } from '@/mixins/loading/loading';

import { SummaryData, PieData, ChartData } from './components';

@Component({
  name: 'DashboardView',
  components: {
    'summary-data': SummaryData,
    'chart-data': ChartData,
    'pie-data': PieData,
  },
})

export default class DashboardView extends Mixins(LoadingMixin) {
}
