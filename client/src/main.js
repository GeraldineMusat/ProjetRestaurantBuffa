import Vue from "vue";
import VueRouter from "vue-router";
import * as VueGoogleMaps from 'vue2-google-maps'

import sensibleInformations from './assets/sensibleInformations'
import App from "./App.vue";
import Restaurants from "./components/Restaurants.vue";
import Add from "./components/AddRestaurants.vue";
import Detail from "./components/Detail.vue";
import Modif from "./components/ModifRestaurant.vue";
import Menu from "./components/Menu.vue";

// Définition des routes
Vue.use(VueRouter);

Vue.use( VueGoogleMaps,
{
  load:
  {
    key: sensibleInformations.MAPS.API_KEY
  }
})

const routes = [
  { path: "/restaurants", component: Restaurants },
  { path: "/add", component: Add },
  { path: "/detail/:id", component: Detail },
  { path: "/modif/:id", component: Modif },
  { path: "/menu/:id", component: Menu }
];

const router = new VueRouter({
  routes: routes,
  mode: "history"
});

Vue.component("app-grades", {
  props: ["date", "grade", "score"],
  data: function() {
    return {};
  },
  template: `
    <tr>
      <td>{{date}}</td>
      <td>{{grade}}</td>
      <td>{{score}}</td>
    </tr>
		`
});

Vue.component("app-restau-detail", {
  props: ["cuisine", "building", "street", "zipcode", "borough"],
  template: `
  <div>
    <p>
      Cuisine : {{cuisine}}
    </p>

    <p>
      Adresse : {{building}}, {{street}} {{zipcode}} {{borough}}
    </p>
  </div>
	`
});

new Vue({
  el: "#app",
  router: router,
  render: h => h(App)
});
