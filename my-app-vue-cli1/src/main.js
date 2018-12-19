import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Restaurants from './components/Restaurants.vue';
import Add from './components/AddRestaurants.vue';
import Delete from './components/DeleteRestaurants.vue';

// Définition des routes
Vue.use(VueRouter);

const routes = [
	{path:'/restaurants', component: Restaurants},
	{path:'/add', component: Add},
	{path:'/delete', component: Delete},
]

const router = new VueRouter({
	routes: routes,
	mode:'history'
})

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
})
