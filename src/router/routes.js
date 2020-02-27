import front from '../view/front'
import signup from '../view/signup'
import login from '../view/login'
import home from '../view/home'
import post from '../view/post'

export const routes = [
  { path: '/', name: 'front', component: front,
    children:[
      { path: '/login', name: 'login' ,component: login },
      { path: '/signup', name: 'signup' , component: signup },
    ]
  },
  { path: '/home', name: 'home', component: home,
    children:[
      {path: 'post/:page', component: post}
    ]
  },
  { path: '*', redirect: '/log_in'}
]
