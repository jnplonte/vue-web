import { Component, Prop, Mixins } from 'vue-property-decorator';
import { HelperMixin } from '@/mixins/helper/helper';

@Component({
  name: 'SidebarNavComponent',
  components: {},
})

export default class SidebarNavComponent extends Mixins(HelperMixin) {
    @Prop({ type: Array, default: [] }) pages: Array<any | null>;

    private path: string = 'dashboard';

    mounted(): void {
      this.path = this.$route.name;
    }

    get pageList(): Array<any | null> {
        return this.$props.pages;
    }
}
