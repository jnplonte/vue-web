import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  name: 'SummaryDataComponent',
  components: {},
})

export default class SummaryDataComponent extends Vue {
  @Prop({ type: String, default: '' }) title: string;
  @Prop({ type: String, default: '' }) value: string;
  @Prop({ type: String, default: '' }) icon: string;
}
