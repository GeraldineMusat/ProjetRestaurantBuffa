import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import Restaurants from './components/Restaurants.vue';
import Add from './components/AddRestaurants.vue';
import Info from './components/Info.vue';

// Définition des routes
Vue.use(VueRouter);

const routes = [
	{path:'/restaurants', component: Restaurants},
	{path:'/add', component: Add},
	{path:'/info', component: Info},
]

const router = new VueRouter({
	routes: routes,
	mode:'history'
})

Vue.component("app-info", Info);

new Vue({
  el: '#app',
  router:router,
  render: h => h(App)
  
})
