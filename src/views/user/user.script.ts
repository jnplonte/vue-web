import { Getter } from 'vuex-class';
import { Component, Mixins } from 'vue-property-decorator';

import { HelperMixin } from '@/mixins/helper/helper';
import { LoadingMixin } from '@/mixins/loading/loading';

import { UserTable, UserToolbar, SearchInput } from './components';

import { UserAPI } from '@/api/user.api';

@Component({
  name: 'UserView',
  components: {
    'user-table': UserTable,
    'user-toolbar': UserToolbar,
    'search-input': SearchInput,
  },
})

export default class UserView extends Mixins(HelperMixin, LoadingMixin) {
  @Getter('token', { namespace: 'authentication' }) $token;

  private userAPI: UserAPI;

  protected users: Array<any | null> = [];
  protected paginations: object = {};
  protected apiParams: object = { limit: 10, page: 1, order: 'createdAt:DESC', query: null };

  created() {
    this.loading = true;

    this.userAPI = new UserAPI(this.$token);
  }

  mounted() {
    this.fetchDataAsync();
  }

  async fetchDataAsync() {
    const requestData: any = await this.userAPI.getAll(this.apiParams);

    if (requestData) {
      this.users = requestData.data || [];
      this.paginations = requestData.pagination || {};
    }

    this.loading = false;
  }

  handleRefresh(data) {
    if (this.helper.isNotEmpty(data.key)) {
      this.apiParams[data.key] = data.value;
    }

    this.fetchDataAsync();
  }
}
