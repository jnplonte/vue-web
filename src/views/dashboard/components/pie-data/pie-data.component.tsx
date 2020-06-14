import { Component, Mixins } from 'vue-property-decorator';

import { Pie } from 'vue-chartjs';

import { pieData, options } from '../../dashboard.constant';

@Component({
  name: 'PieDataComponent',
  components: {},
})

export default class PieDataComponent extends Mixins(Pie) {
  mounted(): void {
    this.renderChart(pieData, options);
  }
}
