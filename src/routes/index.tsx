import Vue from 'vue';
import Router from 'vue-router';

import { Helper } from '@/services/helper/helper.service';

const helper: Helper = new Helper();

export const routes = [
  {
    path: '/',
    name: 'signIn',
    component: () => import(/* webpackChunkName: "sign-in" */ '@/views/sign-in/sign-in.vue'),
    meta: {
      layout: 'minimal',
      auth: false,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/dashboard.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/user.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import(/* webpackChunkName: "account" */ '@/views/account/account.vue'),
    meta: {
      layout: 'main',
      auth: true,
    },
  },
  {
    path: '/page-not-found',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/not-found/not-found.vue'),
    meta: {
      layout: 'minimal',
      everyone: true,
    },
  },
  {
    path: '*',
    redirect: '/page-not-found',
    meta: {
      layout: 'minimal',
    },
  },
];

const handleRouterPermission = ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const $isLogIn = store.getters['authentication/isLogIn'] || false;

    if (to.matched.some((record) => record.meta.everyone)) {
      next();
    } else {
      if (to.matched.some((record) => record.meta.auth)) {
          if (!$isLogIn) {
              next({ name: 'signIn'});
          } else {
              next();
          }
      } else {
          if ($isLogIn) {
              next({ name: 'dashboard'});
          } else {
              next();
          }
      }
    }
  });
};

export function createRouter(vueInstance = Vue, store) {
  vueInstance.use(Router);

  const router = new Router({ routes });
  handleRouterPermission({ router, store });

  return router;
}
