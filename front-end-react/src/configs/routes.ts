import { lazy } from 'react';

interface Route {
    requireLogin: Boolean;
    path: string,
    component: any,
    children?: Array<Route>
}

const routes: Array<Route> = [
    {
        requireLogin: false,
        path: '/login',
        component: lazy(() => import('@/pages/Authentication')),
    },
    {
        requireLogin: true,
        path: '/infoRegis',
        component: lazy(() => import('@/pages/InfoRegis')),
    },
    {
        requireLogin: true,
        path: '/advertisement',
        component: lazy(() => import('@/pages/Advertisement')),
    },
    {
        requireLogin: true,
        path: '*',
        component: lazy(() => import('@/pages/NoFound')),
    },
    {
        requireLogin: true,
        path: '/chatWindow',
        component: lazy(() => import('@/pages/ChatWindow')),
    },
    {
        requireLogin: true,
        path: '/personalDetails',
        component: lazy(() => import('@/pages/PersonalDetails')),
    },
    {
        requireLogin: true,
        path: '/success',
        component: lazy(() => import('@/pages/Success')),
    },
    {
        requireLogin: true,
        path: '/',
        component: lazy(() => import('@/Layout')),
        children: [
            {
                requireLogin: true,
                path: '/',
                component: lazy(() => import('@/Layout/Heartbeat')),
            },
            {
                requireLogin: true,
                path: '/heartbeat',
                component: lazy(() => import('@/Layout/Heartbeat')),
            },
            {
                requireLogin: true,
                path: '/chatList',
                component: lazy(() => import('@/Layout/ChatList')),
            },
            {
                requireLogin: true,
                path: '/editMyDetails',
                component: lazy(() => import('@/Layout/EditMyDetails')),
            },
            {
                requireLogin: true,
                path: '/selectWhoYouLike',
                component: lazy(() => import('@/Layout/SelectWhoYouLike')),
            },
            {
                requireLogin: true,
                path: '/selectMe',
                component: lazy(() => import('@/Layout/SelectMe')),
            },
        ]
    }
]
export default routes;
