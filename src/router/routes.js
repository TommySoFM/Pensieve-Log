import front from '../view/front'
import signup from '../view/signup'
import login from '../view/login'
// import home from '../components/home/home'
// import posts from '../components/home/post'

export const routes = [
  { path: '/', name: 'front', component: front,
    children:[
      { path: '/login', name: 'login' ,component: login },
      { path: '/signup', name: 'signup' , component: signup },
    ]
  },
  // { path: '/home', component: home,
  //   children:[
  //     {path: 'post/:page', component: posts}
  //   ]
  // },
  { path: '*', redirect: '/log_in'}
]
