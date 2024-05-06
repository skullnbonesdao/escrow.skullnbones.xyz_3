import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/IndexPage.vue') },
        ],
    },
    {
        path: '/exchange',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/ExchangePage.vue') },
        ],
    },
    {
        path: '/manage',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/ManagePage.vue') },
        ],
    },

    {
        path: '/details/:account',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/DetailsPage.vue') },
        ],
    },
    {
        path: '/faq',
        component: () => import('layouts/MainLayout.vue'),
        children: [{ path: '', component: () => import('pages/FAQPage.vue') }],
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
