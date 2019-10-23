import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home';
import Register from '@/components/Register';
import Login from '@/components/Login';
import Profile from '@/components/administration/AdminProfile';
import PostProduct from '@/components/administration/PostProduct';
import ViewProducts from '@/components/administration/ShowProducts';
import ShowProduct from '@/components/administration/ShowProduct';

Vue.use(Router)

import store from '@/store';

const beforeEnter = (to, from, next) => {
  if (store.state.authModule.logged) {
    next({path: '/'});
  } else {
    next();
  }
};

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { Auth: false, title: 'Inicio' },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { Auth: false, title: 'Registro' },
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
     
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { Auth: false, title: 'Inicio de Sesión ' },
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)     
    },
    {
      path: '/administration/AdminProfile',
      name: 'Profile',
      component: Profile,
      meta: {Auth: true, title: 'Perfil'}
    },
    {
      path: '/administration/PostProduct',
      name: 'PostProduct',
      component: PostProduct,
      meta: {Auth: true, title: 'Subir Producto'}
    },
    {
      path: '/administration/ShowProducts',
      name: 'ShowProducts',
      component: ViewProducts,
      meta: {Auth: true, title: 'Ver Productos'}
    },
    {
      path: '/administration/ShowProduct/:id',
      name: 'ShowProduct',
      component: ShowProduct,
      meta: {Auth:  true, title: 'Producto'}

    }

  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.meta.Auth && !store.state.authModule.logged && store.state.loaded) {
    next({path: '/login'});
  } else {
    if (to.meta.role) {
      if (store.state.loaded && (to.meta.role !== store.state.authModule.role)) {
        next({path: '/'});
        return;
      }
    }
    next();
  }
});
export default router;
