import { Getter, Action } from 'vuex-class';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
import { LoadingMixin } from '@/mixins/loading/loading';

import ConfirmDialog from '@/components/confirm-dialog/confirm-dialog.vue';

import { DEFAULT_TABLE_OPTIONS, DEFAULT_TABLE_FOOTER_PROPS, IFormProps } from '@/views/user/user.constants.tsx';

import { DataOptions } from 'vuetify/types';

import { UserAPI } from '@/api/user.api';

@Component({
  name: 'UserTableComponent',
  components: {
    'confirm-dialog': ConfirmDialog,
  },
})

export default class UserTableComponent extends Mixins(LoadingMixin) {
    @Getter('token', { namespace: 'authentication' }) $token;
    @Getter('authData', { namespace: 'authentication' }) $authData;
    @Action('setNotificationData', { namespace: 'siteInformation' }) $setNotificationData;

    @Prop({ type: Array, default: [] }) data: Array<any | null>;
    @Prop({ type: Object, default: {} }) pagination: object;
    @Prop({ type: Number, default: 10 }) limit: number;

    private userAPI: UserAPI;

    private selectedData: IFormProps = null;

    private isConfirm: boolean = false;
    private confirmMessage: string = '';

    private tableOptions: DataOptions = DEFAULT_TABLE_OPTIONS;
    private tableOptionFooter: object = DEFAULT_TABLE_FOOTER_PROPS;

    @Watch('tableOptions', { deep: true })
    private onTableOptionsChanged(newVal, oldVal) {
        this.queryData();
    }

    created() {
        this.userAPI = new UserAPI(this.$token);
    }

    get headers(): object[] {
        return [
            { text: 'Full Name', value: 'name' },
            { text: 'User Name', value: 'username' },
            { text: 'Email Address', value: 'email' },
            { text: 'Phone Number', value: 'phone' },
            { text: 'Active', value: 'active' },
            { text: 'Created At', value: 'createdAt' },
            { text: 'Action', value: 'action' },
        ];
    }

    private queryData() {
        const { page, itemsPerPage } = this.tableOptions;

        if (this.data.length >= 1) {
            if (page === this.pagination['currentPage']) {
                this.$emit('refreshData', {key: 'limit', value: itemsPerPage});
            } else {
                this.$emit('refreshData', {key: 'page', value: page});
            }
        }
    }

    private handleUpdate(userData: IFormProps) {
        this.selectedData = userData;

        console.log(this.selectedData);
    }

    private handleDialog(userData: IFormProps) {
        this.selectedData = userData;

        this.isConfirm = true;
        this.confirmMessage = `${this.$t('user.delete')} ${this.selectedData.firstName} ${this.selectedData.lastName}`;
    }

    private handleConfirmation(result) {
        this.isConfirm = false;

        if (result) {
          this.handleDeleteConfirm(this.selectedData.id);
        }
    }

    async handleDeleteConfirm(id: string) {
        const requestData: any = await this.userAPI.delete({id});
        if (!requestData) {
            this.$setNotificationData({ type: 'error', message: this.$i18n.t('error.userDelete') });
        } else {
            this.$setNotificationData({ type: 'success', message: this.$i18n.t('success.userDelete') });

            this.$emit('refreshData', {});
            this.selectedData = null;
        }
    }
}
