import lazyLoader from '../utils/asyncComponent'

const allRoutes = [
  // {
  //   path: '/',
  //   component: lazyLoader(() => import ('../components/Login.js'))
  // }, 
  {
    path: '/login',
    component: lazyLoader(() => import ('../components/Login.js'))
  }, {
    path: '/admin',
    auth: true,
    component: lazyLoader(() => import ('../components/Index.js')),
    // children: []
  }, {
    path: '/404',
    component: lazyLoader(() => import ('../components/Error.js'))
  }
]

export default allRoutes
