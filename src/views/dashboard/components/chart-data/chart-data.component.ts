import { Component, Mixins } from 'vue-property-decorator';

import { Bar } from 'vue-chartjs';

import { barData, options } from '../../dashboard.constant';

@Component({
  name: 'ChartDataComponent',
  components: {},
})

export default class ChartDataComponent extends Mixins(Bar) {
  mounted(): void {
    this.renderChart(barData, options);
  }
}
