import { Component, Prop, Mixins, Watch } from 'vue-property-decorator';
import { HelperMixin } from '@/mixins/helper/helper';

@Component({
  name: 'SidebarComponent',
  components: {},
})

export default class SidebarComponent extends Mixins(HelperMixin) {
  @Prop({ type: Boolean, default: false }) openNavValue: boolean;

  @Watch('value')
  openNav(newVal) {
    this.$emit('openNav', newVal);
  }

  private isSmall: boolean = false;

  mounted(): void {
    this.isSmall = (window.innerWidth <= 600);

    window.addEventListener('resize', () => {
      this.isSmall = (window.innerWidth <= 600);
    }, true);
  }

  get isOpen(): boolean {
    return this.$props.openNavValue;
  }

  set isOpen(newVal) {
    this.$emit('openNav', newVal);
  }
}
