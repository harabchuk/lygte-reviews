
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
          title: 'Batteries',
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
