
const defaultLayout = import('layouts/DefaultLayout.vue');

const routes = [
  {
    path: '/chargers',
    component: () => defaultLayout,
    children: [
      { 
        name: 'chargers',
        path: '',
        component: () => import('pages/Chargers.vue'),
        meta: {
          title: 'Chargers',
        },
      },
      { 
        name: 'charger-review',
        path: 'charger-review/:slug', 
        component: () => import('pages/ChargerReview.vue'),
        meta: {
          title: 'Review',
          backButton: true,
        },
      },
      
    ],
  },
  {
    path: '/batteries',
    component: () => defaultLayout,
    children: [
      { 
        name: 'batteries',
        path: '',
        component: () => import('pages/Batteries.vue'),
        meta: {
          title: 'Batteries (AA/AAA/C/D/9V)',
        },
      },
      { 
        name: 'battery-review',
        path: 'battery-review/:slug', 
        component: () => import('pages/BatteryReview.vue'),
        meta: {
          title: 'Review',
          backButton: true,
        },
      },
    ],
  },
  {
    path: '/liion-batteries',
    component: () => defaultLayout,
    children: [
      { 
        name: 'liion-batteries',
        path: '',
        component: () => import('pages/LiionBatteries.vue'),
        meta: {
          title: 'LiIon Batteries',
        },
      },
      { 
        name: 'liion-battery-review',
        path: 'battery-review/:slug', 
        component: () => import('pages/LiionBatteryReview.vue'),
        meta: {
          title: 'Review',
          backButton: true,
        },
      },
    ],
  },
  {
    path: '/notready',
    component: () => defaultLayout,
    children: [
      { 
        name: 'notready',
        path: ':id', 
        component: () => import('pages/NotReady.vue'),
        meta: {
          title: 'Not ready yet',
          backButton: true,
        },
      },
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
