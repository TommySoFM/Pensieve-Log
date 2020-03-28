import front from '../view/front'
import signup from '../view/signup'
import login from '../view/login'

export const routes = [
  {
    path: '/',
    name: 'front',
    component: front,
    children: [
      { path: '/login', name: 'login', component: login },
      { path: '/signup', name: 'signup', component: signup }
    ]
  },
  {
    path: '/post/:page',
    name: 'post',
    component: () => import(/* webpackChunkName: "PostPage" */ '../view/post')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "HomePanel" */ '../components/home')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "User" */ '../view/user')
  },
  {
    path: '/oauth/success',
    name: 'oauth',
    component: () => import(/* webpackChunkName: "User" */ '../view/oauth')
  },
  {
    path: '*',
    redirect: '/login'
  }
]
