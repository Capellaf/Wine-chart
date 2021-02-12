import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('./views/Home.vue');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: 'http://localhost:8081',
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '#',
            component: Home,
            redirect: '/'
        }
    ]
})

export default router;