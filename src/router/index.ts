import Vue from 'vue';
import Router from 'vue-router';
// import { Route } from 'vue-router';

import { MainLayout, MinimalLayout } from '@/layouts';

// import { Helper } from '@/services/helper/helper.service';

// const helper: Helper = new Helper();

export const routes = [
  {
    path: '/',
    name: 'signIn',
    component: MinimalLayout,
    children: [
      {
        path: '',
        name: 'signIn',
        component: () => import(/* webpackChunkName: "sign-in" */ '@/views/sign-in/sign-in.vue'),
        meta: {},
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/dashboard.vue'),
        meta: {},
      },
    ],
  },
  {
    path: '/',
    name: 'signIn',
    component: MinimalLayout,
    children: [
      {
        path: '/page-not-found',
        name: 'notFound',
        component: () => import(/* webpackChunkName: "not-found" */ '@/views/not-found/not-found.vue'),
        meta: {},
      },
    ],
  },
  {
    path: '*',
    redirect: '/page-not-found',
    meta: {},
  },
];

// const handleAdminRoutes = ({ to, next, mappedConstantRoutes, bread, store, }) => {
//   const mappedAdminRoutes = [
//     ...mappedConstantRoutes,
//     ...adminRoutes.map(r => r['children'][0]['name']),
//   ].filter(r => r['name'] !== 'login');

//   if (bread) {
//     bread.unshift({ name: 'dashboard', link: '#' });
//   }

//   store.commit('common/SET_BREADCRUMB_LIST', bread);

//   if (to.name === 'login') {
//     next({ name: 'adminDashboard' });
//   } else if (mappedAdminRoutes.includes(to.name)) {
//     next();
//   } else {
//     next({ name: 'unauthorized' });
//   }
// };

// const handleNonAdminRoutes = ({ to, next, mappedConstantRoutes, bread, store, }) => {
//   const reportRoutes = store.getters['authentication/userData'] && store.getters['authentication/userData']['reportRoutes']
//     ? store.getters['authentication/userData']['reportRoutes']
//     : [];

//   const hardcodedRoutes = [
//     'generalDashboard', 'settings', 'vmsSummaryOld',
//   ];

//   const mappedNonAdminRoutes = [
//     ...hardcodedRoutes,
//     ...mappedConstantRoutes,
//     ...reportRoutes,
//   ].filter(r => r['name'] !== 'login');

//   if (bread) {
//     bread.unshift({ name: 'admin-dashboard', link: '#' });
//   }

//   store.commit('common/SET_BREADCRUMB_LIST', bread);

//   if (to.name === 'login') {
//     next({ name: 'generalDashboard' });
//   } else if (mappedNonAdminRoutes.includes(to.name)) {
//     if (to.query.r) {
//       const path = Buffer.from(to.query.r.toString(), 'base64').toString('ascii');
//       next({ path });
//     } else {
//       next();
//     }
//   } else {
//     next({ name: 'unauthorized' });
//   }
// };

// const getUserData = async ({ next, store, i18n,  }) => {
//   const hasUserInfo = await store.dispatch('authentication/loadUserInformation', { 'lfToken':  store.getters['authentication/lfToken'] });

//   if (!hasUserInfo || hasUserInfo === '1' || hasUserInfo === '2') {
//     // isLoggedIn = null;

//     if (hasUserInfo === '2') {
//       store.commit( 'common/ADD_SNACKBAR', {
//         isShow: true,
//         type: 'error',
//         message: i18n.t('notification.logout.noAccess'),
//       });
//     }

//     await store.dispatch('authentication/logOutUser', { routePath: '', isReload: false });

//     next({ name: 'login' });
//   }

//   // userInfo = store.getters['authentication/userInformation'];
// };

const handleRouterPermission = ({ router, store, i18n }) => {
  console.log('handle route');
  // router.beforeEach(async (to: Route, from: Route, next) => {
  //   const isLoggedIn = helper.getCookie(process.env.VUE_APP_AUTH_COOKIE);
  //   const userInfo = store.getters['authentication/userInformation'] || {};
  //   const isAdmin = store.getters['authentication/isAdmin'];

  //   const mappedConstantRoutes = [...constantRoutes.map(r => r['name'])];

  //   store.commit('common/SET_BREADCRUMB_LIST', []);
  //   const bread: Array<Object> = (to.meta.breadcrumb) ? [...to.meta.breadcrumb] : null;

  //   if (isLoggedIn) {
  //     if (Object.keys(userInfo).length === 0 && userInfo.constructor === Object) {
  //       await getUserData({ next, store, i18n, });
  //     }

  //     if (isAdmin) {
  //       handleAdminRoutes({ to, next, mappedConstantRoutes, bread, store, });
  //     } else {
  //       handleNonAdminRoutes({ to, next, mappedConstantRoutes, bread, store, });
  //     }
  //   } else if (!isLoggedIn && to.path !== '/') {
  //     next({ name: 'login' });
  //   } else {
  //     store.commit('common/SET_BREADCRUMB_LIST', bread);
  //     next();
  //   }
  // });
};

export function createRouter(vueInstance = Vue, store, i18n) {
  vueInstance.use(Router);

  const router = new Router({ routes });
  handleRouterPermission({ router, store, i18n });

  return router;
}
