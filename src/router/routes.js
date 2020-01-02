
const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
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
        name: 'review',
        path: 'review/:slug', 
        component: () => import('pages/Review.vue'),
        meta: {
          title: 'Review',
          backButton: true,
        },
      },
      { 
        name: 'batteries',
        path: 'batteries',
        component: () => import('pages/BatteryTypes.vue'),
        meta: {
          title: 'Batteries',
        },
      },
      { 
        name: 'notready',
        path: 'notready/:id', 
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
