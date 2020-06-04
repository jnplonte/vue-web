import { Component, Prop, Mixins, Watch } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { HelperMixin } from '@/mixins/helper/helper';
import { routes as allRoutes } from '@/router';

@Component({
  name: 'SidebarComponent',
  components: {
  },
})

export default class SidebarComponent extends Mixins(HelperMixin) {
  @Getter('isAdmin', { namespace: 'authentication' }) $isAdmin;
  @Getter('isLogIn', { namespace: 'authentication' }) $isLogIn;
  @Getter('userInformation', { namespace: 'authentication' }) $userInformation;
  @Getter('userData', { namespace: 'authentication' }) $userData;
  @Prop({ type: Boolean, default: false }) isShowSidebar: boolean;

  private isDisplaySidebar: boolean = false;
  private companyName: string = process.env.VUE_APP_NAME;
  private routes = [];

  @Watch('$route.path')
  onPathChanges() {
    this.$emit('onUpdateSidebar', false);
  }

  @Watch('isShowSidebar', { immediate: true })
  onShowSidebarChanges(newVal) {
    this.isDisplaySidebar = newVal;
  }

  get reportCategories() {
    return this.$userData && this.$userData.reportCategories ? this.$userData.reportCategories : [];
  }

  get reportRoutes() {
    return this.$userData && this.$userData.reportRoutes ? [...this.$userData.reportRoutes, 'vmsSummaryOld', ] : [];
  }

  get routeList() {
    if (!this.$isLogIn) {
      return [];
    }

    return this.$isAdmin ? this.getAdminRoutes() : this.getNonAdminRoutes();
  }

  created() {
    this.isDisplaySidebar = this.isShowSidebar;
    this.routes = this.helper.cloneDeep(allRoutes);
  }

  showChildren(name: string = ''): void {
    const route = this.routes.find((rData) => rData['name'] === name);
    route.meta['isHideChildren'] = !route.meta['isHideChildren'];
  }

  getParentRouteClass(route) {
    let routeName = route.name;

    if (this.hasChildren(route) && route.children.length === 1) {
      routeName = route.children[0].name;
    }

    return {
      active: this.$route.name === routeName,
    };
  }

  getChildRouteClass(childRoute) {
    return {
      active: this.$route.name === childRoute.name,
    };
  }

  hasChildren(route) {
    return route.hasOwnProperty('children') && route.children.length > 0;
  }

  getAdminRoutes() {
    return this.routes
      .filter(r => !r.meta['isHidden'] && r.meta['isAdmin'])
      .reduce((acc: Array<object>, route: object) => {
        if (route.hasOwnProperty('children')) {
          route['children'] = route['children'].filter(r => !r.meta.isHidden && r.meta.isAdmin);

          if (route['name'] === 'dashboard') {
            route['redirect'] = '/admin-dashboard';
          }
        }
        acc.push(route);

        return acc;
      }, []);
  }

  getNonAdminRoutes() {
    return this.routes.reduce((acc: Array<object>, route: object) => {
      if (this.reportCategories.includes(route['name'])) {
        if (route.hasOwnProperty('children')) {
          route['children'] = route['children'].filter(r => this.reportRoutes.includes(r['name']));
        }

        acc.push(route);
      }
      return acc;
    }, []);
  }

  isOneChildren(route) {
    return this.hasChildren(route) && route.children.length === 1;
  }

  isMoreThanOneChildren(route) {
    return this.hasChildren(route) && route.children.length > 1;
  }
}
