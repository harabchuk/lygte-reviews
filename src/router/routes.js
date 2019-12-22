
const routes = [
  {
    path: '/',
    component: () => import('layouts/DefaultLayout.vue'),
    children: [
      { 
        name: 'chargers',
        path: '',
        component: () => import('pages/Index.vue') 
      },
      { 
        name: 'review',
        path: 'review/:slug', 
        component: () => import('pages/Review.vue') 
      },
      { 
        name: 'notready',
        path: 'notready/:id', 
        component: () => import('pages/NotReady.vue') 
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
