import { Getter, Action } from 'vuex-class';
import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';

import { LoadingMixin } from '@/mixins/loading/loading';
import { HelperMixin } from '@/mixins/helper/helper';

import { DataOptions } from 'vuetify/types';

import { DEFAULT_TABLE_OPTIONS, DEFAULT_TABLE_FOOTER_PROPS, IFormProps } from '@/views/user/user.constants';

import UserForm from '@/views/user/components/user-form/user-form.vue';
import ConfirmDialog from '@/components/confirm-dialog/confirm-dialog.vue';

import { UserAPI } from '@/api/user.api';

@Component({
	name: 'UserTableComponent',
	components: {
		'confirm-dialog': ConfirmDialog,
		'user-form': UserForm,
	},
})
export default class UserTableComponent extends Mixins(HelperMixin, LoadingMixin) {
	@Getter('token', { namespace: 'authentication' }) $token;
	@Getter('authData', { namespace: 'authentication' }) $authData;
	@Action('setNotificationData', { namespace: 'siteInformation' }) $setNotificationData;

	@Prop({ type: Array, default: [] }) data: Array<any | null>;
	@Prop({ type: Object, default: {} }) pagination: object;
	@Prop({ type: Number, default: 10 }) limit: number;

	private userAPI: UserAPI;

	private selectedData: IFormProps = null;

	private isUpdateModalOpen: boolean = false;

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

		if (this.$route.params.userId) {
			this.handleUpdate(this.$route.params.userId, false);
		}
	}

	get headers(): object[] {
		return [
			{ text: this.$t('user.fullName'), value: 'name' },
			{ text: this.$t('user.userName'), value: 'username' },
			{ text: this.$t('user.email'), value: 'email' },
			{ text: this.$t('user.phone'), value: 'phone' },
			{ text: this.$t('user.active'), value: 'active' },
			{ text: this.$t('user.createdAt'), value: 'createdAt' },
			{ text: this.$t('user.action'), value: 'action' },
		];
	}

	private queryData() {
		const { page, itemsPerPage } = this.tableOptions;

		if (this.data.length >= 1) {
			if (page === this.pagination['currentPage']) {
				this.$emit('refreshData', { key: 'limit', value: itemsPerPage });
			} else {
				this.$emit('refreshData', { key: 'page', value: page });
			}
		}
	}

	private async handleUpdate(uId: string, routerPush: boolean = true) {
		const requestData: any = await this.userAPI.get({ id: uId });
		if (!requestData) {
			this.$setNotificationData({ type: 'error', message: this.$i18n.t('error.userUpdate') });
		} else {
			if (this.helper.isEmptyObject(requestData.data)) {
				return;
			}

			this.selectedData = Object.assign({}, requestData.data);

			if (routerPush) {
				this.$router.push({ path: `/user/${requestData.data.id}` });
			}

			this.isUpdateModalOpen = true;
		}
	}

	private handleUpdateClose() {
		this.$router.replace({ path: '/user' });
		this.isUpdateModalOpen = false;
	}

	private async handleUpdateConfirm(data: IFormProps) {
		const apiData: object = {
			email: data.email,
			roleId: Number(data.roleId),
			firstName: data.firstName,
			lastName: data.lastName,
			phone: data.phone || '',
		};

		const requestData: any = await this.userAPI.put({ id: data.id }, apiData);
		if (!requestData) {
			this.$setNotificationData({ type: 'error', message: this.$i18n.t('error.userUpdate') });
		} else {
			this.$setNotificationData({ type: 'success', message: this.$i18n.t('success.userUpdate') });

			this.$emit('refreshData', {});

			this.selectedData = null;
			this.$router.replace({ path: '/user' });
			this.isUpdateModalOpen = false;
		}
	}

	private handleDialog(uId: string) {
		this.selectedData = {
			id: uId,
		};

		this.isConfirm = true;
		this.confirmMessage = `${this.$t('user.delete')}`;
	}

	private handleConfirmation(result) {
		this.isConfirm = false;

		if (result) {
			this.handleDeleteConfirm(this.selectedData.id);
		}
	}

	private async handleDeleteConfirm(id: string) {
		const requestData: any = await this.userAPI.delete({ id });
		if (!requestData) {
			this.$setNotificationData({ type: 'error', message: this.$i18n.t('error.userDelete') });
		} else {
			this.$setNotificationData({ type: 'success', message: this.$i18n.t('success.userDelete') });

			this.$emit('refreshData', {});
			this.selectedData = null;
		}
	}
}
