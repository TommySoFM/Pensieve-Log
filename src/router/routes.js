import front from '../view/front'
import signup from '../view/signup'
import login from '../view/login'
import home from '../components/home'
import post from '../view/post'

export const routes = [
  { path: '/', name: 'front', component: front,
    children:[
      { path: '/login', name: 'login' ,component: login },
      { path: '/signup', name: 'signup' , component: signup },
    ]
  },
  {path: '/post/:page',name: 'post', component: post},
  { path: '/home', name: 'home', component: home},
  { path: '*', redirect: '/log_in'}
]
