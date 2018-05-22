import lazyLoader from '../utils/asyncComponent'

const allRoutes = [
  // {
  //   path: '/',
  //   component: lazyLoader(() => import ('../components/Login.js'))
  // }, 
  {
    path: '/login',
    layout: false,
    name: '登录',
    layouts: false,
    component: lazyLoader(() => import ('../components/Login.js'))
  }, {
    path: '/admin',
    auth: true,
    name: '主页',
    redirect: lazyLoader(() => import ('../components/Login.js')),
    layouts: lazyLoader(() => import ('../layouts/index.js')),
    component: lazyLoader(() => import ('../components/markdown/MarkdownEditor.js')),
    // children: []
  }, {
    path: '/404',
    name: '404',
    layouts: false,
    component: lazyLoader(() => import ('../components/Error.js'))
  }, {
    path: '/edit',
    auth: true,
    name: '主页',
    redirect: lazyLoader(() => import ('../components/Login.js')),
    layouts: lazyLoader(() => import ('../layouts/SubMenu.js')),
    component: lazyLoader(() => import ('../components/markdown/MarkdownEditor.js')),
    // children: []
  }, 
  {
    path: '/addblog',
    name: '主页',
    auth: true,
    redirect: lazyLoader(() => import ('../components/Login.js')),
    layouts: lazyLoader(() => import ('../layouts/SubMenu.js')),
    component: lazyLoader(() => import ('../components/markdown/MarkdownEditor.js')),
    // children: []
  }, 
]

export default allRoutes
