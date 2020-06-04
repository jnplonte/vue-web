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
      auth: false,
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

const handleRouterPermission = ({ router, store, i18n }) => {
  const $isLogIn = store.getters['authentication/isLogIn'] || false;

  router.beforeEach((to, from, next) => {
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

export function createRouter(vueInstance = Vue, store, i18n) {
  vueInstance.use(Router);

  const router = new Router({ routes });
  handleRouterPermission({ router, store, i18n });

  return router;
}