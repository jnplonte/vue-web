import { DataOptions } from 'vuetify';

export interface IFormProps {
	id?: string;
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	roleId?: number;
	password?: string;
	confirmPassword?: string;
}

export const DEFAULT_FORM_DATA: IFormProps = {
	username: null,
	firstName: null,
	lastName: null,
	email: null,
	phone: null,
	roleId: Number(process.env.VUE_APP_DEFAULT_ROLEID),
	password: null,
	confirmPassword: null,
};

export const DEFAULT_ROLES: object[] = [
	{ value: 1, text: 'Super Admin', disabled: true },
	{ value: 2, text: 'Admin' },
	{ value: 3, text: 'User' },
];

export const DEFAULT_PAGE_SIZE: number = 10;

export const DEFAULT_TABLE_OPTIONS: DataOptions = {
	page: 1,
	itemsPerPage: 10,
	sortBy: [],
	sortDesc: [],
	groupBy: [],
	groupDesc: [],
	multiSort: false,
	mustSort: false,
};

export const DEFAULT_TABLE_FOOTER_PROPS: object = {
	'items-per-page-options': [10, 20, 30],
};
